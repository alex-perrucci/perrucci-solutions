'use client';

import { useEffect, useState } from 'react';
import Brand from './Brand';

const links = [
  ['Servizi', '/#servizi'],
  ['Siti web Parma', '/siti-web-parma'],
  ['Portfolio', '/#portfolio'],
  ['Prezzi', '/#prezzi'],
  ['Come lavoriamo', '/#processo'],
  ['FAQ', '/#faq']
];

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand-link" href="/" aria-label="Perrucci Solutions, torna alla home">
          <Brand />
        </a>

        <nav className="desktop-nav" aria-label="Navigazione principale">
          {links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </nav>

        <a className="button button--primary header-cta" href="/#contatti">Richiedi un preventivo</a>

        <button
          className="menu-toggle"
          type="button"
          aria-label={open ? 'Chiudi menu' : 'Apri menu'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>

      <div className={`mobile-nav${open ? ' is-open' : ''}`} id="mobile-navigation">
        <nav className="container" aria-label="Navigazione mobile">
          {links.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>{label}<span aria-hidden="true">↗</span></a>
          ))}
          <a className="button button--primary" href="/#contatti" onClick={() => setOpen(false)}>Richiedi un preventivo</a>
          <a className="button button--secondary" href="https://wa.me/393880956211" target="_blank" rel="noreferrer">WhatsApp</a>
        </nav>
      </div>
    </header>
  );
}
