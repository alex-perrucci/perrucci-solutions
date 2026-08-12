const projects = [
  { name: 'GuidaLavoroItalia', domain: 'guidalavoroitalia.it', url: 'https://guidalavoroitalia.it' },
  { name: 'Maltservice', domain: 'maltservice.it', url: 'https://maltservice.it' },
  { name: 'Fluxa Platform', domain: 'fluxa-platform.it', url: 'https://fluxa-platform.it' },
  { name: 'EasyRevoke', domain: 'easyrevoke.com', url: 'https://www.easyrevoke.com' }
];

export default function ProjectReel() {
  return (
    <section className="proof-reel" aria-labelledby="proof-reel-title">
      <div className="container proof-reel__head">
        <div>
          <span className="eyebrow">Progetti reali</span>
          <h2 id="proof-reel-title">Il lavoro viene prima delle promesse.</h2>
        </div>
        <p>Quattro progetti online. Aprili e fatti un’idea direttamente dal risultato.</p>
      </div>
      <div className="proof-reel__grid container">
        {projects.map((project) => (
          <a href={project.url} target="_blank" rel="noreferrer" key={project.domain}>
            <span className="proof-reel__name">{project.name}</span>
            <span className="proof-reel__domain">{project.domain}</span>
            <span className="proof-reel__arrow" aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
    </section>
  );
}
