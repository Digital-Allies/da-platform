# Page Editor — Spec & Next.js Implementation Notes

Companion to `cms/page-editor.html` (clickable prototype). This is what
that prototype should become in `tools/build-workflows` (the real Next.js
admin engine) — data model, API surface, and the component-registry
pattern, so it's ready to hand to Claude Code.

## Why a prototype first
The prototype is the source of truth for interaction design (section
stack, drag/reorder, inline content editing, tier-gated code access,
multi-tenant live preview). Build against it, not against this doc's
prose — this doc explains the *why* and the *data shape*, the prototype
shows the *feel*.

## Data model

```
Page
  id, client_id, slug, title, status: 'draft' | 'published'
  seo_title, seo_description
  sections: Section[]   -- ordered array, order = position

Section
  id, page_id, order, type: SectionType, background: 'light' | 'dark'
  content: jsonb          -- shape depends on `type` (see registry below)
  custom_code: text | null  -- Agency-plan raw HTML/CSS override, sandboxed
                              per-section (iframe or scoped shadow DOM at
                              render — never touches the rest of the page)

SectionType (registry key): 'hero' | 'departments' | 'fieldnotes' |
  'richtext' | 'cta' | 'media' | 'stats' | 'quote' | 'faq' |
  'products' | 'contact'
```

`content` per type is a small typed JSON object (e.g. hero =
`{title, subtitle, ctaLabel, ctaHref}`), validated against a per-type
Zod schema — one schema per registry entry, shared by the admin form
and the public renderer so they never drift.

## Component registry pattern (pseudocode)

One file is the seam between "admin edits this" and "site renders
this" — exactly the gap `BlockRenderer.tsx` already partially covers;
extend it into a real registry:

```ts
// lib/section-registry.ts
export const SECTION_REGISTRY = {
  hero: {
    label: 'Hero', source: 'design-system',
    schema: HeroContentSchema,          // zod
    AdminForm: HeroAdminForm,           // small form component, content tab
    PublicBlock: HeroBlock,             // the actual rendered section
    defaultContent: { title: '', subtitle: '', ctaLabel: '', ctaHref: '' },
  },
  products: {
    label: 'Product Grid', source: 'shadcnblocks-derived',
    schema: ProductGridContentSchema,
    AdminForm: ProductGridAdminForm,
    PublicBlock: ProductGrid,           // already built for Atomic Finds
    defaultContent: { categoryFilter: null },
  },
  // …one entry per SectionType
};
```

Adding a new section = one registry entry, not a new page-type branch
anywhere else. The admin's "Add section" library (the modal in the
prototype) is just `Object.values(SECTION_REGISTRY)` rendered as cards.

