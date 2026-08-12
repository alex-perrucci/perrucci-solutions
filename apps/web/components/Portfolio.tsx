const projects = [
  {
    name: 'GuidaLavoroItalia',
    domain: 'guidalavoroitalia.it',
    url: 'https://guidalavoroitalia.it',
    category: 'Progetto web',
    size: 'large',
    initials: 'GL'
  },
  {
    name: 'Maltservice',
    domain: 'maltservice.it',
    url: 'https://maltservice.it',
    category: 'Progetto web',
    size: 'medium',
    initials: 'MS'
  },
  {
    name: 'Fluxa Platform',
    domain: 'fluxa-platform.it',
    url: 'https://fluxa-platform.it',
    category: 'Progetto web',
    size: 'medium',
    initials: 'FX'
  },
  {
    name: 'EasyRevoke',
    domain: 'easyrevoke.com',
    url: 'https://www.easyrevoke.com',
    category: 'SaaS / prodotto web',
    size: 'wide',
    initials: 'ER'
  }
];

export default function Portfolio() {
  return (
    <section className="section portfolio-section" id="portfolio">
      <div className="container">
        <div className="section-heading section-heading--row">
          <div>
            <span className="eyebrow">Portfolio</span>
            <h2>Alcuni progetti</h2>
          </div>
          <p>Una selezione di lavori reali. Le visual qui sotto sono presentazioni grafiche dei progetti, non screenshot ricostruiti.</p>
        </div>

        <div className="portfolio-bento">
          {projects.map((project) => (
            <a
              className={`portfolio-card portfolio-card--${project.size}`}
              href={project.url}
              target="_blank"
              rel="noreferrer"
              key={project.domain}
            >
              <div className="portfolio-visual" aria-hidden="true">
                <div className="portfolio-browser">
                  <span><i /><i /><i /></span>
                  <small>{project.domain}</small>
                </div>
                <div className="portfolio-canvas">
                  <div className="portfolio-canvas__mark">{project.initials}</div>
                  <div className="portfolio-canvas__lines"><span /><span /><span /></div>
                  <div className="portfolio-canvas__panel"><span /><span /></div>
                </div>
              </div>
              <div className="portfolio-info">
                <div>
                  <span>{project.category}</span>
                  <h3>{project.name}</h3>
                  <p>{project.domain}</p>
                </div>
                <span className="portfolio-arrow" aria-hidden="true">↗</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
