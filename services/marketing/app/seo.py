import hashlib
from collections import defaultdict


MIN_EMERGING_IMPRESSIONS = 10
MIN_NEAR_RANKING_IMPRESSIONS = 20
MIN_CTR_IMPRESSIONS = 50
LOW_CTR_THRESHOLD = 0.03


def _task_key(task_type: str, page: str = '', query: str = '') -> str:
    raw = f'{task_type}|{page}|{query}'.encode('utf-8')
    return f'{task_type}:{hashlib.sha1(raw).hexdigest()[:16]}'


def _metric(row: dict, name: str, default: float = 0) -> float:
    try:
        return float(row.get(name, default) or default)
    except (TypeError, ValueError):
        return default


def _previous_lookup(previous: dict | None) -> dict[tuple[str, str], dict]:
    if not previous:
        return {}
    result: dict[tuple[str, str], dict] = {}
    for row in previous.get('query_pages', []):
        keys = row.get('keys', [])
        if len(keys) >= 2:
            result[(str(keys[0]), str(keys[1]))] = row
    return result


def page_metrics(dataset: dict | None, page: str) -> dict:
    if not dataset:
        return {'clicks': 0, 'impressions': 0, 'ctr': 0.0, 'position': 0.0}
    wanted = page.rstrip('/') + '/'
    for row in dataset.get('pages', []):
        keys = row.get('keys', [])
        if keys and str(keys[0]).rstrip('/') + '/' == wanted:
            return {
                'clicks': int(round(_metric(row, 'clicks'))),
                'impressions': int(round(_metric(row, 'impressions'))),
                'ctr': _metric(row, 'ctr'),
                'position': _metric(row, 'position')
            }
    return {'clicks': 0, 'impressions': 0, 'ctr': 0.0, 'position': 0.0}


def build_opportunities(current: dict, previous: dict | None = None) -> list[dict]:
    """Turn GSC evidence into conservative SEO tasks; never creates pages automatically."""
    tasks: dict[str, dict] = {}
    previous_rows = _previous_lookup(previous)

    # Page-level signal: enough visibility to matter, but still outside useful rankings.
    for row in current.get('pages', []):
        keys = row.get('keys', [])
        if not keys:
            continue
        page = str(keys[0])
        impressions = int(round(_metric(row, 'impressions')))
        clicks = int(round(_metric(row, 'clicks')))
        position = _metric(row, 'position')
        if impressions >= 25 and position > 20:
            key = _task_key('strengthen_page', page)
            tasks[key] = {
                'task_key': key,
                'priority': 'P1',
                'task_type': 'strengthen_page',
                'page': page,
                'query': None,
                'title': f'Rafforzare la pagina {page}',
                'rationale': 'La pagina riceve visibilità reale ma resta oltre la seconda pagina: prima di creare nuove landing va rafforzata la pagina che Google sta già scegliendo.',
                'evidence': {
                    'impressions_28d': impressions,
                    'clicks_28d': clicks,
                    'ctr_28d': _metric(row, 'ctr'),
                    'position_28d': position
                }
            }

    query_pages_by_query: dict[str, list[dict]] = defaultdict(list)
    for row in current.get('query_pages', []):
        keys = row.get('keys', [])
        if len(keys) < 2:
            continue
        query = str(keys[0])
        page = str(keys[1])
        impressions = int(round(_metric(row, 'impressions')))
        clicks = int(round(_metric(row, 'clicks')))
        ctr = _metric(row, 'ctr')
        position = _metric(row, 'position')
        query_pages_by_query[query].append(row)
        previous_row = previous_rows.get((query, page), {})

        evidence = {
            'impressions_28d': impressions,
            'clicks_28d': clicks,
            'ctr_28d': ctr,
            'position_28d': position,
            'previous_impressions_28d': int(round(_metric(previous_row, 'impressions'))),
            'previous_clicks_28d': int(round(_metric(previous_row, 'clicks'))),
            'previous_position_28d': _metric(previous_row, 'position')
        }

        if impressions >= MIN_CTR_IMPRESSIONS and 0 < position <= 10 and ctr < LOW_CTR_THRESHOLD:
            key = _task_key('ctr_opportunity', page, query)
            tasks[key] = {
                'task_key': key,
                'priority': 'P1',
                'task_type': 'ctr_opportunity',
                'page': page,
                'query': query,
                'title': f'Migliorare lo snippet per “{query}”',
                'rationale': 'La query è già in prima pagina ma il CTR è basso su un campione sufficiente: valutare title/meta senza cambiare l’intento della pagina.',
                'evidence': evidence
            }
        elif impressions >= MIN_NEAR_RANKING_IMPRESSIONS and 4 <= position < 20:
            key = _task_key('near_ranking', page, query)
            tasks[key] = {
                'task_key': key,
                'priority': 'P1',
                'task_type': 'near_ranking',
                'page': page,
                'query': query,
                'title': f'Spingere “{query}” in top 10',
                'rationale': 'La query è già vicina alla prima pagina: priorità a contenuto pertinente, internal linking e prove concrete prima di creare nuove URL.',
                'evidence': evidence
            }
        elif impressions >= MIN_EMERGING_IMPRESSIONS and 20 <= position <= 100:
            key = _task_key('emerging_query', page, query)
            tasks[key] = {
                'task_key': key,
                'priority': 'P2',
                'task_type': 'emerging_query',
                'page': page,
                'query': query,
                'title': f'Consolidare la rilevanza per “{query}”',
                'rationale': 'Google sta già associando questa query alla pagina. Rafforzare la pagina esistente e misurare prima di valutare una landing separata.',
                'evidence': evidence
            }

    # Cannibalization review: only when a query has enough evidence and multiple pages competing.
    for query, rows in query_pages_by_query.items():
        meaningful = [row for row in rows if _metric(row, 'impressions') >= 3]
        total_impressions = sum(_metric(row, 'impressions') for row in rows)
        if len(meaningful) >= 2 and total_impressions >= 20:
            pages = [str(row.get('keys', ['', ''])[1]) for row in meaningful]
            key = _task_key('cannibalization_review', '|'.join(sorted(pages)), query)
            tasks[key] = {
                'task_key': key,
                'priority': 'P2',
                'task_type': 'cannibalization_review',
                'page': None,
                'query': query,
                'title': f'Verificare cannibalizzazione per “{query}”',
                'rationale': 'La stessa query genera impression su più pagine. Va chiarito l’intento prima di produrre nuovo contenuto.',
                'evidence': {'impressions_28d': round(total_impressions), 'pages': pages}
            }

    return sorted(
        tasks.values(),
        key=lambda task: (0 if task['priority'] == 'P1' else 1 if task['priority'] == 'P2' else 2, task['title'])
    )


def impact_result(change: dict, current: dict, review_days: int) -> dict:
    baseline = change.get('baseline', {})
    page = change['page']
    now = page_metrics(current, page)
    before = baseline.get('page_metrics', {})

    return {
        'review_days': review_days,
        'period_start': current.get('start_date'),
        'period_end': current.get('end_date'),
        'page': page,
        'baseline': before,
        'current': now,
        'delta': {
            'clicks': now['clicks'] - int(before.get('clicks', 0) or 0),
            'impressions': now['impressions'] - int(before.get('impressions', 0) or 0),
            'ctr_points': now['ctr'] - float(before.get('ctr', 0) or 0),
            'position': now['position'] - float(before.get('position', 0) or 0)
        }
    }
