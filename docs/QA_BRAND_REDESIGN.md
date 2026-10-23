# Perrucci Solutions — Brand redesign QA

## Verifiche eseguite (23 ottobre 2026)

- `npm run typecheck` — **PASS**
- `npm run build` — **PASS**, static export Next.js 16; tutte le rotte pubbliche generabili
- `npm run test:brand` — **PASS**, 34 controlli strutturali: contenuti, sezioni raggiungibili, asset ufficiali, prezzi distinti, form, endpoint lead, contatti, route e token di design
- Controllo manuale del sorgente per tastiera/focus, navigazione mobile, struttura semantica e `prefers-reduced-motion` — **PASS sulla struttura**, non sostitutivo di verifica assistiva reale

## Verifiche da completare prima del merge

Il download di Chromium per Playwright non è riuscito nell'ambiente di esecuzione (archivio remoto vuoto/corrotto); pertanto **non** abbiamo screenshot né misure visive attendibili dei viewport.

- Rendering e reflow a 360, 390, 768, 1024, 1440 px, incluso zoom 200%
- Apertura/chiusura menu, Escape, tab order, FAQ e form con dispositivo reale
- Test con VoiceOver o NVDA
- Lighthouse (prestazioni, SEO, accessibilità) e browser Safari/Android
- Test d'integrazione `/leads` contro l'API operativa, preferibilmente con un lead di prova concordato
- Conferma commerciale della proposta creativa e dei prezzi pubblicati

## Scelte e compromessi

- SVG ufficiali mantenuti intatti. Il lockup largo contiene abbondante canvas vuoto: la navbar ritaglia soltanto quell'area per rispettare una dimensione leggibile.
- Il fondo grafico della hero riprende le linee circolari della proposta *website-art-direction*; il monogramma non è animato o decorato.
- CSS-only per le microtransizioni; nessuna dipendenza GSAP/animazione aggiunta a un sito già pronto per static export.
- Nessun logo cliente, recensione, metrica o risultato creato artificialmente.
- In questa PR non vengono modificati backend marketing, deploy o segreti.
