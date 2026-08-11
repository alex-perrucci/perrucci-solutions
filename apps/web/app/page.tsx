import LeadForm from '@/components/LeadForm';

const services = [
  ['Siti vetrina', 'Presenza online chiara, veloce e credibile per attività e professionisti.'],
  ['Landing page', 'Pagine focalizzate su una campagna, un servizio o una richiesta di contatto.'],
  ['E-commerce', 'Esperienze di acquisto semplici, responsive e costruite intorno al tuo catalogo.'],
  ['Restyling', 'Rinnoviamo siti datati migliorando design, struttura, mobile e performance.'],
  ['Manutenzione', 'Aggiornamenti, controlli e interventi continuativi senza dover rincorrere fornitori diversi.'],
  ['Software e automazioni', 'Soluzioni personalizzate quando un semplice sito non basta.']
];

const portfolio = [
  ['Guida Lavoro Italia', 'https://guidalavoroitalia.it', 'Progetto web'],
  ['Malt Service', 'https://maltservice.it', 'Progetto web'],
  ['Fluxa Platform', 'https://fluxa-platform.it', 'Progetto web'],
  ['EasyRevoke', 'https://www.easyrevoke.com', 'SaaS / prodotto web']
];

export default function Home() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Perrucci Solutions',
    url: 'https://perruccisolutions.com',
    email: 'info@perruccisolutions.com',
    telephone: '+393880956211',
    areaServed: { '@type': 'Country', name: 'Italia' },
    serviceType: ['Sviluppo siti web', 'Landing page', 'E-commerce', 'Software personalizzato', 'Automazioni', 'Consulenza informatica']
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <header className="nav wrap">
        <a className="brand" href="#top"><img src="/brand/logo.svg" alt="Perrucci Solutions" /></a>
        <nav><a href="#servizi">Servizi</a><a href="#portfolio">Portfolio</a><a href="#contatti">Contatti</a></nav>
        <a className="button small" href="https://wa.me/393880956211">WhatsApp</a>
      </header>

      <section className="hero wrap" id="top">
        <div>
          <span className="eyebrow">SVILUPPO WEB • SOFTWARE • AUTOMAZIONI</span>
          <h1>Siti web che lavorano per la tua attività.</h1>
          <p className="lead">Progettiamo siti moderni, veloci e pensati per trasformare visite in contatti. Lavoriamo con aziende e professionisti in tutta Italia.</p>
          <div className="actions"><a className="button primary" href="#contatti">Parliamo del progetto</a><a className="button ghost" href="#portfolio">Guarda i lavori</a></div>
          <p className="price-note"><strong>Soluzioni web da €29 + IVA.</strong> Manutenzione e servizi continuativi vengono definiti in base al progetto.</p>
        </div>
        <div className="hero-card"><div className="browser"><span></span><span></span><span></span></div><div className="screen"><div className="mini-logo">P</div><h2>Il tuo business.<br/>Una presenza digitale migliore.</h2><div className="mock-button">Richiedi preventivo</div></div></div>
      </section>

      <section className="strip"><div className="wrap strip-grid"><span>Responsive</span><span>SEO-ready</span><span>Performance</span><span>Supporto diretto</span></div></section>

      <section className="section wrap" id="servizi">
        <span className="eyebrow">SERVIZI</span><h2>Dal sito essenziale alla soluzione su misura.</h2>
        <div className="cards">{services.map(([title, text]) => <article className="card" key={title}><h3>{title}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className="section muted" id="portfolio"><div className="wrap"><span className="eyebrow">PORTFOLIO</span><h2>Progetti reali, non demo inventate.</h2><div className="portfolio-grid">{portfolio.map(([name, url, type]) => <a className="project" href={url} target="_blank" rel="noreferrer" key={url}><div className="project-top"><span>{type}</span><strong>↗</strong></div><h3>{name}</h3><p>{url.replace('https://','').replace('/','')}</p></a>)}</div></div></section>

      <section className="section wrap split"><div><span className="eyebrow">COME LAVORIAMO</span><h2>Un referente, un processo semplice.</h2></div><ol className="steps"><li><b>01</b><div><strong>Obiettivo</strong><p>Capire cosa deve ottenere il sito e chi deve convincere.</p></div></li><li><b>02</b><div><strong>Design & sviluppo</strong><p>Costruiamo una soluzione responsive, veloce e coerente con il brand.</p></div></li><li><b>03</b><div><strong>Pubblicazione</strong><p>Messa online, controlli tecnici e collegamento degli strumenti essenziali.</p></div></li><li><b>04</b><div><strong>Crescita</strong><p>Manutenzione, nuove pagine e miglioramenti guidati dai dati.</p></div></li></ol></section>

      <section className="section dark" id="contatti"><div className="wrap contact-grid"><div><span className="eyebrow">CONTATTI</span><h2>Hai un progetto? Raccontacelo.</h2><p>Disponibili dal lunedì al venerdì, 07:00–13:00 e 14:00–18:00.</p><div className="contact-links"><a href="tel:+393880956211">+39 388 095 6211</a><a href="mailto:info@perruccisolutions.com">info@perruccisolutions.com</a><a href="https://wa.me/393880956211">Scrivi su WhatsApp ↗</a></div></div><LeadForm /></div></section>

      <footer className="footer wrap"><img src="/brand/logo.svg" alt="Perrucci Solutions"/><p>© {new Date().getFullYear()} Perrucci Solutions. Tutti i diritti riservati.</p></footer>
    </main>
  );
}
