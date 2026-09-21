import type { CSSProperties, ReactNode } from 'react';
import Link from 'next/link';

const shell: CSSProperties = {
  minHeight: '100vh',
  background: '#0b0b0b',
  color: '#f7f1df',
  padding: '48px 20px',
  fontFamily: 'var(--font-manrope), system-ui, sans-serif'
};

const card: CSSProperties = {
  width: 'min(880px, 100%)',
  margin: '0 auto',
  border: '1px solid #2a2a2a',
  borderRadius: 24,
  padding: '32px',
  background: '#111111',
  boxShadow: '0 24px 80px rgba(0,0,0,.28)'
};

const brand: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 10,
  fontWeight: 900,
  letterSpacing: '-0.03em',
  fontSize: 18
};

const dot: CSSProperties = {
  width: 14,
  height: 14,
  borderRadius: 999,
  background: '#ffd500',
  boxShadow: '0 0 0 5px rgba(255,213,0,.12)'
};

const nav: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 10,
  marginTop: 28
};

const navLink: CSSProperties = {
  color: '#ffd500',
  textDecoration: 'none',
  border: '1px solid #3b3420',
  borderRadius: 999,
  padding: '9px 13px',
  fontSize: 14,
  fontWeight: 700
};

export const pageStyles = {
  h1: {
    fontFamily: 'var(--font-syne), system-ui, sans-serif',
    fontSize: 'clamp(34px, 7vw, 62px)',
    lineHeight: 0.98,
    letterSpacing: '-0.05em',
    margin: '26px 0 16px'
  } satisfies CSSProperties,
  h2: {
    fontFamily: 'var(--font-syne), system-ui, sans-serif',
    fontSize: 22,
    margin: '32px 0 10px',
    letterSpacing: '-0.03em'
  } satisfies CSSProperties,
  p: {
    color: '#d8d1c0',
    lineHeight: 1.72,
    fontSize: 16
  } satisfies CSSProperties,
  ul: {
    color: '#d8d1c0',
    lineHeight: 1.72,
    paddingLeft: 22
  } satisfies CSSProperties,
  accent: {
    color: '#ffd500'
  } satisfies CSSProperties
};

export function LegalShell({ children }: { children: ReactNode }) {
  return (
    <main style={shell}>
      <section style={card}>
        <div style={brand}>
          <span style={dot} aria-hidden="true" />
          <span>Ti Fregano Così · Legal</span>
        </div>

        {children}

        <nav style={nav} aria-label="Legal pages">
          <Link href="/" style={navLink}>App information</Link>
          <Link href="/privacy" style={navLink}>Privacy Policy</Link>
          <Link href="/terms" style={navLink}>Terms of Service</Link>
        </nav>

        <p style={{ ...pageStyles.p, marginTop: 28, fontSize: 13, color: '#8f8a7f' }}>
          Service operated by Perrucci Solutions · Contact: info@perruccisolutions.com
        </p>
      </section>
    </main>
  );
}
