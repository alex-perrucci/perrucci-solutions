import type { Metadata } from 'next';
import { LegalShell, pageStyles } from '../shared';

export const metadata: Metadata = {
  title: 'Privacy Policy — Ti Fregano Così',
  description: 'Privacy Policy for the Ti Fregano Così creator automation integration.',
  alternates: { canonical: 'https://legal.perruccisolutions.com/privacy' },
  robots: { index: false, follow: false, noarchive: true }
};

export default function PrivacyPolicy() {
  return (
    <LegalShell>
      <h1 style={pageStyles.h1}>Privacy Policy</h1>
      <p style={pageStyles.p}>Last updated: 21 September 2026.</p>

      <h2 style={pageStyles.h2}>1. Service operator</h2>
      <p style={pageStyles.p}>
        The Ti Fregano Così creator automation is operated by Perrucci Solutions.
        Privacy questions can be sent to info@perruccisolutions.com.
      </p>

      <h2 style={pageStyles.h2}>2. Data we process</h2>
      <ul style={pageStyles.ul}>
        <li>TikTok OAuth identifiers and authorization tokens.</li>
        <li>Basic account information returned as part of the authorization process, when provided.</li>
        <li>Creator-owned video files and related publication metadata.</li>
        <li>Limited technical logs required to diagnose failed uploads and maintain service reliability.</li>
      </ul>

      <h2 style={pageStyles.h2}>3. Why we process it</h2>
      <p style={pageStyles.p}>
        Data is processed only to authenticate the authorized creator account, transfer creator-owned
        videos to TikTok as drafts, maintain the connection, prevent abuse and troubleshoot failures.
      </p>

      <h2 style={pageStyles.h2}>4. Sharing and sale of data</h2>
      <p style={pageStyles.p}>
        We do not sell personal data, OAuth credentials or uploaded content. Data is shared only with
        service providers that are technically necessary to operate the workflow, including TikTok
        and the infrastructure used to render and deliver the creator's own media.
      </p>

      <h2 style={pageStyles.h2}>5. Retention</h2>
      <p style={pageStyles.p}>
        Authorization credentials are retained only while the integration remains authorized and are
        removed or rendered unusable when access is revoked. Generated media and technical logs are
        retained only for the time reasonably necessary to operate, verify or troubleshoot the workflow.
      </p>

      <h2 style={pageStyles.h2}>6. Security</h2>
      <p style={pageStyles.p}>
        Secrets and refresh credentials are stored using access controls and encryption where supported.
        Plaintext OAuth credentials are not intentionally published in source control.
      </p>

      <h2 style={pageStyles.h2}>7. Your choices</h2>
      <p style={pageStyles.p}>
        The authorized TikTok account owner can revoke access at any time through TikTok account settings.
        Requests concerning stored data can be sent to info@perruccisolutions.com.
      </p>

      <h2 style={pageStyles.h2}>8. Changes</h2>
      <p style={pageStyles.p}>
        This policy may be updated when the integration or applicable requirements change. The latest
        version will always be available at this URL.
      </p>
    </LegalShell>
  );
}
