import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import './premium.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://perruccisolutions.com'),
  title: {
    default: 'Perrucci Solutions | Siti web, software e automazioni',
    template: '%s | Perrucci Solutions'
  },
  description: 'Perrucci Solutions: siti web, restyling, software e automazioni per aziende e professionisti. Un referente diretto, soluzioni digitali chiare in tutta Italia.',
  alternates: { canonical: '/' },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }, { url: '/identity/favicon/favicon.ico', sizes: 'any' }],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }]
  },
  openGraph: {
    title: 'Perrucci Solutions | Siti web, software e automazioni',
    description: 'Il digitale, fatto bene. Siti web, software e automazioni costruiti intorno alla tua attività.',
    url: 'https://perruccisolutions.com',
    siteName: 'Perrucci Solutions',
    locale: 'it_IT',
    type: 'website',
    images: [{
      url: '/brand/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Perrucci Solutions — Siti web, Software, Automazioni'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Perrucci Solutions | Siti web, software e automazioni',
    description: 'Il digitale, fatto bene. Siti web, software e automazioni costruiti intorno alla tua attività.',
    images: ['/brand/og-image.png']
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
