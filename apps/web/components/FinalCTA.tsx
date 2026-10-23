export default function FinalCTA() {
  return (
    <section className="final-cta">
      <div className="container final-cta__inner">
        <div>
          <span className="final-cta__label">Mettiamo a fuoco il progetto</span>
          <h2>Partiamo da una buona idea. La tua.</h2>
        </div>
        <div className="final-cta__actions">
          <a className="button button--dark button--large" href="#contatti">Parliamo del tuo progetto <span aria-hidden="true">↗</span></a>
          <a className="final-cta__link" href="https://wa.me/393880956211" target="_blank" rel="noreferrer">Oppure scrivici su WhatsApp ↗</a>
        </div>
      </div>
    </section>
  );
}
