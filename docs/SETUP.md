# Setup produzione — Perrucci Solutions

## 1. DNS
Punta questi record A all'IPv4 della VPS `57.131.134.96`:

- `@` → `57.131.134.96`
- `www` → `57.131.134.96`
- `api` → `57.131.134.96`

Caddy richiederà automaticamente i certificati HTTPS dopo la propagazione DNS.

## 2. VPS condivisa
Configurazione disponibile: Ubuntu 26.04, 2 vCore, 4 GB RAM, 40 GB storage.

La VPS ospita già altri progetti. Perrucci Solutions non deve sostituire il Caddy esistente e non deve occupare direttamente le porte pubbliche 80/443.

Architettura:

- Caddy pubblico esistente: `fluxa-caddy-1`
- rete edge condivisa: `fluxa_edge`
- sito Perrucci: servizio Docker `perrucci-web:80`
- API marketing: servizio Docker `perrucci-marketing:8000`
- repository: `/opt/perrucci-solutions`

Questa architettura evita un LLM residente e un database server separato: sito statico + FastAPI + SQLite/WAL + scheduler. È molto più adatta a 4 GB e mantiene il costo variabile a zero.

## 3. Utente e deploy key GitHub dedicati
Per evitare qualsiasi conflitto con Fluxa, usare un utente Linux dedicato e una chiave deploy diversa per Perrucci.

Esegui come root:

```bash
useradd -m -s /bin/bash perrucci || true
usermod -aG docker perrucci
mkdir -p /opt/perrucci-solutions
chown -R perrucci:perrucci /opt/perrucci-solutions
install -d -m 700 -o perrucci -g perrucci /home/perrucci/.ssh
sudo -u perrucci ssh-keygen -t ed25519 -C "perrucci-solutions-vps-deploy" -f /home/perrucci/.ssh/id_ed25519_perrucci_github -N ""
cat /home/perrucci/.ssh/id_ed25519_perrucci_github.pub
```

Copia la chiave pubblica mostrata e aggiungila in GitHub:

`alex-perrucci/perrucci-solutions` → Settings → Deploy keys → Add deploy key.

Titolo consigliato: `OVH VPS Perrucci read-only`. Non abilitare write access.

Crea `/home/perrucci/.ssh/config`:

```sshconfig
Host github-perrucci
    HostName github.com
    User git
    IdentityFile /home/perrucci/.ssh/id_ed25519_perrucci_github
    IdentitiesOnly yes
```

Poi:

```bash
chown perrucci:perrucci /home/perrucci/.ssh/config
chmod 600 /home/perrucci/.ssh/config
sudo -u perrucci ssh-keyscan github.com >> /home/perrucci/.ssh/known_hosts
chmod 600 /home/perrucci/.ssh/known_hosts
chown perrucci:perrucci /home/perrucci/.ssh/known_hosts
sudo -u perrucci ssh -T git@github-perrucci
```

L'autenticazione GitHub dovrebbe riuscire anche se GitHub comunica che non fornisce shell access.

Clona quindi la repository:

```bash
rmdir /opt/perrucci-solutions 2>/dev/null || true
sudo -u perrucci git clone git@github-perrucci:alex-perrucci/perrucci-solutions.git /opt/perrucci-solutions
```

La chiave di Fluxa non viene letta né modificata.

## 4. File `.env` sulla VPS

```bash
cd /opt/perrucci-solutions
cp .env.example .env
chown perrucci:perrucci .env
chmod 600 .env
nano .env
```

Telegram è opzionale ma consigliato: inserendo `TELEGRAM_BOT_TOKEN` e `TELEGRAM_CHAT_ID` riceverai lead, report e bozze contenuto.

## 5. Primo avvio container
Verifica prima la rete condivisa:

```bash
docker network inspect fluxa_edge >/dev/null
```

Poi:

```bash
sudo -u perrucci bash -lc 'cd /opt/perrucci-solutions && docker compose up -d --build'
```

Verifica che Caddy possa raggiungere Perrucci:

