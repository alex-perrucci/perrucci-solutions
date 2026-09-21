import type { Metadata } from 'next';
import { LegalShell, pageStyles } from './shared';

export const metadata: Metadata = {
  title: 'Ti Fregano Così — App information',
  description: 'Information about the Ti Fregano Così creator automation integration.',
  alternates: { canonical: 'https://legal.perruccisolutions.com/' },
  robots: { index: false, follow: false, noarchive: true }
};

export default function TiFreganoCosiLegalHome() {
  return (
    <LegalShell>
      <h1 style={pageStyles.h1}>
        Ti Fregano <span style={pageStyles.accent}>Così</span>
      </h1>

      <p style={pageStyles.p}>
        Ti Fregano Così is a creator-operated short-form video project focused on prices,
        marketing, consumer psychology and everyday commercial mechanisms.
      </p>

      <h2 style={pageStyles.h2}>What this integration does</h2>
      <p style={pageStyles.p}>
        This private creator tool prepares original short-form videos and sends them to the
        authorized TikTok account as drafts for review and final publication. It is not a public
        social-media management service and it does not post content on behalf of unrelated users.
      </p>

      <h2 style={pageStyles.h2}>How authorization works</h2>
      <p style={pageStyles.p}>
        Access is granted explicitly through TikTok OAuth by the owner of the authorized creator
        account. The integration requests only the permissions required for the configured upload
        workflow. Access can be revoked from TikTok account settings at any time.
      </p>

      <h2 style={pageStyles.h2}>Data use</h2>
      <p style={pageStyles.p}>
        Account authorization data is used only to authenticate the creator and deliver creator-owned
        media to TikTok. We do not sell OAuth data, profile data or uploaded content.
      </p>
    </LegalShell>
  );
}
