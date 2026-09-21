import type { Metadata } from 'next';
import { LegalShell, pageStyles } from '../shared';

export const metadata: Metadata = {
  title: 'Terms of Service — Ti Fregano Così',
  description: 'Terms of Service for the Ti Fregano Così creator automation integration.',
  alternates: { canonical: 'https://legal.perruccisolutions.com/terms' },
  robots: { index: false, follow: false, noarchive: true }
};

export default function TermsOfService() {
  return (
    <LegalShell>
      <h1 style={pageStyles.h1}>Terms of Service</h1>
      <p style={pageStyles.p}>Last updated: 21 September 2026.</p>

      <h2 style={pageStyles.h2}>1. Purpose</h2>
      <p style={pageStyles.p}>
        Ti Fregano Così uses a private creator automation integration to prepare and transfer
        creator-owned short-form videos to authorized social accounts for review and publication.
      </p>

      <h2 style={pageStyles.h2}>2. Authorized use</h2>
      <p style={pageStyles.p}>
        The integration is intended only for accounts whose owner has explicitly authorized access.
        It may not be used to access, upload to or control an account without the account owner's consent.
      </p>

      <h2 style={pageStyles.h2}>3. Content responsibility</h2>
      <p style={pageStyles.p}>
        The creator remains responsible for reviewing content before publication and for ensuring that
        uploaded material complies with applicable law, platform rules, intellectual-property rights
        and community standards.
      </p>

      <h2 style={pageStyles.h2}>4. Platform availability</h2>
      <p style={pageStyles.p}>
        Upload and authorization features depend on third-party platforms and APIs. Availability,
        permissions, rate limits and behavior may change without notice and may temporarily prevent
        delivery of a draft or other automated action.
      </p>

      <h2 style={pageStyles.h2}>5. No resale of platform access</h2>
      <p style={pageStyles.p}>
        The integration is not offered as a marketplace for TikTok credentials and does not sell,
        rent or transfer OAuth authorization to third parties.
      </p>

      <h2 style={pageStyles.h2}>6. Suspension and revocation</h2>
      <p style={pageStyles.p}>
        Access may be disabled whenever authorization is revoked, platform requirements change,
        suspicious activity is detected or continued operation could compromise account security.
      </p>

      <h2 style={pageStyles.h2}>7. Disclaimer</h2>
      <p style={pageStyles.p}>
        The service is provided on a best-effort basis. No guarantee is made that third-party APIs
        will remain continuously available or that every upload attempt will complete successfully.
      </p>

      <h2 style={pageStyles.h2}>8. Contact</h2>
      <p style={pageStyles.p}>
        Questions about these terms can be sent to info@perruccisolutions.com.
      </p>
    </LegalShell>
  );
}
