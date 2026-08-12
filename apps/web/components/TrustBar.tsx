const items = [
  ['Responsive', 'Esperienza curata su desktop e mobile'],
  ['Performance', 'Attenzione a velocità e leggerezza'],
  ['SEO-ready', 'Basi tecniche solide per essere trovati'],
  ['Supporto diretto', 'Un contatto semplice durante il progetto']
];

export default function TrustBar() {
  return (
    <section className="trust-bar" aria-label="Valori del servizio">
      <div className="container trust-grid">
        {items.map(([title, text]) => (
          <div className="trust-item" key={title}>
            <span className="trust-check" aria-hidden="true">✓</span>
            <div><strong>{title}</strong><small>{text}</small></div>
          </div>
        ))}
      </div>
    </section>
  );
}
