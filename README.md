# Perrucci Solutions

Piattaforma web + marketing automation per **Perrucci Solutions**.

## Identità e sito

Il frontend utilizza il brand kit *Perrucci Solutions / Precision* (ottobre 2026): monogramma PS e lockup SVG ufficiali in `apps/web/public/identity/`, favicon, immagine di condivisione e colori documentati in `docs/DESIGN_DIRECTION.md`. La homepage è progettata con una gerarchia responsive, focus visibile, rispetto del movimento ridotto e CTA orientate al contatto.

La direzione applica i principi Apple-like UI di chiarezza, proporzioni, navigazione e accessibilità, mantenendo l'identità autonoma di Perrucci Solutions. Il logo non viene alterato: soltanto lo spazio vuoto eccessivo del canvas SVG viene ritagliato nel contenitore della navbar.

Per verificare il frontend:

```bash
cd apps/web
npm install
npm run typecheck
npm run build
npm run test:brand
```

`test:brand` controlla la build statica, gli asset, le CTA, gli anchor e i campi del form. I test visivi in browser devono essere eseguiti a 360, 390, 768, 1024 e 1440 px prima del merge; il controllo strutturale non sostituisce un audit Lighthouse/accessibilità con browser reale.

## Obiettivo

Generare richieste commerciali qualificate per servizi di sviluppo web, software e automazione, mantenendo costi operativi minimi e un'infrastruttura semplice da gestire su VPS OVH.

## Dati aziendali

- Dominio: `perruccisolutions.com`
- Email: `info@perruccisolutions.com`
- Telefono / WhatsApp: `+39 388 095 6211`
- Operatività: tutta Italia
- Orari: 07:00–13:00 / 14:00–18:00

## Servizi

- Siti vetrina
- Landing page
- E-commerce
- Restyling siti
- Manutenzione
- Software personalizzato
- Automazioni
- Consulenza informatica

## Portfolio iniziale

- https://guidalavoroitalia.it
- https://maltservice.it
- https://fluxa-platform.it
- https://www.easyrevoke.com

## Architettura prevista

- `apps/web`: sito pubblico SEO-first, static export
- `services/marketing`: API lead + analytics privacy-first + scheduler marketing
- `skills/`: playbook riutilizzabili per Codex/ChatGPT
- `infra/`: Docker/Caddy/deploy VPS
- `.github/workflows`: CI e deploy

> Nessuna credenziale deve essere committata. Usare `.env` locale/VPS e GitHub Secrets.
