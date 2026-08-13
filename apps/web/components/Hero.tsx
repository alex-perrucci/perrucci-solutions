const capabilities = [
  ['Responsive', 'Pensato davvero per mobile'],
  ['Performance', 'Pagine rapide e leggere'],
  ['SEO-ready', 'Struttura tecnica ordinata'],
  ['Supporto diretto', 'Un referente, senza passaggi inutili']
];

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero-layout">
        <div className="hero-main">
          <span className="hero-kicker">Web studio indipendente · Italia</span>
          <h1>
            Il tuo sito deve
            <span>fare il suo lavoro.</span>
          </h1>
          <p className="hero-lead">
            Farsi capire, farti trovare e trasformare visite in contatti. Progettiamo e sviluppiamo siti web moderni per aziende, professionisti e attività in tutta Italia.
          </p>
          <div className="hero-actions">
            <a className="button button--primary button--large" href="#contatti">
              Richiedi un preventivo <span aria-hidden="true">→</span>
            </a>
            <a className="button button--secondary button--large" href="https://wa.me/393880956211" target="_blank" rel="noreferrer">
              WhatsApp
            </a>
          </div>
        </div>

        <aside className="hero-aside" aria-label="Come lavoriamo">
          <div className="hero-aside__head">
            <span>Studio note</span>
            <span>PS / 2026</span>
          </div>
          <p>
            Il sito non deve sembrare più complicato della tua attività. Partiamo da ciò che deve comunicare e costruiamo la tecnologia intorno a quello.
          </p>
          <div className="hero-capabilities">
            {capabilities.map(([title, text]) => (
              <div key={title}>
                <strong>{title}</strong>
                <span>{text}</span>
              </div>
            ))}
          </div>
          <div className="hero-coverage">Da remoto o presso il cliente · Tutta Italia</div>
        </aside>
      </div>
    </section>
  );
}
