// Accessibility statement page-content template, required on every DA
// Platform site at `/accessibility` (NEW-SITE-SETUP-PROCESS.md §3.5, §3.7).
//
// Deliberately presentational and data-agnostic: it takes the client's
// business name / contact email as props rather than fetching them itself,
// so it stays usable regardless of how a given app fetches its settings row
// (see tools/build-workflows/src/lib/data.ts's getSiteSettings() for the
// pattern this repo's CMS uses to produce those props). Renders body content
// only (h2 sections) — the caller supplies its own page <h1>/title, matching
// how tools/build-workflows/src/components/site/ClientPageWrapper.tsx wraps
// page content today.
import React from 'react';

export interface AccessibilityStatementProps {
  /** Client's business name, e.g. site_title from settings. */
  businessName: string;
  /** Contact email for accessibility issues, e.g. email from settings. */
  contactEmail?: string;
  /** Conformance target — defaults to the platform non-negotiable (AGENTS.md). */
  conformanceTarget?: string;
  /**
   * Known limitations, left editable/overridable per client rather than
   * invented — pass real, current gaps here. Defaults to a neutral
   * "none known" statement, which is itself a real (not fabricated) claim
   * until a limitation is identified.
   */
  knownLimitations?: React.ReactNode;
  /** ISO date string or human date for "last reviewed" — optional. */
  lastReviewed?: string;
}

export function AccessibilityStatement({
  businessName,
  contactEmail,
  conformanceTarget = 'WCAG 2.1 Level AA',
  knownLimitations,
  lastReviewed,
}: AccessibilityStatementProps) {
  return (
    <div className="da-accessibility-statement">
      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px' }}>Our Commitment</h2>
        <p style={{ marginBottom: '16px', lineHeight: 1.7 }}>
          {businessName} is committed to ensuring digital accessibility for people of all abilities.
          We are continually improving the user experience for everyone and applying the relevant
          accessibility standards to achieve that.
        </p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px' }}>Conformance Target</h2>
        <p style={{ marginBottom: '16px', lineHeight: 1.7 }}>
          This website targets conformance with{' '}
          <strong>{conformanceTarget}</strong> ({conformanceTarget.includes('WCAG') ? '' : 'WCAG 2.1 Level AA, '}
          the internationally recognized standard for web accessibility). This includes sufficient
          color contrast, full keyboard operability, visible focus indicators, semantic HTML
          structure, and screen-reader-friendly labeling across the site.
        </p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px' }}>Known Limitations</h2>
        <div style={{ marginBottom: '16px', lineHeight: 1.7 }}>
          {knownLimitations ?? (
            <p>
              We are not currently aware of any accessibility barriers on this site. If you
              encounter content or a feature that isn&apos;t accessible to you, please let us know
              using the contact method below so we can address it.
            </p>
          )}
        </div>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px' }}>Reporting Accessibility Issues</h2>
        <p style={{ lineHeight: 1.7 }}>
          If you experience any difficulty accessing any part of this website, please contact us
          {contactEmail ? (
            <>
              {' '}at{' '}
              <a href={`mailto:${contactEmail}`} style={{ color: 'var(--tok-primary, inherit)', textDecoration: 'underline' }}>
                {contactEmail}
              </a>
              . We take all feedback seriously and will do our best to address the issue promptly.
            </>
          ) : (
            '. We take all feedback seriously and will do our best to address the issue promptly.'
          )}
        </p>
        {lastReviewed && (
          <p style={{ marginTop: '16px', fontSize: '0.85rem', color: 'var(--tok-text-muted, #6b7280)' }}>
            This statement was last reviewed on {lastReviewed}.
          </p>
        )}
      </section>
    </div>
  );
}

export default AccessibilityStatement;
