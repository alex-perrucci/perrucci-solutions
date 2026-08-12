# Perrucci Solutions — Design Direction

## Subject

Perrucci Solutions is an independent Italian web studio, not a SaaS product and not a developer portfolio. Its strongest commercial proof is the combination of a clear offer, direct access to the person doing the work, and real projects that visitors can open themselves.

## Audience and single job

Audience: Italian SMEs, professionals and local businesses that need a new website, a redesign or a clearer digital presence.

Single homepage job: turn a warm prospect into a quote request or WhatsApp conversation after they understand the offer and inspect real work.

## Direction: Studio Proof Sheet

Tone: precise, editorial, modern, quietly technical. The page should feel like the public-facing proof sheet of a small digital studio: strong typography, visible structure, direct language and real work. It should not look like a startup dashboard or an agency template.

### Color tokens

- **Ink** `#08111F` — primary dark field and high-contrast text
- **Paper** `#F6F8FB` — main page background
- **White** `#FFFFFF` — forms and selective high-contrast surfaces
- **Cobalt** `#245BFF` — brand/action color
- **Cobalt mist** `#DCE6FF` — subtle states and rules
- **Steel** `#667085` — supporting copy

No decorative rainbow gradients. Cobalt is the only strong chromatic voice.

### Typography

- **Display / brand voice:** Syne, 600–800. Used for hero, section titles and project names.
- **Body / UI:** Manrope, 400–700. Used for copy, navigation, forms and buttons.

No Inter/Roboto/Arial/Space Grotesk. Type itself should carry much of the identity.

### Layout concept

Use a disciplined 12-column editorial grid, but break symmetry at deliberate moments. The hero is text-led rather than mockup-led. Services are presented as large horizontal capability rows rather than a grid of repeated cards. Portfolio is a full-width project index with real domains and external links.

Desktop sketch:

```text
┌──────────────────────────────────────────────────────────────────────┐
│ PS / PERRUCCI SOLUTIONS       services work pricing process  [CTA]  │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  SITI WEB CHE                                                        │
│  FANNO IL LAVORO.                         STUDIO NOTE / CAPABILITIES  │
│  Huge, left-weighted thesis                                          │
│  copy + quote CTA                                                    │
│                                                                      │
├──────── SELECTED WORK / REAL PROJECT REEL ──────────────────────────┤
│ GuidaLavoroItalia │ Maltservice │ Fluxa Platform │ EasyRevoke        │
├──────────────────────────────────────────────────────────────────────┤
│ SERVICES      large capability rows, not cards                       │
├──────────────────────────────────────────────────────────────────────┤
│ WHY           concise proof-oriented statements                      │
├──────────────────────────────────────────────────────────────────────┤
│ WORK          full-width project index / open each project           │
├──────────────────────────────────────────────────────────────────────┤
│ €29 one-time initial build         €50/month maintenance             │
├──────────────────────────────────────────────────────────────────────┤
│ real 5-step process                                                     │
├──────────────────────────────────────────────────────────────────────┤
│ FAQ                                                                  │
├──────────────────────────────────────────────────────────────────────┤
│ dark contact close + form                                            │
└──────────────────────────────────────────────────────────────────────┘
```

## Signature element

**The Proof Reel.** Real project names and domains appear immediately below the hero as a strong horizontal editorial index and return later as the full portfolio. No fake browser screenshots. The work itself is the proof.

This is the one deliberate visual risk: instead of trying to impress with a fabricated hero mockup, the homepage exposes the studio's real project index almost immediately.

## Motion

Minimal and orchestrated:
- one hero entrance sequence
- thin rule / text shift on project hover
- small arrow movement on actionable links
- no continuous floating, particles, parallax or mouse followers
- respect `prefers-reduced-motion`

## Anti-template critique

Rejected from the previous direction:
- fake browser/project mockups that visually imply screenshots
- floating cards in the hero
- repeated card grids across services and portfolio
- bento layout used as a style rather than because the information requires it
- Sora + Inter combination, which felt too neutral for the desired identity
- rounded containers around almost every concept
- decorative circles/glows and generic SaaS visual language

The new design should remain recognizable as Perrucci Solutions even if the logo is hidden: dark ink + cobalt, oversized Syne typography, the real project Proof Reel and the direct studio-like structure are the identity.

## Conversion hierarchy

Primary action: **Richiedi un preventivo**.

Secondary action: **WhatsApp**.

Portfolio links are proof actions, not competing primary CTAs.

## Pricing communication

Never conflate the two prices:
- `da €29 + IVA` = one-time initial creation cost for the showcase website starting point
- `€50/mese` = maintenance
- landing pages, e-commerce, software, automations and custom work = quote-based

## Mobile intent

Mobile must not merely stack the desktop composition. The Proof Reel becomes a vertical four-row index, hero typography stays expressive but controlled, capability rows become compact disclosure-like blocks, pricing stays explicitly separated, and the contact form remains easy to complete at 360px.
