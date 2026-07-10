# Implementation Plan - Public Block Renderer & Dynamic Pages Routing

This plan covers the implementation details for the **Week of July 13** tasks:
1. **Day 16: Public block renderer**: Build the block registry / renderer to draw dynamic pages from the database.
2. **Day 17: Full site parity**: Extend dynamic rendering to catch-all pages (e.g. `/about`, `/contact`) via dynamic routes.
3. **Day 18: Contact form block**: Integrate the contact form as a block type in the admin panel and public renderer.

---

## Proposed Changes

### Build Workflows Component (`tools/build-workflows`)

#### [NEW] [BlockRenderer.tsx](file:///Users/cuus/Claude/projects/da-platform/tools/build-workflows/src/components/site/BlockRenderer.tsx)
- Create a server-side React component to render block lists.
- Map database blocks (JSONB array) to design system components:
  - `hero` -> `<Hero>`
  - `richtext` -> standard rich text layout with `prose-da` formatting
  - `services` -> `<ThreeColumnGrid>` (fetching services from database)
  - `testimonials` -> `<TestimonialCarousel>` (fetching testimonials from database)
  - `cta` -> centered CTA banner
  - `contact` -> `<ContactForm>`

#### [MODIFY] [data.ts](file:///Users/cuus/Claude/projects/da-platform/tools/build-workflows/src/lib/data.ts)
- Add `getPageBySlug(slug: string)` to query the `pages` table in Supabase where `client_id` matches the environment variable and `status` is `'published'`.

#### [MODIFY] [page.tsx](file:///Users/cuus/Claude/projects/da-platform/tools/build-workflows/src/app/page.tsx)
- Check for a published page in the database with slug `home` (or `index` or empty).
- If found, render the page using `BlockRenderer` (inside `SiteTheme` + `Navigation` / `Footer`).
- If not found (e.g. empty database / initial seed state), fall back to rendering the hardcoded layout as a safe default so the site remains fully operational.

#### [NEW] [page.tsx](file:///Users/cuus/Claude/projects/da-platform/tools/build-workflows/src/app/[slug]/page.tsx)
- Add a root-level dynamic route to support dynamic pages (e.g. `/about`, `/contact`).
- Fetch the page by slug from the database; return `notFound()` if it doesn't exist or is not published.
- Render the page blocks using `BlockRenderer`.

#### [MODIFY] [PagesClient.tsx](file:///Users/cuus/Claude/projects/da-platform/tools/build-workflows/src/app/admin/(protected)/pages/PagesClient.tsx)
- Add `'contact'` as a selectable block type in the admin panel.
- Define default content structure for the `'contact'` block (`title`, `subtitle`).
- Update preview renderer (`generatePreviewHtml()`) to show the contact form in the layout editor iframe.

---

## Verification Plan

### Automated Tests
We will verify that the compilation succeeds after the changes by running:
- `npm run build` inside `tools/build-workflows` to ensure Next.js build passes.

### Manual Verification
- We will test page creation and block reordering in the admin panel `/admin/pages` (creating a test page and adding various blocks including the new contact block).
- We will check that dynamic URLs (like `/about`) render properly if created, and return 404 if they do not exist.
