const steps = [
  ['Parliamo', 'Capire attività, obiettivo e necessità.'],
  ['Progettiamo', 'Definiamo struttura, design e soluzione tecnica.'],
  ['Sviluppiamo', 'Realizzazione responsive e test.'],
  ['Andiamo online', 'Pubblicazione e configurazione.'],
  ['Ti supportiamo', 'Manutenzione ed evoluzione quando necessarie.']
];

export default function Process() {
  return (
    <section className="section section--white" id="processo">
      <div className="container">
        <div className="section-heading section-heading--row">
          <div>
            <span className="eyebrow">Come lavoriamo</span>
            <h2>Un processo chiaro, dall’idea alla pubblicazione.</h2>
          </div>
          <p>Ogni progetto cambia, ma il percorso resta semplice: capire prima, costruire poi.</p>
        </div>

        <ol className="process-line">
          {steps.map(([title, text], index) => (
            <li key={title}>
              <span className="process-number">{String(index + 1).padStart(2, '0')}</span>
              <div><h3>{title}</h3><p>{text}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
