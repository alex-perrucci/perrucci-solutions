const reasons = [
  ['Chiarezza', 'Ogni pagina deve spiegare cosa fai e rendere immediato il passo successivo.'],
  ['Misura', 'Design e tecnologia seguono il problema: niente funzioni che non servono.'],
  ['Rapporto diretto', 'Parli con chi progetta e sviluppa il tuo sito, senza passaggi inutili.']
];

export default function WhyUs() {
  return (
    <section className="section principles-section">
      <div className="container">
        <div className="section-heading section-heading--split">
          <div>
            <span className="eyebrow">Perché Perrucci Solutions</span>
            <h2>Il dettaglio conta. La chiarezza ancora di più.</h2>
          </div>
          <p>Un approccio essenziale, dalla prima conversazione alla messa online. Con spazio per crescere quando serve.</p>
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
