export default function Pricing() {
  return (
    <section className="section pricing-section" id="prezzi">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">Prezzi</span>
          <h2>Un punto di partenza chiaro, senza nascondere i costi ricorrenti.</h2>
        </div>

        <div className="pricing-layout">
          <article className="price-card price-card--main">
            <span className="price-label">Sito vetrina</span>
            <div className="price-value"><strong>da €29</strong><span>+ IVA</span></div>
            <p className="price-caption">Costo iniziale di realizzazione · una tantum</p>
            <div className="price-rule" />
            <ul>
              <li><span aria-hidden="true">✓</span> Sito responsive</li>
              <li><span aria-hidden="true">✓</span> Struttura moderna e professionale</li>
              <li><span aria-hidden="true">✓</span> Basi tecniche SEO e performance</li>
            </ul>
          </article>

          <div className="pricing-side">
            <article className="price-card">
              <span className="price-label">Manutenzione</span>
              <div className="price-value price-value--small"><strong>€50</strong><span>/mese</span></div>
              <p>Supporto e gestione ordinaria del sito.</p>
            </article>
            <article className="price-card price-card--note">
              <strong>Progetti su preventivo</strong>
              <p>Landing page, e-commerce, software, automazioni e progetti personalizzati vengono valutati in base alle esigenze reali.</p>
              <a className="button button--primary" href="#contatti">Parliamo del tuo progetto <span aria-hidden="true">→</span></a>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
