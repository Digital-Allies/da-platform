// AI-disclosure page-content template, required on every DA Platform site at
// `/use-of-ai` (NEW-SITE-SETUP-PROCESS.md §3.4 "AI Readiness").
//
// Same pattern as AccessibilityStatement.tsx: presentational, takes the
// client's business name / contact email as props rather than fetching them
// itself. Renders body content only — the caller supplies its own page
// <h1>/title (see ClientPageWrapper.tsx in tools/build-workflows).
import React from 'react';

export interface UseOfAIProps {
  /** Client's business name, e.g. site_title from settings. */
  businessName: string;
  /** Contact email for questions about AI use, e.g. email from settings. */
  contactEmail?: string;
  /** ISO date string or human date for "last reviewed" — optional. */
  lastReviewed?: string;
}

export function UseOfAI({ businessName, contactEmail, lastReviewed }: UseOfAIProps) {
  return (
    <div className="da-use-of-ai">
      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px' }}>How AI Was Used</h2>
        <p style={{ marginBottom: '16px', lineHeight: 1.7 }}>
          Artificial intelligence tools were used to help build and design this website for{' '}
          {businessName} — including drafting initial page layouts, generating starter copy,
          assisting with code, and running accessibility checks during development.
        </p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px' }}>Human Review</h2>
        <p style={{ marginBottom: '16px', lineHeight: 1.7 }}>
          Every piece of AI-assisted content and code on this site is reviewed and approved by a
          human before it is published. AI is used to accelerate the work, not to replace editorial
          judgment — final decisions about what appears on this site are made by people.
        </p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px' }}>Ongoing Content</h2>
        <p style={{ marginBottom: '16px', lineHeight: 1.7 }}>
          {businessName} may continue to use AI tools to help draft or update content on this site
          over time (for example, blog posts or product descriptions). The same standard applies
          going forward: AI-generated content is reviewed by a human before publishing.
        </p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px' }}>Questions</h2>
        <p style={{ lineHeight: 1.7 }}>
          If you have questions about how AI was used in building or maintaining this site, please
          contact us
          {contactEmail ? (
            <>
              {' '}at{' '}
              <a href={`mailto:${contactEmail}`} style={{ color: 'var(--tok-primary, inherit)', textDecoration: 'underline' }}>
                {contactEmail}
              </a>
              .
            </>
          ) : (
            '.'
          )}
        </p>
        {lastReviewed && (
          <p style={{ marginTop: '16px', fontSize: '0.85rem', color: 'var(--tok-text-muted, #6b7280)' }}>
            This disclosure was last reviewed on {lastReviewed}.
          </p>
        )}
      </section>
    </div>
  );
}

export default UseOfAI;