```bash
docker exec fluxa-caddy-1 wget -qO- http://perrucci-web:80/ | head
docker exec fluxa-caddy-1 wget -qO- http://perrucci-marketing:8000/health
```

## 6. Caddy condiviso
Il Caddy live è montato da:

`/opt/fluxa/deploy/vps/Caddyfile` → `/etc/caddy/Caddyfile`

Non copiare sopra questo file con `infra/Caddyfile`: quello nella repo Perrucci è solo uno snippet da integrare.

Prima di modificarlo:

```bash
cp /opt/fluxa/deploy/vps/Caddyfile /opt/fluxa/deploy/vps/Caddyfile.bak.$(date +%Y%m%d-%H%M%S)
```

Dopo aver integrato lo snippet, validare:

```bash
docker exec fluxa-caddy-1 caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile
```

Il container è avviato con `caddy run` e `admin off`; dopo una validazione riuscita ricaricare con:

```bash
docker kill --signal=SIGUSR1 fluxa-caddy-1
docker logs --since 30s fluxa-caddy-1
```

## 7. Deploy automatico GitHub Actions
Il workflow entra nella VPS e aggiorna `/opt/perrucci-solutions` via Git, usando la deploy key locale del server. Poi ricostruisce solo lo stack Perrucci.

Servono quattro repository secrets:

- `VPS_HOST`: `57.131.134.96`
- `VPS_PORT`: `22`
- `VPS_USER`: `perrucci`
- `VPS_SSH_KEY`: chiave privata usata da GitHub Actions per entrare come utente `perrucci`

`VPS_SSH_KEY` NON è la deploy key GitHub creata sopra. Sono due coppie di chiavi diverse:

- `/home/perrucci/.ssh/id_ed25519_perrucci_github`: VPS → GitHub, accesso read-only alla sola repo Perrucci;
- `VPS_SSH_KEY`: GitHub Actions → VPS, accesso SSH all'utente `perrucci`.

Per creare la seconda coppia, sulla tua macchina locale o in un ambiente sicuro:

```bash
ssh-keygen -t ed25519 -C "github-actions-perrucci-vps" -f perrucci_actions_vps -N ""
```

Aggiungi `perrucci_actions_vps.pub` a `/home/perrucci/.ssh/authorized_keys` sulla VPS e salva il contenuto privato di `perrucci_actions_vps` nel secret `VPS_SSH_KEY` della repo Perrucci.

## 8. Google Search Console
Dopo che il sito è online:

1. aggiungi e verifica `https://perruccisolutions.com/` in Search Console;
2. crea credenziali OAuth Google con accesso Search Console read-only;
3. autorizza l'account che possiede la proprietà;
4. inserisci le credenziali richieste nel `.env` della VPS.

## 9. Google Business Profile
Prima crea e verifica il profilo solo se l'attività rispetta i requisiti di idoneità Google. Poi richiedi/abilita l'accesso alle Business Profile APIs.

Lascia inizialmente l'autopublish disabilitato. In questa modalità il sistema genera bozze verificabili e le invia su Telegram.

## 10. Target iniziale
La copertura può essere nazionale, ma l'ICP iniziale resta:

- PMI e professionisti con sito assente/datato;
- attività locali e aziende di servizi dove un lead vale abbastanza da giustificare un sito migliore;
- realtà che hanno bisogno di landing page, manutenzione o automazioni oltre al sito.

Il messaggio principale resta **siti web**; software e automazioni sono servizi secondari/upsell.

## 11. Prezzo
Offerta commerciale attuale:

- sito vetrina base: `€29 + IVA` una tantum;
- manutenzione: `€50/mese`;
- altri servizi: su preventivo.

Prima della pubblicazione definitiva va verificato che la formula prezzo e IVA sia coerente con il target B2B/B2C e con il regime fiscale effettivo.

## 12. Automazioni previste
- Weekly Growth Report su Telegram.
- bozza contenuto Google Business; autopublish solo se abilitato.
- ogni lead dal sito: salvataggio SQLite + notifica Telegram.
- endpoint admin protetti per esecuzioni manuali/statistiche.
