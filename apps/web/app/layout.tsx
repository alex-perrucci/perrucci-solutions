import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://perruccisolutions.com'),
  title: { default: 'Perrucci Solutions | Siti web e soluzioni digitali', template: '%s | Perrucci Solutions' },
  description: 'Siti web professionali, landing page, e-commerce, restyling, manutenzione, software e automazioni per aziende e professionisti in tutta Italia.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Perrucci Solutions',
    description: 'Siti web e soluzioni digitali progettati per trasformare visite in contatti.',
    url: 'https://perruccisolutions.com',
    siteName: 'Perrucci Solutions',
    locale: 'it_IT',
    type: 'website'
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
