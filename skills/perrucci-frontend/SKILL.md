---
name: perrucci-frontend
description: Design, implement and critically review the Perrucci Solutions website. Use for homepage redesigns, UI polish, conversion-oriented frontend work, responsive work and visual QA in this repository.
---

# Perrucci Solutions Frontend

Before any substantial visual work, read and apply:
- `../frontend-design/SKILL.md`
- `../frontend-design-review/SKILL.md`
- repository `AGENTS.md`

## Subject, audience, job

Perrucci Solutions is an Italian independent web studio. The primary commercial product is modern websites for SMEs, professionals and local businesses. Software, automations and IT consulting are secondary extensions.

The homepage has one job: make a credible prospect understand the offer quickly, trust the craft, inspect real work and request a quote or start a WhatsApp conversation.

## Ground truth

Never invent social proof, client counts, reviews, performance gains, offices, VAT details, certifications, awards or case-study results.

Real commercial facts:
- Brand: Perrucci Solutions
- Domain: perruccisolutions.com
- Email: info@perruccisolutions.com
- Phone / WhatsApp: +39 388 095 6211 / https://wa.me/393880956211
- Coverage: all Italy, remote or at the client
- Main services: showcase websites, landing pages, e-commerce, redesigns, maintenance
- Advanced services: custom software, automations, IT consulting
- Portfolio: guidalavoroitalia.it, maltservice.it, fluxa-platform.it, easyrevoke.com
- Showcase website: from €29 + VAT one-time initial creation cost
- Maintenance: €50/month
- Other work: quote-based

## Technical invariants

Preserve:
- Next.js static export
- `/leads` marketing API integration and honeypot
- Docker build and CI
- sitemap, robots, JSON-LD and SEO metadata
- accessibility and reduced-motion behavior

Do not add a large UI or animation dependency just for aesthetics.

## Mandatory design process

1. Inspect the current implementation and existing real content.
2. Before editing UI, create or update `docs/DESIGN_DIRECTION.md` with:
   - audience and single page job
   - 4–6 named color tokens
   - at least two typography roles
   - layout concept
   - one signature element specific to Perrucci Solutions
   - an explicit anti-template critique explaining what was rejected
3. Commit to one direction. Do not blend unrelated visual styles.
4. Implement the direction consistently across the whole page.
5. Review at 360, 390, 768, 1024 and 1440+ widths when tooling permits.
6. Run the `frontend-design-review` criteria after implementation. Treat generic AI aesthetics, weak hierarchy, broken reflow and unclear primary CTA as major issues.
7. Fix blocking and major design issues before declaring the work complete.
8. Run repository typecheck/build/CI and Docker checks.

## Perrucci-specific aesthetic fail conditions

Reject a design if it relies on several of these:
- generic centered SaaS hero
- arbitrary gradient blobs or purple glow
- repeated identical cards for every section
- fake dashboard/browser screenshots
- fake customer logos or testimonials
- bento layout used only because it is fashionable
- excessive rounded rectangles and pills
- decorative 01/02/03 numbering where order has no meaning
- default-feeling typography with no brand character
- multiple equally loud CTAs
- technical jargon that makes the site feel like a developer portfolio instead of a commercial web studio

## Visual QA questions

Before approval ask:
- Would this visual identity still obviously belong to Perrucci Solutions if the logo were hidden?
- Is there one memorable signature rather than ten small effects?
- Does the portfolio feel like proof, not decoration?
- Is the €29 initial price clearly separated from €50/month maintenance?
- Does mobile look intentionally designed rather than merely stacked?
- Can a prospect reach quote/WhatsApp in one obvious action?
