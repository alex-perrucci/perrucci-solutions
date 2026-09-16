import type { Metadata } from 'next';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Portfolio from '@/components/Portfolio';
import Pricing from '@/components/Pricing';
import WhatsAppFloat from '@/components/WhatsAppFloat';

export const metadata: Metadata = {
  title: 'Siti web a Parma per aziende',
  description: 'Siti web a Parma per aziende, professionisti e attività locali: siti vetrina, landing page, restyling, SEO tecnica e manutenzione con un referente diretto.',
  alternates: { canonical: '/siti-web-parma' },
  openGraph: {
    title: 'Siti web a Parma per aziende | Perrucci Solutions',
    description: 'Progettazione e sviluppo di siti web per aziende, professionisti e attività di Parma e provincia.',
    url: 'https://perruccisolutions.com/siti-web-parma/'
  }
};

const services = [
  ['Siti aziendali', 'Una presenza online chiara e credibile per spiegare servizi, punti di forza e modalità di contatto.'],
  ['Landing page', 'Pagine focalizzate su un servizio, una campagna o una richiesta di contatto precisa.'],
  ['Restyling', 'Riorganizzazione di siti esistenti con attenzione a gerarchia, mobile, velocità e qualità percepita.'],
  ['Manutenzione', 'Supporto continuativo per contenuti, aggiornamenti e interventi tecnici quando serve.']
];

const projectSteps = [
  ['01 · Obiettivo', 'Chi deve arrivare sul sito, cosa deve capire e quale azione vogliamo rendere semplice.'],
  ['02 · Contenuti', 'Organizziamo messaggi, pagine e priorità prima di aggiungere elementi grafici o funzionalità.'],
  ['03 · Sviluppo', 'Realizziamo un sito responsive, leggero e tecnicamente ordinato, verificandolo sui principali formati di schermo.'],
  ['04 · Pubblicazione', 'Mettiamo online il progetto con metadata, indicizzazione e tracciamenti essenziali già predisposti.']
];

const localFaqs = [
  ['Lavorate solo con clienti di Parma?', 'No. Perrucci Solutions lavora in tutta Italia. Per Parma e provincia, quando è utile al progetto, possiamo anche organizzare un confronto diretto in presenza.'],
  ['Realizzate anche landing page per un singolo servizio?', 'Sì. Se l’obiettivo è promuovere un servizio specifico, una landing page può essere più adatta di un sito ampio. Struttura e call to action vengono definite in base all’obiettivo reale.'],
  ['Il sito viene preparato per la SEO locale?', 'Prepariamo una base tecnica ordinata: struttura semantica, metadata, performance, mobile, sitemap, dati strutturati quando pertinenti e contenuti comprensibili. Il posizionamento organico dipende poi anche da concorrenza, autorevolezza e segnali esterni.'],
  ['Potete rifare un sito aziendale già esistente?', 'Sì. Prima valutiamo cosa conviene mantenere e cosa va riprogettato, così il restyling non diventa una ricostruzione inutile di ciò che funziona già.'],
  ['Posso gestire il sito dopo la consegna?', 'Dipende dalla soluzione scelta. Possiamo predisporre una gestione semplice oppure occuparci noi della manutenzione, definendo prima cosa resta incluso.']
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': 'https://perruccisolutions.com/siti-web-parma/#service',
      name: 'Realizzazione siti web a Parma',
      url: 'https://perruccisolutions.com/siti-web-parma/',
      description: 'Progettazione e sviluppo di siti web, landing page, restyling e manutenzione per aziende, professionisti e attività locali di Parma e provincia.',
      serviceType: ['Siti aziendali', 'Landing page', 'Restyling siti web', 'Manutenzione siti web'],
      provider: {
        '@type': 'ProfessionalService',
        name: 'Perrucci Solutions',
        url: 'https://perruccisolutions.com',
        telephone: '+393880956211',
        email: 'info@perruccisolutions.com'
      },
      areaServed: [
        { '@type': 'City', name: 'Parma' },
        { '@type': 'AdministrativeArea', name: 'Provincia di Parma' }
      ]
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://perruccisolutions.com/siti-web-parma/#faq',
      mainEntity: localFaqs.map(([question, answer]) => ({
        '@type': 'Question',
        name: question,
        acceptedAnswer: { '@type': 'Answer', text: answer }
      }))
    }
  ]
};

export default function SitiWebParmaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
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

        <section className="section">
          <div className="container">
            <div className="section-heading section-heading--split">
              <div><span className="eyebrow">Per aziende e professionisti</span><h2>Un sito deve spiegare bene l’attività prima ancora di impressionare.</h2></div>
              <div>
                <p>Per un’impresa locale il sito spesso è il punto in cui una persona verifica chi sei dopo averti trovato su Google, sui social, tramite passaparola o da una ricerca diretta. Per questo lavoriamo prima su messaggio, servizi, prove e percorso di contatto.</p>
                <p>La stessa logica vale per studi professionali, attività commerciali e piccole aziende: una pagina deve aiutare il visitatore a capire rapidamente cosa offri, per chi è il servizio, come lavori e quale sia il prossimo passo. Evitiamo sezioni inserite solo per riempire spazio o pacchetti tecnici che non portano valore al progetto.</p>
              </div>
            </div>
          </div>
        </section>

        <Portfolio />
        <Pricing />

        <section className="section">
          <div className="container">
            <div className="section-heading section-heading--split">
              <div><span className="eyebrow">Processo</span><h2>Prima il messaggio, poi il codice.</h2></div>
              <p>Definiamo obiettivo, contenuti e percorso di contatto; poi realizziamo una soluzione responsive e tecnicamente ordinata. Per progetti locali possiamo lavorare anche direttamente presso il cliente.</p>
            </div>
            <div className="hero-capabilities">
              {projectSteps.map(([title, text]) => <div key={title}><strong>{title}</strong><span>{text}</span></div>)}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-heading section-heading--split">
              <div><span className="eyebrow">SEO e performance</span><h2>Una base tecnica che non ostacola la crescita.</h2></div>
              <div>
                <p>Un sito locale non si posiziona perché ripete “Parma” decine di volte. Serve una pagina utile, veloce, accessibile da smartphone e abbastanza chiara da permettere a Google e alle persone di comprenderne contenuto e contesto.</p>
                <p>Durante lo sviluppo curiamo struttura delle pagine, gerarchia dei titoli, metadata, sitemap, canonical, dati strutturati quando pertinenti e collegamenti interni. Questi elementi non sostituiscono autorevolezza, recensioni, contenuti e concorrenza reale, ma evitano di partire con una base tecnica debole.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section faq-section" id="faq-parma">
          <div className="container faq-grid">
            <div className="faq-intro">
              <span className="eyebrow">FAQ · Parma</span>
              <h2>Domande sul servizio</h2>
              <p>Le risposte più utili prima di valutare il progetto.</p>
              <a href="#contatti">Parlaci del tuo sito <span aria-hidden="true">→</span></a>
            </div>
            <div className="faq-list">
              {localFaqs.map(([question, answer], index) => (
                <details key={question} open={index === 0}>
                  <summary><span>{question}</span><i aria-hidden="true" /></summary>
                  <div><p>{answer}</p></div>
                </details>
              ))}
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
