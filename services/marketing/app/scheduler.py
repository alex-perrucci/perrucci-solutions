from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger
from zoneinfo import ZoneInfo
from .db import (
    due_seo_changes,
    lead_stats,
    list_seo_tasks,
    queue_content,
    save_gsc_snapshot,
    save_seo_change_review,
    seed_seo_change,
    seo_task_stats,
    update_content,
    upsert_seo_task,
)
from .google import search_console_compare, search_console_dataset, search_console_summary, publish_gbp_post
from .notifications import telegram
from .config import GBP_AUTO_PUBLISH
from .seo import build_opportunities, impact_result

TZ = ZoneInfo('Europe/Rome')
PORTFOLIO = [
    ('Guida Lavoro Italia', 'https://guidalavoroitalia.it'),
    ('Malt Service', 'https://maltservice.it'),
    ('Fluxa Platform', 'https://fluxa-platform.it'),
    ('EasyRevoke', 'https://www.easyrevoke.com')
]

# Baseline verified in Google Search Console before this release.
SEO_RELEASE = {
    'release_key': '2026-09-16-siti-web-parma-v1',
    'deployed_at': '2026-09-16T00:00:00+00:00',
    'page': 'https://perruccisolutions.com/siti-web-parma/',
    'summary': 'P1 strengthen local landing; P2 contextual home internal link; P3 page-specific structured data and shorter title.',
    'baseline': {
        'source': 'Google Search Console',
        'period': '2026-08-17/2026-09-13',
        'page_metrics': {
            'clicks': 0,
            'impressions': 36,
            'ctr': 0.0,
            'position': 70.13888888888889
        },
        'site_metrics': {
            'clicks': 6,
            'impressions': 51,
            'ctr': 0.1176470588235294,
            'position': 42.804761904761904
        }
    }
}


def seed_current_seo_release() -> None:
    seed_seo_change(
        SEO_RELEASE['release_key'],
        SEO_RELEASE['deployed_at'],
        SEO_RELEASE['page'],
        SEO_RELEASE['summary'],
        SEO_RELEASE['baseline']
    )


async def _review_due_changes(current: dict) -> None:
    for review_days in (14, 28):
        for change in due_seo_changes(review_days):
            result = impact_result(change, current, review_days)
            save_seo_change_review(change['release_key'], review_days, result)
            before = result['baseline']
            now = result['current']
            position_delta = result['delta']['position']
            position_text = f"{position_delta:+.1f}" if before.get('position') else 'n/a'
            await telegram(
                f"Perrucci SEO — review {review_days}gg\n"
                f"{change['page']}\n"
                f"Impression: {before.get('impressions', 0)} → {now['impressions']}\n"
                f"Click: {before.get('clicks', 0)} → {now['clicks']}\n"
                f"Posizione: {float(before.get('position', 0)):.1f} → {now['position']:.1f} (Δ {position_text}; negativo = miglioramento)"
            )


async def daily_gsc_collection() -> None:
    """Collect settled GSC data daily. Daily data is stored, not used for reactive site edits."""
    try:
        current = await search_console_dataset(28)
        if not current:
            return
        save_gsc_snapshot(current)
        await _review_due_changes(current)
    except Exception as exc:
        await telegram(f'Perrucci Marketing — raccolta GSC fallita: {type(exc).__name__}')


async def weekly_seo_review() -> None:
    """Weekly decision cycle using 28 days vs the previous 28 days."""
    try:
        current, previous = await search_console_compare(28)
        if not current:
            await telegram('Perrucci SEO — Search Console API non configurata sul marketing service.')
            return

        save_gsc_snapshot(current)
        tasks = build_opportunities(current, previous)
        for task in tasks:
            upsert_seo_task(task)

        counts = {'P1': 0, 'P2': 0, 'P3': 0}
        for task in tasks:
            counts[task['priority']] = counts.get(task['priority'], 0) + 1

        lines = [
            'PERRUCCI SOLUTIONS — SEO Decision Review',
            f"Periodo: {current['start_date']} → {current['end_date']}",
            f"Search: {current['clicks']} click / {current['impressions']} impression / CTR {current['ctr']:.1%} / pos. {current['position']:.1f}",
            f"Task aggiornati: P1={counts['P1']} · P2={counts['P2']} · P3={counts['P3']}"
        ]
        if tasks:
            lines.append('Priorità:')
            lines.extend(f"- {task['priority']} {task['title']}" for task in tasks[:5])
        else:
            lines.append('Nessun intervento automatico: volume/segnale ancora sotto le soglie decisionali.')
        await telegram('\n'.join(lines))
    except Exception as exc:
        await telegram(f'Perrucci SEO — review GSC fallita: {type(exc).__name__}')


