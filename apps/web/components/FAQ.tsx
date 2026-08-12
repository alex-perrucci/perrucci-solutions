const faqs = [
  ['Quanto costa un sito web?', 'La soluzione base parte da €29 + IVA per la realizzazione del sito vetrina. Manutenzione €50/mese. Progetti più complessi vengono valutati su preventivo.'],
  ['Quanto tempo serve?', 'Dipende dal progetto e dal materiale disponibile. Dopo il primo confronto viene definita una tempistica realistica.'],
  ['Il sito funziona anche da smartphone?', 'Sì, i siti vengono sviluppati con approccio responsive.'],
  ['Posso richiedere modifiche?', 'Sì. Le modalità dipendono dal progetto e dall’eventuale piano di manutenzione.'],
  ['Realizzate e-commerce?', 'Sì, su preventivo.'],
  ['Lavorate solo a Parma?', 'No. Perrucci Solutions opera in tutta Italia, lavorando anche completamente da remoto.']
];

export default function FAQ() {
  return (
    <section className="section faq-section" id="faq">
      <div className="container faq-grid">
        <div className="faq-intro">
          <span className="eyebrow">FAQ</span>
          <h2>Domande frequenti</h2>
          <p>Le risposte essenziali prima di parlarci del progetto.</p>
          <a href="#contatti">Hai un’altra domanda? Scrivici <span aria-hidden="true">→</span></a>
        </div>
        <div className="faq-list">
          {faqs.map(([question, answer], index) => (
            <details key={question} open={index === 0}>
              <summary><span>{question}</span><i aria-hidden="true" /></summary>
              <div><p>{answer}</p></div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
