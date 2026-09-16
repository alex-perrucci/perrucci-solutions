from datetime import date, timedelta
from urllib.parse import quote
import httpx
from . import config


async def access_token() -> str | None:
    if not all([config.GOOGLE_CLIENT_ID, config.GOOGLE_CLIENT_SECRET, config.GOOGLE_REFRESH_TOKEN]):
        return None
    async with httpx.AsyncClient(timeout=20) as client:
        response = await client.post('https://oauth2.googleapis.com/token', data={
            'client_id': config.GOOGLE_CLIENT_ID,
            'client_secret': config.GOOGLE_CLIENT_SECRET,
            'refresh_token': config.GOOGLE_REFRESH_TOKEN,
            'grant_type': 'refresh_token'
        })
        response.raise_for_status()
        return response.json()['access_token']


def _gsc_window(days: int, offset_days: int = 0) -> tuple[date, date]:
    """Return a settled Search Console window, keeping two days of API lag."""
    end = date.today() - timedelta(days=2 + offset_days)
    start = end - timedelta(days=days - 1)
    return start, end


async def search_console_query(
    start: date,
    end: date,
    dimensions: list[str] | None = None,
    row_limit: int = 1000
) -> list[dict]:
    token = await access_token()
    if not token or not config.GOOGLE_SEARCH_CONSOLE_SITE:
        return []

    site = quote(config.GOOGLE_SEARCH_CONSOLE_SITE, safe='')
    url = f'https://www.googleapis.com/webmasters/v3/sites/{site}/searchAnalytics/query'
    payload: dict = {
        'startDate': start.isoformat(),
        'endDate': end.isoformat(),
        'rowLimit': max(1, min(row_limit, 25000)),
        'dataState': 'final'
    }
    if dimensions:
        payload['dimensions'] = dimensions

    async with httpx.AsyncClient(timeout=30) as client:
        response = await client.post(
            url,
            headers={'Authorization': f'Bearer {token}'},
            json=payload
        )
        response.raise_for_status()
        return response.json().get('rows', [])


async def search_console_dataset(days: int = 28, offset_days: int = 0) -> dict | None:
    """Fetch one coherent GSC dataset used by the SEO decision engine."""
    if not all([
        config.GOOGLE_CLIENT_ID,
        config.GOOGLE_CLIENT_SECRET,
        config.GOOGLE_REFRESH_TOKEN,
        config.GOOGLE_SEARCH_CONSOLE_SITE
    ]):
        return None

    start, end = _gsc_window(days, offset_days)
    totals_rows = await search_console_query(start, end, row_limit=1)
    queries = await search_console_query(start, end, ['query'], 1000)
    pages = await search_console_query(start, end, ['page'], 1000)
    query_pages = await search_console_query(start, end, ['query', 'page'], 2500)

    totals = totals_rows[0] if totals_rows else {}
    clicks = float(totals.get('clicks', 0))
    impressions = float(totals.get('impressions', 0))
    ctr = float(totals.get('ctr', clicks / impressions if impressions else 0))
    position = float(totals.get('position', 0))

    return {
        'start_date': start.isoformat(),
        'end_date': end.isoformat(),
        'clicks': round(clicks),
        'impressions': round(impressions),
        'ctr': ctr,
        'position': position,
        'queries': sorted(queries, key=lambda row: row.get('impressions', 0), reverse=True),
        'pages': sorted(pages, key=lambda row: row.get('impressions', 0), reverse=True),
        'query_pages': sorted(query_pages, key=lambda row: row.get('impressions', 0), reverse=True)
    }


async def search_console_compare(days: int = 28) -> tuple[dict | None, dict | None]:
    current = await search_console_dataset(days)
    previous = await search_console_dataset(days, offset_days=days)
    return current, previous


async def search_console_summary(days: int = 28) -> dict | None:
    dataset = await search_console_dataset(days)
    if not dataset:
        return None
    return {
        'start_date': dataset['start_date'],
        'end_date': dataset['end_date'],
        'clicks': dataset['clicks'],
        'impressions': dataset['impressions'],
        'ctr': dataset['ctr'],
        'position': dataset['position'],
        'queries': dataset['queries'][:8],
        'pages': dataset['pages'][:8]
    }


async def publish_gbp_post(summary: str, target_url: str) -> str | None:
    if not all([config.GBP_ACCOUNT_ID, config.GBP_LOCATION_ID]):
        return None
    token = await access_token()
    if not token:
        return None
    url = f'https://mybusiness.googleapis.com/v4/accounts/{config.GBP_ACCOUNT_ID}/locations/{config.GBP_LOCATION_ID}/localPosts'
    payload = {
        'languageCode': 'it-IT',
        'summary': summary,
        'callToAction': {'actionType': 'LEARN_MORE', 'url': target_url},
        'topicType': 'STANDARD'
    }
    async with httpx.AsyncClient(timeout=30) as client:
        response = await client.post(url, headers={'Authorization': f'Bearer {token}'}, json=payload)
        response.raise_for_status()
        return response.json().get('name')
