export default function Hero() {
  return (
    <section className="hero ps-hero" id="top" aria-labelledby="ps-hero-title">
      <div className="container ps-hero__topline">
        <span>Studio digitale indipendente</span>
        <span>Italia · Da remoto e di persona</span>
      </div>

      <div className="container ps-hero__grid">
        <div className="ps-hero__content">
          <p className="ps-hero__eyebrow"><span aria-hidden="true" /> Progetti web, software e automazioni</p>
          <h1 id="ps-hero-title">Il digitale,<br /><span>fatto bene.</span></h1>
          <p className="ps-hero__lead">Il tuo sito deve fare il suo lavoro. Progettiamo esperienze digitali chiare e funzionali, costruite intorno alla tua attività.</p>
          <div className="hero-actions">
            <a className="button button--primary button--large" href="#contatti">
              Parliamo del tuo progetto <span aria-hidden="true">↗</span>
            </a>
            <a className="ps-text-link" href="#portfolio">Esplora i progetti <span aria-hidden="true">↘</span></a>
          </div>
        </div>

        <div className="ps-hero__art" aria-hidden="true">
          <div className="ps-hero__rings" />
          <div className="ps-hero__symbol"><img src="/identity/svg/symbol-ink.svg" width="290" height="290" alt="" /></div>
          <span className="ps-hero__coordinate ps-hero__coordinate--top">PRECISIONE / 01</span>
          <span className="ps-hero__coordinate ps-hero__coordinate--bottom">PS — DIGITAL STUDIO</span>
        </div>
      </div>

      <div className="container ps-hero__bottomline">
        <p>Un referente diretto. Una soluzione su misura.</p>
        <a href="#servizi">Scopri cosa facciamo <span aria-hidden="true">↓</span></a>
      </div>
    </section>
  );
}
