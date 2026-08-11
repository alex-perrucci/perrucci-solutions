'use client';

import { FormEvent, useState } from 'react';

const API = process.env.NEXT_PUBLIC_MARKETING_API_URL || 'https://api.perruccisolutions.com';

export default function LeadForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const response = await fetch(`${API}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, source: 'website', page: window.location.pathname })
      });
      if (!response.ok) throw new Error('request_failed');
      event.currentTarget.reset();
      setStatus('ok');
    } catch {
      setStatus('error');
    }
  }

  return (
    <form className="lead-form" onSubmit={submit}>
      <div className="form-grid">
        <label>Nome<input name="name" required autoComplete="name" /></label>
        <label>Email<input name="email" type="email" required autoComplete="email" /></label>
        <label>Telefono<input name="phone" inputMode="tel" autoComplete="tel" /></label>
        <label>Servizio<select name="service" defaultValue="Sito web"><option>Sito web</option><option>Landing page</option><option>E-commerce</option><option>Restyling</option><option>Manutenzione</option><option>Software personalizzato</option><option>Automazione</option><option>Consulenza informatica</option></select></label>
      </div>
      <label>Parlaci del progetto<textarea name="message" rows={5} required /></label>
      <label className="consent"><input type="checkbox" name="privacy_consent" value="yes" required /> Acconsento al trattamento dei dati inviati per essere ricontattato.</label>
      <button className="button primary" disabled={status === 'sending'}>{status === 'sending' ? 'Invio…' : 'Richiedi un preventivo'}</button>
      {status === 'ok' && <p className="form-message success">Richiesta ricevuta. Ti ricontatteremo il prima possibile.</p>}
      {status === 'error' && <p className="form-message">Invio non riuscito. Scrivici su WhatsApp o a info@perruccisolutions.com.</p>}
    </form>
  );
}
