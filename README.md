# Perrucci Solutions

Piattaforma web + marketing automation per **Perrucci Solutions**.

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
