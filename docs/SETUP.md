# Setup produzione — Perrucci Solutions

## 1. DNS
Punta questi record A all'IPv4 della VPS `57.131.134.96`:

- `@` → `57.131.134.96`
- `www` → `57.131.134.96`
- `api` → `57.131.134.96`

Caddy richiederà automaticamente i certificati HTTPS dopo la propagazione DNS.

## 2. VPS
Configurazione disponibile: Ubuntu 26.04, 2 vCore, 4 GB RAM, 40 GB storage.

Questa architettura evita un LLM residente e un database server separato: sito statico + FastAPI + SQLite/WAL + scheduler. È molto più adatta a 4 GB e mantiene il costo variabile a zero.

Esegui una volta:

```bash
sudo bash scripts/bootstrap-vps.sh
```

## 3. File `.env` sulla VPS

```bash
cd /opt/perrucci-solutions
cp .env.example .env
nano .env
```

Genera `ADMIN_TOKEN` con almeno 32 byte casuali. Non commetterlo.

Telegram è opzionale ma consigliato: inserendo `TELEGRAM_BOT_TOKEN` e `TELEGRAM_CHAT_ID` riceverai lead, report e bozze contenuto.

## 4. GitHub Secrets
Repository → Settings → Secrets and variables → Actions:

- `VPS_HOST`: `57.131.134.96`
- `VPS_PORT`: `22`
- `VPS_USER`: utente SSH dedicato
- `VPS_SSH_KEY`: chiave privata dedicata al deploy

La chiave pubblica corrispondente va in `~/.ssh/authorized_keys` dell'utente VPS.

## 5. Google Search Console
Dopo che il sito è online:

1. aggiungi e verifica `https://perruccisolutions.com/` in Search Console;
2. crea credenziali OAuth Google con accesso Search Console read-only;
3. autorizza l'account che possiede la proprietà;
4. inserisci `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REFRESH_TOKEN` nel `.env` della VPS.

Il report del lunedì userà impression, click, CTR e query per scegliere la priorità SEO.

## 6. Google Business Profile
Prima crea e verifica il profilo solo se l'attività rispetta i requisiti di idoneità Google. Poi richiedi/abilita l'accesso alle Business Profile APIs.

Per i post servono credenziali OAuth con scope `business.manage`, `GBP_ACCOUNT_ID` e `GBP_LOCATION_ID`.

Lascia inizialmente:

```env
GBP_AUTO_PUBLISH=false
```

In questa modalità il mercoledì il sistema genera una bozza verificabile e la invia su Telegram. Quando API e profilo sono pronti, `true` abilita la pubblicazione automatica.

## 7. Target iniziale
Non tentare di vendere “a tutta Italia” in modo indistinto. La copertura è nazionale, ma l'ICP iniziale è:

- PMI e professionisti con sito assente/datato;
- attività locali e aziende di servizi dove un lead vale abbastanza da giustificare un sito migliore;
- realtà che hanno bisogno di landing page, manutenzione o automazioni oltre al sito.

Il messaggio principale resta **siti web**; software e automazioni sono servizi secondari/upsell.

## 8. Prezzo
Il sito comunica: `Soluzioni web da €29 + IVA`, specificando che manutenzione e servizi continuativi dipendono dal progetto. Prima della pubblicazione definitiva va verificato che questa formula corrisponda esattamente all'offerta commerciale e alle condizioni applicate.

## 9. Automazioni già previste
- Lunedì 08:15: Weekly Growth Report su Telegram.
- Mercoledì 10:00: bozza contenuto Google Business; autopublish solo se abilitato.
- Ogni lead dal sito: salvataggio SQLite + notifica Telegram.
- Endpoint admin protetti da `X-Admin-Token` per esecuzioni manuali/statistiche.

## 10. Prossimi collegamenti
Dopo il primo deploy: Search Console, Business Profile, eventuale GA4/analytics aggiuntivo e creatività automatiche da screenshot reali del portfolio.
