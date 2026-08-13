const reasons = [
  ['Design che si capisce', 'Interfacce curate e responsive, senza sacrificare chiarezza per inseguire effetti.'],
  ['Tecnologia proporzionata', 'Scegliamo la soluzione in base al progetto, non il contrario.'],
  ['Supporto diretto', 'Un rapporto semplice durante sviluppo e manutenzione, senza passaggi inutili.'],
  ['Velocità e mobile', 'Prestiamo attenzione a performance, leggibilità e usabilità sui dispositivi reali.'],
  ['Spazio per evolvere', 'Il progetto può crescere con nuove pagine, funzioni, automazioni o software quando serve.']
];

export default function WhyUs() {
  return (
    <section className="section principles-section">
      <div className="container">
        <div className="section-heading section-heading--split">
          <div>
            <span className="eyebrow">Perché Perrucci Solutions</span>
            <h2>Meno sovrastruttura. Più cose fatte bene.</h2>
          </div>
          <p>Non vendiamo una formula universale. Il punto è costruire bene ciò che serve oggi e lasciare spazio a ciò che potrà servire domani.</p>
        </div>

        <div className="principles-grid">
          {reasons.map(([title, text]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
