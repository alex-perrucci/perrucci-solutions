import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Manrope, Syne } from 'next/font/google';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap'
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://perruccisolutions.com'),
  title: {
    default: 'Perrucci Solutions | Siti web, software e automazioni',
    template: '%s | Perrucci Solutions'
  },
  description: 'Creazione siti web, landing page, e-commerce, software e automazioni per aziende e professionisti in tutta Italia.',
  alternates: { canonical: '/' },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }]
  },
  openGraph: {
    title: 'Perrucci Solutions | Siti web, software e automazioni',
    description: 'Creazione siti web, landing page, e-commerce, software e automazioni per aziende e professionisti in tutta Italia.',
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
    description: 'Creazione siti web, landing page, e-commerce, software e automazioni per aziende e professionisti in tutta Italia.',
    images: ['/brand/og-image.png']
  },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="it" className={`${manrope.variable} ${syne.variable}`}>
      <body>{children}</body>
    </html>
  );
}
