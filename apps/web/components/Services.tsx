const primaryServices = [
  ['SITO', 'Siti vetrina', 'Una presenza online chiara, moderna e credibile per raccontare attività, servizi e contatti.'],
  ['LANDING', 'Landing page', 'Una pagina costruita attorno a un servizio, una campagna o una richiesta di contatto precisa.'],
  ['SHOP', 'E-commerce', 'Esperienze di acquisto responsive e ordinate, costruite intorno al catalogo e al cliente.'],
  ['REWORK', 'Restyling siti', 'Riorganizziamo siti datati migliorando gerarchia, design, mobile usability e qualità percepita.'],
  ['CARE', 'Manutenzione', 'Supporto e gestione ordinaria per mantenere il sito aggiornato e affidabile nel tempo.']
];

const advancedServices = ['Software personalizzato', 'Automazioni', 'Consulenza informatica'];

export default function Services() {
  return (
    <section className="section services-section" id="servizi">
      <div className="container">
        <div className="section-heading section-heading--split">
          <div>
            <span className="eyebrow">Servizi</span>
            <h2>Costruiamo il pezzo digitale che ti serve. Non il pacchetto più grande.</h2>
          </div>
          <p>Il sito viene prima. Software e automazioni entrano in gioco solo quando risolvono un’esigenza concreta.</p>
        </div>

        <div className="capability-list">
          {primaryServices.map(([tag, title, text]) => (
            <article className="capability-row" key={title}>
              <span className="capability-tag">{tag}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              <a href="#contatti" aria-label={`Parliamo di ${title}`}>Parliamone <span aria-hidden="true">→</span></a>
            </article>
          ))}
        </div>

        <div className="service-extension">
          <div>
            <span className="eyebrow eyebrow--light">Quando il sito non basta</span>
            <strong>Possiamo estendere il progetto.</strong>
          </div>
          <ul>
            {advancedServices.map((service) => <li key={service}>{service}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
