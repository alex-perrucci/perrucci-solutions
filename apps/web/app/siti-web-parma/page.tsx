import type { Metadata } from 'next';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Portfolio from '@/components/Portfolio';
import Pricing from '@/components/Pricing';
import WhatsAppFloat from '@/components/WhatsAppFloat';

export const metadata: Metadata = {
  title: 'Siti web a Parma per aziende e professionisti',
  description: 'Progettazione e sviluppo di siti web a Parma per aziende, professionisti e attività locali. Siti vetrina, landing page, e-commerce, restyling e manutenzione.',
  alternates: { canonical: '/siti-web-parma' }
};

const services = [
  ['Siti vetrina', 'Una presenza online chiara, responsive e semplice da mantenere.'],
  ['Landing page', 'Pagine focalizzate su un servizio, una campagna o una richiesta di contatto.'],
  ['E-commerce', 'Progetti valutati sulle esigenze reali di catalogo, pagamenti e gestione.'],
  ['Restyling e manutenzione', 'Interventi su siti esistenti e supporto continuativo quando serve.']
];

export default function SitiWebParmaPage() {
  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <div className="container hero-layout">
            <div className="hero-main">
              <span className="hero-kicker">Siti web · Parma e provincia</span>
              <h1>Siti web a Parma pensati per <span>portare contatti.</span></h1>
              <p className="hero-lead">
                Perrucci Solutions progetta e sviluppa siti web per aziende, professionisti e attività locali di Parma e provincia. Partiamo da ciò che il cliente deve capire e fare, poi costruiamo design e tecnologia intorno a quell’obiettivo.
              </p>
              <div className="hero-actions">
                <a className="button button--primary button--large" href="#contatti">Richiedi un preventivo <span aria-hidden="true">→</span></a>
                <a className="button button--secondary button--large" href="https://wa.me/393880956211" target="_blank" rel="noreferrer">WhatsApp</a>
              </div>
            </div>
            <aside className="hero-aside" aria-label="Servizio siti web a Parma">
              <div className="hero-aside__head"><span>Web design</span><span>Parma</span></div>
              <p>Un referente diretto, progetto su misura e possibilità di lavorare da remoto o presso il cliente quando utile.</p>
              <div className="hero-capabilities">
                <div><strong>Responsive</strong><span>Mobile, tablet e desktop</span></div>
                <div><strong>SEO-ready</strong><span>Struttura tecnica ordinata</span></div>
                <div><strong>Performance</strong><span>Pagine rapide e leggere</span></div>
                <div><strong>Supporto</strong><span>Manutenzione disponibile</span></div>
              </div>
            </aside>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-heading section-heading--split">
              <div><span className="eyebrow">Servizi web</span><h2>Il progetto giusto, senza aggiungere ciò che non serve.</h2></div>
              <p>Il sito resta l’offerta principale. Software e automazioni vengono valutati solo quando sono davvero utili al processo del cliente.</p>
            </div>
            <div className="hero-capabilities">
              {services.map(([title, text]) => <div key={title}><strong>{title}</strong><span>{text}</span></div>)}
            </div>
          </div>
        </section>

        <Portfolio />
        <Pricing />

        <section className="section">
          <div className="container">
            <div className="section-heading section-heading--split">
              <div><span className="eyebrow">Come lavoriamo</span><h2>Prima il messaggio, poi il codice.</h2></div>
              <p>Definiamo obiettivo, contenuti e percorso di contatto; poi realizziamo una soluzione responsive e tecnicamente ordinata. Per progetti locali possiamo lavorare anche direttamente presso il cliente.</p>
            </div>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
