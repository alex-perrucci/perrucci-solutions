import type { ReactNode } from 'react';

const primaryServices = [
  ['Siti vetrina', 'Una presenza online chiara, moderna e credibile per raccontare attività, servizi e contatti.', 'window'],
  ['Landing page', 'Pagine focalizzate su un servizio, una campagna o un obiettivo commerciale preciso.', 'target'],
  ['E-commerce', 'Esperienze di acquisto responsive e ordinate, costruite intorno al catalogo e al cliente.', 'cart'],
  ['Restyling siti', 'Rinnoviamo siti datati migliorando design, struttura, mobile usability e qualità percepita.', 'refresh'],
  ['Manutenzione', 'Supporto e gestione ordinaria per mantenere il sito aggiornato e affidabile nel tempo.', 'tools']
];

const advancedServices = [
  ['Software personalizzato', 'Soluzioni su misura quando il flusso di lavoro richiede qualcosa oltre un sito.', 'code'],
  ['Automazioni', 'Collegamenti e processi automatici utili a ridurre attività manuali ripetitive.', 'bolt'],
  ['Consulenza informatica', 'Supporto tecnico per scegliere soluzioni proporzionate alle esigenze reali.', 'compass']
];

function Icon({ name }: { name: string }) {
  const paths: Record<string, ReactNode> = {
    window: <><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/><path d="M7 6.5h.01M10 6.5h.01"/></>,
    target: <><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="m15 9 5-5M16 4h4v4"/></>,
    cart: <><path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 8H7"/><circle cx="10" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></>,
    refresh: <><path d="M20 7v5h-5"/><path d="M4 17v-5h5"/><path d="M6.1 9a7 7 0 0 1 11.8-2L20 9M4 15l2.1 2A7 7 0 0 0 18 15"/></>,
    tools: <><path d="m14.7 6.3 3-3a4 4 0 0 1-5 5l-7.8 7.8a2.1 2.1 0 1 0 3 3l7.8-7.8a4 4 0 0 1 5-5l-3 3"/><path d="m5 5 4 4"/></>,
    code: <><path d="m8 9-4 3 4 3M16 9l4 3-4 3M14 5l-4 14"/></>,
    bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/>,
    compass: <><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2.2 4.8-4.8 2.2 2.2-4.8 4.8-2.2Z"/></>
  };

  return <svg className="service-icon" viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
}

function ServiceCard({ item, featured = false }: { item: string[]; featured?: boolean }) {
  const [title, text, icon] = item;
  return (
    <article className={`service-card${featured ? ' service-card--featured' : ''}`}>
      <span className="service-icon-wrap"><Icon name={icon} /></span>
      <h3>{title}</h3>
      <p>{text}</p>
      <a href="#contatti" aria-label={`Richiedi informazioni su ${title}`}>Parliamone <span aria-hidden="true">→</span></a>
    </article>
  );
}

export default function Services() {
  return (
    <section className="section section--white" id="servizi">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">Servizi</span>
          <h2>Tutto quello che serve alla tua presenza digitale.</h2>
          <p>Partiamo da ciò che serve davvero alla tua attività. Le soluzioni più avanzate entrano in gioco solo quando aggiungono valore.</p>
        </div>

        <div className="services-grid services-grid--primary">
          {primaryServices.map((service, index) => <ServiceCard key={service[0]} item={service} featured={index === 0} />)}
        </div>

        <div className="advanced-heading">
          <span>Soluzioni avanzate</span>
          <p>Per progetti che richiedono integrazioni, processi o strumenti su misura.</p>
        </div>
        <div className="services-grid services-grid--advanced">
          {advancedServices.map((service) => <ServiceCard key={service[0]} item={service} />)}
        </div>
      </div>
    </section>
  );
}