async def weekly_report() -> None:
    stats = lead_stats(7)
    gsc = None
    try:
        gsc = await search_console_summary(28)
    except Exception as exc:
        await telegram(f'Perrucci Marketing — Search Console non disponibile: {type(exc).__name__}')

    task_counts = seo_task_stats()
    tasks = list_seo_tasks(limit=3)
    lines = [
        'PERRUCCI SOLUTIONS — Weekly Growth',
        f"Lead 7gg: {stats['total']} (nuovi: {stats['new']})"
    ]
    if stats['services']:
        lines.append('Servizi richiesti: ' + ', '.join(f"{x['service']}={x['n']}" for x in stats['services']))
    if gsc:
        lines.append(
            f"Search 28gg: {gsc['clicks']} click / {gsc['impressions']} impression / CTR {gsc['ctr']:.1%} / pos. {gsc['position']:.1f}"
        )
        if gsc['queries']:
            lines.append('Top query visibili: ' + ', '.join(str(x.get('keys', [''])[0]) for x in gsc['queries'][:5]))
    else:
        lines.append('Search Console API non configurata sul marketing service.')

    lines.append(f"SEO backlog: P1={task_counts['P1']} · P2={task_counts['P2']} · P3={task_counts['P3']}")
    if tasks:
        lines.append('Prossime azioni: ' + ' | '.join(f"{x['priority']} {x['title']}" for x in tasks))
    await telegram('\n'.join(lines))


async def weekly_content() -> None:
    # Rotazione deterministica: costo AI zero; i post restano verificabili e basati su portfolio reale.
    from datetime import date
    name, url = PORTFOLIO[date.today().isocalendar().week % len(PORTFOLIO)]
    body = (f'Un sito efficace non deve solo essere bello: deve rendere semplice capire cosa fai, '
            f'usarlo da mobile e arrivare al contatto. Questa settimana dal portfolio Perrucci Solutions: {name}. '
            f'Vuoi rinnovare la presenza online della tua attività? Parliamone.')
    content_id = queue_content('google_business', f'Portfolio: {name}', body, url)
    if GBP_AUTO_PUBLISH:
        try:
            external_id = await publish_gbp_post(body, 'https://perruccisolutions.com/#contatti')
            if external_id:
                update_content(content_id, 'published', external_id)
                await telegram(f'Post Google Business pubblicato: {name}')
                return
        except Exception as exc:
            await telegram(f'Post GBP non pubblicato ({type(exc).__name__}); lasciato in bozza.')
    await telegram(f'Bozza contenuto pronta — {name}\n\n{body}')


def build_scheduler() -> AsyncIOScheduler:
    seed_current_seo_release()
    scheduler = AsyncIOScheduler(timezone=TZ)
    scheduler.add_job(daily_gsc_collection, CronTrigger(hour=6, minute=45, timezone=TZ), id='daily_gsc_collection', replace_existing=True)
    scheduler.add_job(weekly_seo_review, CronTrigger(day_of_week='mon', hour=8, minute=0, timezone=TZ), id='weekly_seo_review', replace_existing=True)
    scheduler.add_job(weekly_report, CronTrigger(day_of_week='mon', hour=8, minute=15, timezone=TZ), id='weekly_report', replace_existing=True)
    scheduler.add_job(weekly_content, CronTrigger(day_of_week='wed', hour=10, minute=0, timezone=TZ), id='weekly_content', replace_existing=True)
    return scheduler
