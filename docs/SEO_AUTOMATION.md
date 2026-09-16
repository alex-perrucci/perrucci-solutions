# Perrucci Solutions SEO feedback loop

The marketing service uses Google Search Console as a measurement and decision input, not as a trigger for reactive daily edits.

## Cadence

- **Daily 06:45 Europe/Rome** — collect a settled 28-day Search Console snapshot and persist it in SQLite.
- **Monday 08:00** — compare the latest 28 days with the previous 28 days, classify SEO opportunities and update the persistent backlog.
- **Monday 08:15** — send the weekly growth report with leads, GSC KPIs and the current P1/P2/P3 backlog.
- **14 and 28 days after a tracked SEO release** — compare page metrics with the release baseline and send the impact review to Telegram.

Search Console windows intentionally end two days before the current date to reduce decisions based on incomplete data.

## Decision rules

The engine is deliberately conservative.

### P1 — strengthen an existing page

Created when a page has at least 25 impressions in 28 days but remains beyond position 20, or when a query has enough evidence to be a near-ranking/CTR opportunity.

### P2 — emerging query / cannibalization review

An emerging query requires at least 10 impressions and an average position between 20 and 100. The action is to strengthen the page Google already associates with the query.

A cannibalization review is created only when the same query has meaningful visibility on multiple pages.

### CTR opportunity

Requires at least 50 impressions, an average position in the top 10 and CTR below 3%. This prevents title/meta changes based on tiny samples.

### New pages

The scheduler **never creates a new SEO landing automatically**. Query evidence can create a review task, but a new URL requires a distinct search intent and a human/code review. This is intended to prevent thin or doorway pages.

## Persistence

SQLite contains three SEO-specific tables:

- `gsc_snapshots` — daily/weekly Search Console datasets.
- `seo_tasks` — deterministic, deduplicated P1/P2/P3 tasks with evidence.
- `seo_changes` — tracked releases with their baseline and 14/28-day reviews.

## Admin endpoints

All endpoints require `X-Admin-Token`.

- `GET /admin/seo/tasks`
- `GET /admin/seo/snapshot`
- `POST /admin/run/gsc-collect`
- `POST /admin/run/seo-review`
- `POST /admin/run/weekly-report`

## Google credentials

The ChatGPT GSC Wizard connector and the VPS service are separate integrations. The marketing container requires Google OAuth credentials in `.env`:

- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_REFRESH_TOKEN`
- `GOOGLE_SEARCH_CONSOLE_SITE=sc-domain:perruccisolutions.com`

The Google OAuth grant must include read access to Search Console for the account that owns or can access the property.

## Initial tracked release

Release `2026-09-16-siti-web-parma-v1` tracks the first data-driven local SEO intervention:

1. strengthen `/siti-web-parma/` with useful service/process/SEO/FAQ content;
2. add a contextual internal link from the homepage services section;
3. add page-specific structured data and shorten the search title.

Its baseline was captured from Search Console before the release so the scheduler can evaluate the change after 14 and 28 days.
