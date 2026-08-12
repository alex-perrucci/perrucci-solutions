import LeadForm from './LeadForm';

export default function Contact() {
  return (
    <section className="section contact-section" id="contatti">
      <div className="container contact-grid">
        <div className="contact-copy">
          <span className="eyebrow eyebrow--light">Contatti</span>
          <h2>Raccontaci cosa vuoi realizzare.</h2>
          <p>Partiamo dal tuo obiettivo e troviamo una soluzione semplice, moderna e proporzionata alla tua attività.</p>

          <div className="contact-details">
            <a href="mailto:info@perruccisolutions.com">
              <span>Email</span><strong>info@perruccisolutions.com</strong>
            </a>
            <a href="tel:+393880956211">
              <span>Telefono</span><strong>+39 388 095 6211</strong>
            </a>
            <a href="https://wa.me/393880956211" target="_blank" rel="noreferrer">
              <span>WhatsApp</span><strong>Scrivici direttamente ↗</strong>
            </a>
          </div>

          <div className="contact-coverage">
            <span className="status-dot status-dot--light" aria-hidden="true" />
            Italia · Da remoto o presso il cliente
          </div>
        </div>
        <LeadForm />
      </div>
    </section>
  );
}
