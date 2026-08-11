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


async def search_console_summary(days: int = 28) -> dict | None:
    token = await access_token()
    if not token or not config.GOOGLE_SEARCH_CONSOLE_SITE:
        return None
    end = date.today() - timedelta(days=2)
    start = end - timedelta(days=days - 1)
    site = quote(config.GOOGLE_SEARCH_CONSOLE_SITE, safe='')
    url = f'https://www.googleapis.com/webmasters/v3/sites/{site}/searchAnalytics/query'
    headers = {'Authorization': f'Bearer {token}'}
    base = {'startDate': start.isoformat(), 'endDate': end.isoformat()}

    async with httpx.AsyncClient(timeout=30) as client:
        totals_response = await client.post(url, headers=headers, json={**base, 'rowLimit': 1})
        totals_response.raise_for_status()
        totals_rows = totals_response.json().get('rows', [])
        query_response = await client.post(url, headers=headers, json={**base, 'dimensions': ['query'], 'rowLimit': 50})
        query_response.raise_for_status()
        rows = query_response.json().get('rows', [])

    totals = totals_rows[0] if totals_rows else {}
    clicks = float(totals.get('clicks', 0))
    impressions = float(totals.get('impressions', 0))
    top = sorted(rows, key=lambda r: r.get('impressions', 0), reverse=True)[:8]
    return {'clicks': round(clicks), 'impressions': round(impressions), 'ctr': (clicks / impressions if impressions else 0), 'queries': top}


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
