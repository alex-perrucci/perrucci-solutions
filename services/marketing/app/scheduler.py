from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger
from zoneinfo import ZoneInfo
from .db import lead_stats, queue_content, update_content
from .google import search_console_summary, publish_gbp_post
from .notifications import telegram
from .config import GBP_AUTO_PUBLISH

TZ = ZoneInfo('Europe/Rome')
PORTFOLIO = [
    ('Guida Lavoro Italia', 'https://guidalavoroitalia.it'),
    ('Malt Service', 'https://maltservice.it'),
    ('Fluxa Platform', 'https://fluxa-platform.it'),
    ('EasyRevoke', 'https://www.easyrevoke.com')
]


async def weekly_report() -> None:
    stats = lead_stats(7)
    gsc = None
    try:
        gsc = await search_console_summary(28)
    except Exception as exc:
        await telegram(f'Perrucci Marketing — Search Console non disponibile: {type(exc).__name__}')

    lines = ['PERRUCCI SOLUTIONS — Weekly Growth', f"Lead 7gg: {stats['total']} (nuovi: {stats['new']})"]
    if stats['services']:
        lines.append('Servizi richiesti: ' + ', '.join(f"{x['service']}={x['n']}" for x in stats['services']))
    if gsc:
        lines += [f"Search 28gg: {gsc['clicks']} click / {gsc['impressions']} impression / CTR {gsc['ctr']:.1%}"]
        if gsc['queries']:
            lines.append('Top query: ' + ', '.join(str(x.get('keys', [''])[0]) for x in gsc['queries'][:5]))
        if gsc['impressions'] > 200 and gsc['ctr'] < 0.02:
            lines.append('Priorità: migliorare title/meta delle pagine con impression e CTR basso.')
        elif gsc['clicks'] > 30 and stats['total'] == 0:
            lines.append('Priorità: traffico presente ma nessun lead; testare CTA/form e proposta di valore.')
    else:
        lines.append('Priorità setup: collegare Search Console API per decisioni basate sui dati.')
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
    scheduler = AsyncIOScheduler(timezone=TZ)
    scheduler.add_job(weekly_report, CronTrigger(day_of_week='mon', hour=8, minute=15, timezone=TZ), id='weekly_report', replace_existing=True)
    scheduler.add_job(weekly_content, CronTrigger(day_of_week='wed', hour=10, minute=0, timezone=TZ), id='weekly_content', replace_existing=True)
    return scheduler
