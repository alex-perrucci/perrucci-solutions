import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const output = resolve(root, 'out');
const file = (path) => readFileSync(resolve(root, path), 'utf8');
const html = readFileSync(resolve(output, 'index.html'), 'utf8');
const parmaHtml = readFileSync(resolve(output, 'siti-web-parma/index.html'), 'utf8');
let checks = 0;

function check(condition, label) {
  assert.ok(condition, label);
  console.log(`✓ ${label}`);
  checks++;
}

check(html.includes('<html lang="it"'), 'Homepage in italiano');
check(html.includes('Il digitale,') && html.includes('fatto bene.'), 'Headline del brand presente');
check(html.includes('Parliamo del tuo progetto'), 'CTA principale coerente');

for (const id of ['top', 'servizi', 'portfolio', 'prezzi', 'processo', 'faq', 'contatti']) {
  check(html.includes(`id="${id}"`), `Sezione #${id} raggiungibile`);
}

for (const name of ['name', 'email', 'message', 'privacy_consent', 'website']) {
  check(html.includes(`name="${name}"`), `Campo form ${name} disponibile`);
}

check(file('components/LeadForm.tsx').includes('`${API}/leads`'), 'Integrazione lead API invariata');
check(html.includes('da €29') && html.includes('€50'), 'Prezzo iniziale e manutenzione distinti');
check(html.includes('guidalavoroitalia.it') && html.includes('maltservice.it'), 'Portfolio reale presente');
check(html.includes('fluxa-platform.it') && html.includes('easyrevoke.com'), 'Portfolio completo');
check(html.includes('https://wa.me/393880956211'), 'WhatsApp diretto disponibile');

for (const asset of [
  'identity/svg/primary-light.svg',
  'identity/svg/primary-dark.svg',
  'identity/svg/symbol-ink.svg',
  'identity/favicon/favicon.ico',
  'brand/og-image.png',
  'icon.svg',
  'apple-icon.png'
]) {
  check(existsSync(resolve(output, asset)), `Asset ufficiale /${asset}`);
}

for (const path of ['siti-web-parma/index.html', 'tifregano-cosi/index.html', 'robots.txt', 'sitemap.xml']) {
  check(existsSync(resolve(output, path)), `Route /${path} esportata`);
}

const css = file('app/premium.css');
check(css.includes('prefers-reduced-motion: reduce'), 'Movimento ridotto gestito');
check(css.includes('max-width: 650px') && css.includes('max-width: 900px'), 'Reflow mobile/tablet previsto');
check(css.includes('#0b121b') && css.includes('#326bff') && css.includes('#f6f8fa'), 'Palette ufficiale applicata');

const header = file('components/Header.tsx');
check((header.match(/href="#contatti"/g) || []).length === 2, 'Entrambe le CTA header puntano al modulo nella pagina corrente');
check(!header.includes('href="/#contatti"'), 'Le CTA header non riportano alla homepage');
check(parmaHtml.includes('id="contatti"'), 'La landing Parma include il modulo contatti locale');
console.log(`\n${checks} controlli strutturali superati.`);
