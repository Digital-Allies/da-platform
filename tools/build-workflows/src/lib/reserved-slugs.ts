// `pages` table rows whose slug should never appear as a generic page link
// in nav/sitemap listings — either because they're served by a dedicated
// Next.js route already (legal/utility pages), or because they're the
// homepage itself (rendered at `/`, not `/home` or `/index` via the
// `[slug]` catch-all — see app/page.tsx's getPageBySlug('home' | 'index')).
export const RESERVED_PAGE_SLUGS = [
  'privacy', 'terms', 'cookies', 'accessibility', 'use-of-ai', 'legal', 'sitemap',
  'home', 'index',
]
