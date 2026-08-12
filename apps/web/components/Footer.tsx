import Brand from './Brand';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <a href="#top" aria-label="Perrucci Solutions, torna all'inizio"><Brand inverse /></a>
          <p>Sviluppo web · Software · Consulenza</p>
        </div>

        <div className="footer-column">
          <span>Navigazione</span>
          <a href="#servizi">Servizi</a>
          <a href="#portfolio">Portfolio</a>
          <a href="#prezzi">Prezzi</a>
          <a href="#processo">Come lavoriamo</a>
          <a href="#faq">FAQ</a>
        </div>

        <div className="footer-column">
          <span>Contatti</span>
          <a href="mailto:info@perruccisolutions.com">info@perruccisolutions.com</a>
          <a href="tel:+393880956211">+39 388 095 6211</a>
          <a href="https://wa.me/393880956211" target="_blank" rel="noreferrer">WhatsApp ↗</a>
        </div>

        <div className="footer-column">
          <span>Copertura</span>
          <p>Italia</p>
          <p>Da remoto o presso il cliente</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {new Date().getFullYear()} Perrucci Solutions. Tutti i diritti riservati.</p>
        <p>perruccisolutions.com</p>
      </div>
    </footer>
  );
}
