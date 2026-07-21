# Connected CMS — Digital Allies Client Site Platform

The multi-tenant CMS engine for Digital Allies, built with Next.js 15 + Supabase. One codebase powers an admin panel plus client websites — Anthony manages his own site with it and onboards paying clients as hosted website + CMS subscriptions. A direct replacement for Duda.

**This app lives at `tools/build-workflows/` inside the [`Digital-Allies/da-platform`](https://github.com/Digital-Allies/da-platform) monorepo** (private) — the single source of truth since 2026-07-06. The old standalone repo (`cassellac/da-webwssite-build-workflows`) is archive-only; do not commit to it.

> **Status lives in the repo root `STATUS.md`** — read that first for what's true right now. This README covers what this app is, how it's wired, and how to operate it.

---

## The Vision

**Phase 1 (live):** `digitalallies.net` is connected to the CMS — blog posts, services, and testimonials feed from Supabase into the existing static site. The admin panel is live at `cms.digitalallies.net`.

**Phase 2 (in progress):** Onboard paying clients. Each client gets a Vercel-hosted website and their own admin login. HCTC and Atomic Finds are the first two tenants; the Atomic Finds product catalog is the current build focus.

**This is not Duda. It's better.** Anthony owns the infrastructure, the code, and the client relationships. No platform lock-in.

**The model — one Platform, three faces per client** (see `PIPELINE.md` for the full picture): build the engine once, configure each client — **Admin** (their login + workspace), **Brand** (their tokens), **Website** (their pages). The Website face has two tiers: **Templated** (this engine renders it) or **Connected** (their existing site, fed by the CMS).

---

## The Deployments

| What | Source | Live URL |
|---|---|---|
| **CMS admin engine** (this app) | `Digital-Allies/da-platform` → `tools/build-workflows` (Vercel project `da-webwssite-build-workflows`, re-pointed to the monorepo 2026-07-10) | [cms.digitalallies.net](https://cms.digitalallies.net) (root redirects to `/admin/login`) + [da-webwssite-build-workflows.vercel.app](https://da-webwssite-build-workflows.vercel.app/) |
| **DA public site** — Connected tier, DO NOT REPLACE | Separate repo [`Digital-Allies/DigitalAllies`](https://github.com/Digital-Allies/DigitalAllies) (static HTML) | `digitalallies.net` |
| **Design system** | `packages/design-system` in the monorepo + per-site `sites/<site>/CLAUDE.md` | [digital-allies.github.io/design-system](https://digital-allies.github.io/design-system/) |

⚠ **`sites/digitalallies` in the monorepo is a frozen one-time import** — it is NOT what the live site deploys from. Fixes made to that copy (e.g. the 2026-07-20 `cms-loader.js` HTML-escaping and dead-`tailwind.config` removals) must be manually ported to `Digital-Allies/DigitalAllies` to take effect live.

---

## Architecture: How the CMS Connects to the Existing Site

**The `digitalallies.net` site is NOT being replaced.** Its HTML, CSS, design, and EN/ES language switcher stay exactly as-is. The CMS feeds it dynamic content — this is the "Connected" tier, live and verified working (2026-07-16).

```
┌─────────────────────────────────┐     ┌────────────────────────────────────┐
│  CMS Admin (this app)           │     │  digitalallies.net (DigitalAllies) │
│  cms.digitalallies.net          │     │  Existing static HTML/CSS/JS site  │
│                                 │     │  Visual design stays 100% intact   │
│  Anthony logs in, writes a      │────▶│                                    │
│  blog post, hits Publish        │     │  cms-loader.js fetches published   │
│                                 │     │  content from Supabase and renders │
│  Data saved to Supabase         │     │  it into the existing layouts      │
└─────────────────────────────────┘     └────────────────────────────────────┘
              │
              ▼
    ┌──────────────────┐
    │  Supabase        │
    │  posts, services │
    │  testimonials,   │
    │  settings, pages │
    │  products, ...   │
    │  (scoped by      │
    │   client_id)     │
    └──────────────────┘
```

For **Templated-tier** clients, this app also renders their public site: block-based pages (`pages` table) render through `BlockRenderer.tsx` at the dynamic `[slug]` route, using the public components in `src/components/site/` themed per client.

---

## Tenants (live in Supabase)

| Client | `NEXT_PUBLIC_CLIENT_ID` | Tier | Notes |
|---|---|---|---|
| Digital Allies | `3d76b896-e1fb-49f0-a8db-f62fdd5bc258` | Connected | Seeded: settings, services, testimonials. Admin user: `contact@digitalallies.net` |
| Healthcare Training Center | `7896354c-…` | Templated (building) | Navy/teal + Montserrat tokens |
| Atomic Finds | `443936d5-f92e-480b-b206-c65cfb52bdfc` | Templated (building) | Product catalog in progress — see below |

**Per-client theming is done:** `src/lib/theme.ts` maps design tokens by `client_id`; `SiteTheme.tsx` injects them as `--tok-*` CSS variables scoped to `.site-theme-scope`. Public sites each use their OWN design system (per-site `sites/<site>/CLAUDE.md`) — a client site must never look like Digital Allies. The admin stays DA-branded for all clients.

---

## Atomic Finds Product Catalog (current focus)

**PR [#1](https://github.com/Digital-Allies/da-platform/pull/1) — schema + data layer, review-complete and ready to merge.** It adds:

- `supabase/migrations/20260117000000_products_table.sql` — `products` table (same `client_id` + RLS convention as services/testimonials), `(client_id, display_order)` index, `updated_at` auto-refresh trigger, `gen_random_uuid()` ids.
- `supabase/seed-atomic-finds-products.sql` — 4 real listings from Jennyfer's Facebook Marketplace catalog. Idempotent (client-scoped delete-then-insert) — safe to re-run, but don't re-run after live product management starts.
- `Product` type in `types.ts` + `getProducts()` in `data.ts`.

**To apply after merge** (nothing touches the live DB automatically): Supabase Dashboard → Atomic Finds project → SQL Editor → paste + Run the migration file, then the seed file. Verify 4 rows in Table Editor → `products`.

**Still to build:**
1. Frontend catalog components (design handoff from Claude Design incoming) + a `'products'` case in `BlockRenderer.tsx`.
2. **Admin Products editor** — required so non-technical users (Jennyfer) can add/remove products as items sell. Follow the Services module pattern (`admin/(protected)/services/page.tsx` — full CRUD with ordering).
3. Product photos (`image_url` is intentionally NULL on all seeded rows) and the 5th product (cut off mid-paste in the source data).

---

## Admin Panel

Live at `cms.digitalallies.net/admin`. Auth: Supabase (`@supabase/ssr`), with password reset flow (added 2026-07-19). Mobile-responsive login.

| Section | State |
|---|---|
| Dashboard | Wired to real data |
| Posts (Tiptap rich text) | Working |
| Pages (block builder + visual preview) | Working; Anthony flagged production-readiness gaps (code option, real component previews) |
| Services | Full CRUD with ordering |
| Testimonials | Full CRUD |
| Settings | Working |
| Messages (contact submissions) | Working |
| Research | Working |
| Content ("Press Office") | Placeholder — needs templates + connection to digitalallies.net/learn/ format |
| Projects | Placeholder — needs project templates |
| Development ("Workshop") | Placeholder — needs templates, notifications, login/out button |
| **Products** | **Missing — next up** (see Atomic Finds section) |

The admin UI follows the **Connected CMS prototype** (`cms-suite` repo, at `~/Claude/projects/cms-suite` — moved out of this monorepo 2026-07-16). That prototype is the admin design spec; the admin is not a generic CRUD skin.

---

## Onboarding a New Client

No new repo needed. Same codebase, new Vercel deployment, new `CLIENT_ID`:

**Step 1 — Add them to Supabase** (SQL Editor):

```sql
-- clients columns: id, auth_user_id, business_name, plan, created_at
INSERT INTO clients (id, business_name)
VALUES (gen_random_uuid(), 'Client Name')
RETURNING id;  -- copy this UUID

INSERT INTO settings (client_id, key, value) VALUES
  ('THEIR-UUID', 'site_title', 'Client Name'),
  ('THEIR-UUID', 'brand_color', '#HEX'),
  ('THEIR-UUID', 'hero_title', 'Their headline here'),
  ('THEIR-UUID', 'phone', '(555) 000-0000'),
  ('THEIR-UUID', 'email', 'hello@clientdomain.com');
```

**Step 2 — Deploy to Vercel:** Add New Project → import `Digital-Allies/da-platform`, root directory `tools/build-workflows`. Env vars same as DA's but with their `NEXT_PUBLIC_CLIENT_ID` and `NEXT_PUBLIC_SITE_URL`.

**Step 3 — Domain:** point DNS at Vercel, add the custom domain in project settings.

**Step 4 — Admin access:** Supabase → Authentication → Users → Invite their email. They log in at `https://theirdomain.com/admin`. Link the auth user to their client row (`clients.auth_user_id`).

**Step 5 — Content:** add their design tokens to `src/lib/theme.ts` and a `sites/<site>/CLAUDE.md`; populate content via the admin.

Supabase RLS (scoped by `client_id`) ensures every client only ever sees their own data.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router, TypeScript) |
| Styling | Tailwind CSS + DA design tokens in `src/styles/globals.css`; per-client tokens via `theme.ts` + `SiteTheme.tsx` |
| Database | Supabase (PostgreSQL + RLS) |
| Auth | Supabase Auth (`@supabase/ssr`) |
| Email | Resend |
| Rich text | Tiptap |
| Forms | React Hook Form + Zod |
| Deployment | Vercel |

---

## Environment Variables

Set in Vercel project settings and `.env.local` for local dev (never committed). **Vercel env vars have no connection to `.env.local` — pushing commits never syncs them.**

⚠ **Key system migrated 2026-07-16/19:** the Supabase project now uses the new **Publishable/Secret** key system; legacy anon/service-role keys are **disabled** (the previously-leaked key is dead). The env var *names* below are unchanged — their *values* must be the new-format keys. If auth fails with "Legacy API keys are disabled," a deployment still carries old values.

| Variable | Notes |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://auwhvicpyiwsubucanpb.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | New **Publishable** key value — public, safe to expose |
| `SUPABASE_SERVICE_ROLE_KEY` | New **Secret** key value — **sensitive**, server-only |
| `NEXT_PUBLIC_CLIENT_ID` | Tenant UUID (see Tenants table) |
| `NEXT_PUBLIC_SITE_URL` | The deployment's public URL |
| `CONTACT_FORM_TO_EMAIL` | Where contact-form submissions go |
| `RESEND_API_KEY` | **Sensitive** |

---

## DA Brand Tokens (admin + DA's own site)

Defined in `src/styles/globals.css` and `tailwind.config.js`. Client sites use their own tokens via `theme.ts` — never these.

| Token | Hex | Use |
|---|---|---|
| Bone White | `#F9F6F0` | Canvas / backgrounds |
| Charcoal | `#2D2D2D` | Text, borders, structure |
| Signal Red | `#C5301A` | Primary CTAs, `--brand` default |
| Pulse Blue | `#3A7BD5` | Links, admin nav |
| Technical Lace | — | 20px grid at 7% opacity — `.grid-overlay` |

`--brand` is injected from `settings.brand_color` in Supabase; defaults to Signal Red.

---

## Key Files

```
src/
├── app/
│   ├── layout.tsx            ← Root layout; injects --brand CSS var
│   ├── page.tsx              ← Public homepage (Templated-tier clients)
│   ├── [slug]/page.tsx       ← Dynamic block-based pages (public)
│   └── admin/                ← Admin panel (auth-gated)
│       ├── login/  reset-password/
│       └── (protected)/      ← dashboard, posts, pages, services,
│                                testimonials, settings, messages,
│                                content, projects, research, development
├── components/
│   ├── site/                 ← Public components: Navigation, Hero,
│   │                            ThreeColumnGrid, TestimonialCarousel,
│   │                            TwoColumn, ContactForm, Footer,
│   │                            BlockRenderer, SiteTheme, CTAButton,
│   │                            CelestialScrollHero
│   └── admin/                ← Admin UI components
├── lib/
│   ├── data.ts               ← Supabase fetchers, all scoped by CLIENT_ID
│   ├── theme.ts              ← Per-client design tokens
│   ├── supabase.ts / supabase-server.ts
│   └── types.ts              ← Types + parseSettings() + DEFAULT_SETTINGS
└── styles/globals.css        ← DA tokens, admin CSS, .site-theme-scope

supabase/
├── migrations/               ← Canonical schema history:
│   ├── 20260101000000_initial_schema.sql
│   ├── 20260101000001_security_fixes.sql
│   ├── 20260101000002_cms_tables.sql
│   ├── 20260101000003_admin_features.sql
│   ├── 20260109000000_client_plan.sql
│   └── 20260117000000_products_table.sql   ← lands with PR #1
├── seed-atomic-finds-products.sql          ← lands with PR #1
├── schema.sql / seed-da.sql / seed.sql     ← earlier flat files (applied)
├── security-fixes.sql                       ← ⚠ still needs a run in SQL editor
└── update-content.sql                       ← DA content refresh (applied)
```

Other docs here: `PIPELINE.md` (platform model), `SETUP.md`, `tasks/anthony/TODO.md` (every dashboard-only action queued for Anthony), `tasks/` (build sequence).

---

## Known Open Items

Tracked properly in root `STATUS.md` + `tasks/anthony/TODO.md`; headline items as of 2026-07-21:

1. **Anthony:** apply `security-fixes.sql` + enable leaked-password protection (Supabase dashboard).
2. **Anthony:** merge PR #1, then run the products migration + seed (steps above).
3. **Build:** Atomic Finds catalog frontend + `'products'` block + **admin Products editor**.
4. **Build:** the placeholder admin sections (Development, Projects, Content) per Anthony's Vercel Toolbar notes.
5. **Port** the 2026-07-20 `cms-loader.js` escaping + dead-`tailwind.config` fixes from `sites/digitalallies` to the live `Digital-Allies/DigitalAllies` repo.

---

## Local Development

```bash
cd tools/build-workflows
npm install
npm run dev
# → http://localhost:3000/admin
```

```bash
npx tsc --noEmit   # TypeScript check, no build needed
```
