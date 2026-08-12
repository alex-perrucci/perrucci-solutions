'use client';

import { FormEvent, useState } from 'react';

const API = process.env.NEXT_PUBLIC_MARKETING_API_URL || 'https://api.perruccisolutions.com';

export default function LeadForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const company = String(form.get('company') || '').trim();
    const message = String(form.get('message') || '').trim();

    const payload = {
      name: String(form.get('name') || '').trim(),
      email: String(form.get('email') || '').trim(),
      phone: String(form.get('phone') || '').trim() || null,
      service: String(form.get('service') || '').trim() || null,
      message: company ? `Azienda: ${company}\n\n${message}` : message,
      privacy_consent: String(form.get('privacy_consent') || ''),
      website: String(form.get('website') || ''),
      source: 'website',
      page: window.location.pathname
    };

    try {
      const response = await fetch(`${API}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error('request_failed');
      formElement.reset();
      setStatus('ok');
    } catch {
      setStatus('error');
    }
  }

  return (
    <form className="lead-form" onSubmit={submit} noValidate={false}>
      <div className="form-grid">
        <label>
          <span>Nome *</span>
          <input name="name" required minLength={2} maxLength={100} autoComplete="name" placeholder="Il tuo nome" />
        </label>
        <label>
          <span>Azienda <small>opzionale</small></span>
          <input name="company" maxLength={120} autoComplete="organization" placeholder="Nome attività o azienda" />
        </label>
        <label>
          <span>Email *</span>
          <input name="email" type="email" required autoComplete="email" placeholder="nome@email.it" />
        </label>
        <label>
          <span>Telefono <small>opzionale</small></span>
          <input name="phone" inputMode="tel" maxLength={40} autoComplete="tel" placeholder="+39 ..." />
        </label>
      </div>

      <label>
        <span>Servizio</span>
        <select name="service" defaultValue="Sito vetrina">
          <option>Sito vetrina</option>
          <option>Landing page</option>
          <option>E-commerce</option>
          <option>Restyling</option>
          <option>Manutenzione</option>
          <option>Software personalizzato</option>
          <option>Automazione</option>
          <option>Consulenza informatica</option>
        </select>
      </label>

      <label>
        <span>Messaggio *</span>
        <textarea name="message" rows={6} required minLength={10} maxLength={3000} placeholder="Raccontaci cosa vuoi realizzare, anche in poche righe." />
      </label>

      <div className="honeypot" aria-hidden="true">
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>

      <label className="consent">
        <input type="checkbox" name="privacy_consent" value="yes" required />
        <span>Acconsento al trattamento dei dati inviati per essere ricontattato.</span>
      </label>

      <button className="button button--primary button--large form-submit" disabled={status === 'sending'} type="submit">
        {status === 'sending' ? 'Invio in corso…' : 'Richiedi un preventivo'}
        {status !== 'sending' && <span aria-hidden="true">→</span>}
      </button>

      <div className="form-status" aria-live="polite" aria-atomic="true">
        {status === 'ok' && <p className="form-message form-message--success">Richiesta ricevuta. Ti ricontatteremo il prima possibile.</p>}
        {status === 'error' && <p className="form-message form-message--error">Invio non riuscito. Puoi scriverci su WhatsApp o a info@perruccisolutions.com.</p>}
      </div>
    </form>
  );
}
