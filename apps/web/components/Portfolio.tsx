const projects = [
  {
    name: 'GuidaLavoroItalia',
    domain: 'guidalavoroitalia.it',
    url: 'https://guidalavoroitalia.it',
    category: 'Progetto web'
  },
  {
    name: 'Maltservice',
    domain: 'maltservice.it',
    url: 'https://maltservice.it',
    category: 'Progetto web'
  },
  {
    name: 'Fluxa Platform',
    domain: 'fluxa-platform.it',
    url: 'https://fluxa-platform.it',
    category: 'Progetto web'
  },
  {
    name: 'EasyRevoke',
    domain: 'easyrevoke.com',
    url: 'https://www.easyrevoke.com',
    category: 'SaaS / prodotto web'
  }
];

export default function Portfolio() {
  return (
    <section className="section portfolio-section" id="portfolio">
      <div className="container">
        <div className="section-heading section-heading--split section-heading--inverse">
          <div>
            <span className="eyebrow eyebrow--light">Portfolio</span>
            <h2>I progetti parlano da soli.</h2>
          </div>
          <p>Una selezione di progetti online. Puoi visitarli direttamente per farti un&apos;idea del lavoro.</p>
        </div>

        <div className="project-index">
          {projects.map((project) => (
            <a className="project-row" href={project.url} target="_blank" rel="noreferrer" key={project.domain}>
              <span className="project-row__category">{project.category}</span>
              <h3>{project.name}</h3>
              <span className="project-row__domain">{project.domain}</span>
              <span className="project-row__arrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
