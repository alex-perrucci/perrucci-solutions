const projects = [
  { name: 'GuidaLavoroItalia', domain: 'guidalavoroitalia.it', tone: 'blue' },
  { name: 'Maltservice', domain: 'maltservice.it', tone: 'slate' },
  { name: 'EasyRevoke', domain: 'easyrevoke.com', tone: 'ice' }
];

export default function Hero() {
  return (
    <section className="hero section-shell" id="top">
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">Sviluppo web · Software · Automazioni</span>
          <h1>Siti web moderni che fanno crescere la tua presenza online.</h1>
          <p className="hero-lead">
            Realizziamo siti vetrina, landing page ed e-commerce moderni, veloci e pensati per trasformare le visite in contatti reali.
          </p>
          <div className="hero-actions">
            <a className="button button--primary button--large" href="#contatti">
              Richiedi un preventivo <span aria-hidden="true">→</span>
            </a>
            <a className="button button--secondary button--large" href="https://wa.me/393880956211" target="_blank" rel="noreferrer">
              Scrivici su WhatsApp
            </a>
          </div>
          <div className="hero-meta">
            <span className="status-dot" aria-hidden="true" />
            <span>Disponibili in tutta Italia · Da remoto o presso il cliente</span>
          </div>
        </div>

        <div className="hero-visual" aria-label="Presentazione di alcuni progetti del portfolio">
          <div className="hero-visual__frame">
            <div className="browser-bar">
              <div className="browser-dots" aria-hidden="true"><span /><span /><span /></div>
              <span>portfolio.perruccisolutions.com</span>
            </div>
            <div className="portfolio-stage">
              <div className="stage-kicker">PROGETTI REALI</div>
              <strong>Una presenza digitale costruita con cura.</strong>
              <p>Anteprime grafiche del portfolio. Nessuno screenshot inventato.</p>
            </div>
          </div>

          {projects.map((project, index) => (
            <a
              key={project.domain}
              className={`project-float project-float--${index + 1} project-float--${project.tone}`}
              href={`https://${project.domain}`}
              target="_blank"
              rel="noreferrer"
              aria-label={`Apri ${project.name}`}
            >
              <span className="project-float__chrome"><i /><i /><i /></span>
              <span className="project-float__body">
                <span className="project-float__mark">{project.name.slice(0, 2).toUpperCase()}</span>
                <span>
                  <strong>{project.name}</strong>
                  <small>{project.domain}</small>
                </span>
                <b aria-hidden="true">↗</b>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