## Module naming — generic by default, DA jargon only on DA's own tenant
The backend/admin is ONE shared build across every client (decision #7) —
so client-facing module names must be plain and generic: **Services**,
**Testimonials**, **Blog / Articles**, **Contact**, **Settings** — never
Digital Allies' own proprietary vocabulary ("The Departments", "Field
Notes", "The Press Office", "Command Center"). Keep a `client.brandVoice`
flag (or just `client_id === 'digital-allies'`) that swaps in DA's own
labels ONLY on DA's own admin instance — a per-tenant label map over the
same `SECTION_REGISTRY`/nav data, not two codebases. The prototype's
section library now uses the generic names as the shared default.

## Page templates (new pages, not just sections)
A second modal ("+ New" in the prototype) picks a whole-page starting
point, separate from the section library:
- **Blank Page** — empty stack.
- **Home** — pre-populated Hero + Services + Testimonials + CTA.
- **Blog Post** / **Case Study** — generic long-form layouts, available
  to every client.
- **Service / Tool Detail** and **Services Index** — **DA-tenant only**.
  These map directly onto the design system's real, already-built
  `ToolDetail.dc.html` / `ServicesIndex.dc.html` — Anthony's own site
  should be built FROM the design system's existing templates, not a
  generic re-derivation of them. Other clients get their own equivalent
  page templates authored the same pattern, once their design systems
  exist — not this same DA-specific template.

## Where the library components come from
Per-client public sites keep their OWN design system (decision #7 —
never look like Digital Allies). The section *shape* (hero, grid, quote,
FAQ…) is shared; the *skin* is each site's tokens. Two source lanes:
- **DS-native**: sections that already exist in this design system
  (Hero, Departments, Field Notes, Rich Text, CTA, Pinned Quote, Contact)
  — restyled per-client via the existing `--tok-*` variable pattern in
  `SiteTheme.tsx`.
- **Open-source base, re-skinned**: layout patterns adapted from
  shadcnblocks (product/spec grids) and Mantine (accordion/FAQ,
  stat strips) — copied for full code ownership, then stripped of their
  own styling and re-themed onto `--tok-*` so they inherit whichever
  client's tokens are active. Never load either library's CSS/JS
  wholesale; take the markup/logic pattern only.

## Tier / subscription gating
Matches the prototype's Plan switcher:
- **Starter** — content-only editing (title/body/image/background per
  section). No code tab.
- **Pro** — adds a single custom-embed field per page (one sandboxed
  `<iframe>`-style embed slot, not full section rewrite).
- **Agency** — adds full per-section `custom_code` override, sandboxed
  at render (iframe or shadow-DOM scope) so a bad edit can't break
  sibling sections or the page shell.

Gate in the registry layer (`SECTION_REGISTRY[type].AdminForm` decides
what it renders based on `client.plan`), not in the API — the API
should still reject a `custom_code` write server-side if the client's
plan doesn't allow it, so gating isn't just a UI convenience.

## API surface (extends the existing pattern)
```
GET   /api/pages/:slug                 -- page + ordered sections
PATCH /api/pages/:slug                 -- title/seo/status
POST  /api/pages/:slug/sections        -- insert section {type, order}
PATCH /api/sections/:id                -- content, background, order
PATCH /api/sections/:id/code           -- custom_code (403 if plan disallows)
DELETE /api/sections/:id
POST  /api/sections/:id/duplicate
```

## Live preview
The prototype fakes tenant switching client-side. In the real build,
preview renders through the SAME `PublicBlock` components production
uses (not a separate preview renderer) — pull the client's real
`--tok-*` values from `theme.ts`/`settings`, feed in draft `content`
before it's published. This guarantees "what you see is what ships."

## Reconciliation against the real codebase (`tools/build-workflows`)
Checked this spec against `ARCHITECTURE.md`, `PIPELINE.md`, `THEME_ENGINE_PLAN.md`, and the live route/schema list. Corrections, not just confirmations:

- **Schema mismatch — fix before building.** The real `pages` table stores
  `blocks` as a single `jsonb` array column, not normalized `Section` rows
  with `page_id`/`order` foreign keys as this spec first proposed. Match
  the real shape: each array entry is `{type, content, background,
  customCode?}` — no separate table, no migration needed for the base
  model. Only `custom_code`/tier-gating is genuinely new.
- **Block type keys already exist and are already generic** — `BlockRenderer.tsx`
  uses `hero | richtext | services | testimonials | cta | contact | products`
  today (confirmed in `ARCHITECTURE.md`). Use those exact keys, not this
  doc's earlier `departments`/`fieldnotes` — the data layer was already
  ahead of the naming problem; only the admin NAV LABELS ("The
  Departments", "Field Notes", "Command Center" in `AdminNav.tsx`) carry
  DA jargon today, not the schema. `media`, `stats`, `quote`, `faq` are
  genuinely new block types, not yet in `BlockRenderer.tsx` — flag as net-new work, not "already built."
- **Generic-naming decision is a REAL code change, not just copy.** Today
  one deployment = one client (no runtime tenant switching, per
  `ARCHITECTURE.md`), and the shipped `AdminNav.tsx` hard-codes DA's own
  labels for every tenant. Making labels generic-by-default with a
  DA-only override needs an actual per-tenant label map added to
  `AdminNav.tsx` (and anywhere else module names are hard-coded) — it
  isn't live yet anywhere.
- **The prototype's tenant-preview switcher (DA/Atomic Finds/HCTC in one
  screen) is a design-review convenience only.** The real architecture is
  explicitly single-tenant-per-deployment with no runtime switching
  (`ARCHITECTURE.md`, multi-tenancy model). Don't build that switcher into
  the real admin — the real "live preview" is just the current
  deployment's own tenant, rendered through the same `PublicBlock`
  components production uses (per this doc's Live Preview section above).
- **"Blog Post" / "Case Study" as page-editor templates conflicts with
  what's already built.** Blog content is its own separate `posts` table
  + Tiptap editor at `/admin/posts` ("The Press Office" today), not a
  `pages`+`blocks` instance. Don't add them to the page-template picker —
  they belong as content types inside the Posts module (e.g. a `type:
  'post' | 'press_release' | 'case_study'` field there), matching what
  `CMS_IMPLEMENTATION_PLAN.html` already scoped for that module. Keep the
  New Page template picker to true page-shell templates only: Blank, Home,
  and (DA-only) Service Detail / Services Index.
- **Subscription-tier gating already has a landing spot.** A `plan`
  column migration for `clients` already exists
  (`supabase/migrations/20260109000000_client_plan.sql`, per
  Anthony's TODO Priority 2) — reserved but unapplied and with no gating
  logic built on top yet. This spec's Starter/Pro/Agency code-editor gate
  should read that column once it's populated, not add a second plan
  field.
- **Global design-token editing (the other "admin priority" item) is
  already fully scoped** in `THEME_ENGINE_PLAN.md` — extend the existing
  `settings` table with `theme_*` keys, not a new mechanism. This page-editor
  spec doesn't overlap it (page/section content vs. site-wide tokens) but
  they'll share the same `/admin` shell — build order should follow
  `THEME_ENGINE_PLAN.md`'s own sequencing for the token side.

## Open items to confirm with Anthony before building
- Sandbox mechanism for Agency custom code: iframe (fully isolated,
  more implementation work) vs. scoped shadow DOM (simpler, less airtight
  isolation). Recommend iframe for the code tab given it will run
  arbitrary client-authored HTML/CSS.
- Whether Pro-tier embeds need a domain allowlist (to stop @dangerous
  script injection via a "trusted" embed field).
