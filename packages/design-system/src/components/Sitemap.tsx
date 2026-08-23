// Human-readable HTML sitemap component, required on every DA Platform site
// at `/sitemap` (NEW-SITE-SETUP-PROCESS.md §3.5). Lists every published page
// for the current tenant.
//
// Presentational: the caller queries the `pages` table scoped by client_id
// (see tools/build-workflows/src/lib/data.ts's getPublishedPages() for the
// exact pattern — select id/title/slug, filter client_id + status=published)
// and passes the results in as `pages`. Kept data-agnostic for the same
// reason as AccessibilityStatement/UseOfAI: no Supabase/server dependency
// baked into this shared package.
import React from 'react';

export interface SitemapPageLink {
  title: string;
  slug: string;
}

export interface SitemapStaticLink {
  title: string;
  path: string;
}

export interface SitemapProps {
  /** CMS-managed pages for this tenant (from the `pages` table). */
  pages: SitemapPageLink[];
  /**
   * Fixed utility/legal routes that aren't rows in the `pages` table
   * (terms, privacy, accessibility, etc.) — rendered as their own group.
   */
  staticLinks?: SitemapStaticLink[];
  /** Root-relative path prefix for CMS pages, e.g. '/' or '/pages/'. */
  pagePathPrefix?: string;
}

// Simple hierarchy heuristic: a slug with a '/' (e.g. "blog/my-post") is
// grouped under its first segment; everything else is grouped as "Pages"
// and sorted alphabetically by title within each group.
function groupPages(pages: SitemapPageLink[]): Record<string, SitemapPageLink[]> {
  const groups: Record<string, SitemapPageLink[]> = {};
  for (const page of pages) {
    const segments = page.slug.split('/').filter(Boolean);
    const groupKey = segments.length > 1 ? segments[0] : 'Pages';
    const label = groupKey === 'Pages' ? 'Pages' : groupKey.charAt(0).toUpperCase() + groupKey.slice(1);
    if (!groups[label]) groups[label] = [];
    groups[label].push(page);
  }
  for (const key of Object.keys(groups)) {
    groups[key].sort((a, b) => a.title.localeCompare(b.title));
  }
  return groups;
}

export function Sitemap({ pages, staticLinks = [], pagePathPrefix = '/' }: SitemapProps) {
  const grouped = groupPages(pages);
  const groupNames = Object.keys(grouped).sort((a, b) => (a === 'Pages' ? -1 : b === 'Pages' ? 1 : a.localeCompare(b)));

  return (
    <div className="da-sitemap">
      {groupNames.map((group) => (
        <section key={group} style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '12px' }}>{group}</h2>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {grouped[group].map((page) => (
              <li
                key={page.slug}
                style={{ borderBottom: '1px solid var(--tok-border, #e5e7eb)', padding: '10px 0' }}
              >
                <a
                  href={`${pagePathPrefix}${page.slug}`.replace(/\/{2,}/g, '/')}
                  style={{ color: 'var(--tok-primary, inherit)', fontWeight: 600, textDecoration: 'underline' }}
                >
                  {page.title}
                </a>
                <span style={{ fontSize: '0.75rem', color: 'var(--tok-text-muted, #6b7280)', marginLeft: '12px' }}>
                  {pagePathPrefix}{page.slug}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ))}

      {staticLinks.length > 0 && (
        <section>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '12px' }}>Legal &amp; Compliance</h2>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {staticLinks.map((link) => (
              <li
                key={link.path}
                style={{ borderBottom: '1px solid var(--tok-border, #e5e7eb)', padding: '10px 0' }}
              >
                <a
                  href={link.path}
                  style={{ color: 'var(--tok-primary, inherit)', fontWeight: 600, textDecoration: 'underline' }}
                >
                  {link.title}
                </a>
                <span style={{ fontSize: '0.75rem', color: 'var(--tok-text-muted, #6b7280)', marginLeft: '12px' }}>
                  {link.path}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

export default Sitemap;
