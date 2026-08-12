export default function FinalCTA() {
  return (
    <section className="final-cta">
      <div className="container final-cta__inner">
        <div>
          <span className="eyebrow">Il prossimo progetto</span>
          <h2>Hai un progetto in mente?</h2>
          <p>Raccontaci cosa vuoi realizzare. Ti aiutiamo a trovare una soluzione semplice, moderna e adatta alla tua attività.</p>
        </div>
        <div className="final-cta__actions">
          <a className="button button--primary button--large" href="#contatti">Richiedi un preventivo <span aria-hidden="true">→</span></a>
          <a className="button button--secondary button--large" href="https://wa.me/393880956211" target="_blank" rel="noreferrer">WhatsApp</a>
        </div>
      </div>
    </section>
  );
}
