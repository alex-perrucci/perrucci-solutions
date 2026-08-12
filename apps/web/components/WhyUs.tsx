const reasons = [
  ['Design moderno', 'Interfacce curate, responsive e coerenti con il brand del cliente.'],
  ['Sviluppo su misura', 'Niente soluzioni inutilmente complicate: tecnologia proporzionata al progetto.'],
  ['Supporto diretto', 'Rapporto semplice e diretto durante sviluppo e manutenzione.'],
  ['Performance', 'Attenzione a velocità, mobile usability e qualità tecnica.'],
  ['Evoluzione', 'Possibilità di aggiungere nuove funzionalità, automazioni o software quando servono.']
];

export default function WhyUs() {
  return (
    <section className="section section--soft">
      <div className="container why-grid">
        <div className="why-intro">
          <span className="eyebrow">Perché Perrucci Solutions</span>
          <h2>Soluzioni digitali pensate per restare semplici da usare.</h2>
          <p>Nessuna promessa da agenzia. Il punto è costruire bene ciò che serve oggi, lasciando spazio a ciò che potrà servire domani.</p>
        </div>
        <div className="why-list">
          {reasons.map(([title, text], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <div><h3>{title}</h3><p>{text}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
