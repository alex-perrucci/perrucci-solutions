import Contact from '@/components/Contact';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Portfolio from '@/components/Portfolio';
import Pricing from '@/components/Pricing';
import Process from '@/components/Process';
import Services from '@/components/Services';
import TrustBar from '@/components/TrustBar';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import WhyUs from '@/components/WhyUs';

export default function Home() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Perrucci Solutions',
    url: 'https://perruccisolutions.com',
    email: 'info@perruccisolutions.com',
    telephone: '+393880956211',
    areaServed: { '@type': 'Country', name: 'Italia' },
    serviceType: [
      'Siti vetrina',
      'Landing page',
      'E-commerce',
      'Restyling siti',
      'Manutenzione',
      'Software personalizzato',
      'Automazioni',
      'Consulenza informatica'
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <WhyUs />
        <Portfolio />
        <Pricing />
        <Process />
        <FAQ />
        <Contact />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
