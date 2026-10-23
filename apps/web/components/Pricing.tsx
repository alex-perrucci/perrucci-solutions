export default function Pricing() {
  return (
    <section className="section pricing-section" id="prezzi">
      <div className="container">
        <div className="section-heading section-heading--split">
          <div>
            <span className="eyebrow">Prezzi</span>
            <h2>Si parte da qui. Senza sorprese sul tipo di costo.</h2>
          </div>
          <p>La realizzazione iniziale e la manutenzione sono due voci distinte. Per ogni progetto definiamo insieme ciò che è incluso.</p>
        </div>

        <div className="price-sheet">
          <article className="price-block price-block--build">
            <span>Sito vetrina</span>
            <div className="price-display"><strong>da €29</strong><small>+ IVA</small></div>
            <p>Costo iniziale di realizzazione · una tantum.</p>
          </article>

          <article className="price-block price-block--care">
            <span>Manutenzione</span>
            <div className="price-display"><strong>€50</strong><small>/mese</small></div>
            <p>Supporto e gestione ordinaria del sito.</p>
          </article>
        </div>

        <div className="pricing-custom">
          <div>
            <span className="eyebrow">Su preventivo</span>
            <p>Landing page, e-commerce, software, automazioni e progetti personalizzati vengono valutati sulle esigenze reali.</p>
          </div>
          <a className="button button--primary button--large" href="#contatti">Parliamo del tuo progetto <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>
  );
}
