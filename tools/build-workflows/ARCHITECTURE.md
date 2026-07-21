# ARCHITECTURE.md — the CMS admin + public engine

Backfilled 2026-07-21, from the CMS Build Plan's original Vercel/architecture
layout (`packages/design-system/cms/connected/CMS Build Plan.html`) reconciled
against what is actually built in `tools/build-workflows/src/`. This is the
Day-04 doc the 30-Day Run always meant to produce — it just slipped, per
`STATUS.md`. Where reality drifted from the original plan, reality wins; the
drift is called out below rather than hidden.

Read `PIPELINE.md` first for the four-stage build model and the Platform /
Admin / Brand / Website vocabulary. This file is the one level down: how the
single Next.js app is actually wired.

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router, TypeScript), React 18 |
| Data + Auth | Supabase (Postgres, Auth via `@supabase/ssr`, Row-Level Security) |
| Styling | Tailwind CSS + hand-rolled brand CSS vars (`--tok-*`) |
| Rich text | Tiptap (`@tiptap/react` + starter-kit) |
| Forms | React Hook Form + Zod |
| Email | Resend |
| Icons | lucide-react |
| Hosting | Vercel, one deployment per client, auto-deploy from GitHub |

## Multi-tenancy model

One Postgres database, one Next.js codebase, many deployments. Every table
carries a `client_id` foreign key to `clients`; Supabase RLS is the isolation
boundary — not application code. Each Vercel deployment sets one
`NEXT_PUBLIC_CLIENT_ID`, which the app treats as "who am I" for every
query. There is no runtime tenant switching: one deployment = one client.

Env vars an actual deployment needs (from grepping `process.env.*` usage):

- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` — client-side Supabase
- `SUPABASE_SERVICE_ROLE_KEY` — server-only, used in server actions/route handlers
- `NEXT_PUBLIC_CLIENT_ID` — which tenant this deployment renders/edits
- `NEXT_PUBLIC_SITE_URL` — this deployment's own canonical URL
- `CONTACT_FORM_TO_EMAIL`, `RESEND_API_KEY` — contact-form email delivery

These are Vercel project env vars, set per deployment. They have **no
connection** to `.env.local` in the repo (gitignored, and Vercel doesn't read
it) — see `STATUS.md`'s 2026-07-19 entry for the incident that surfaced this.

## Route structure (`src/app/`)

```
src/app/
├── page.tsx                    Public home — reads a `pages` row (slug 'home'
│                                 or 'index') if one exists; falls back to a
│                                 hardcoded settings-driven layout if not.
├── [slug]/page.tsx             Public dynamic page renderer — any other
│                                 published `pages` row, by slug. ISR, 60s.
├── blog/page.tsx, blog/[slug]/page.tsx   Public posts list + detail (`posts` table).
├── api/contact/route.ts        Contact form POST → insert `contact_submissions` + Resend email.
├── auth/callback/page.tsx      Supabase auth callback (magic link / OAuth land here).
├── admin/login/page.tsx        Public — excluded from middleware auth gate.
├── admin/reset-password/page.tsx   Public — password reset landing.
└── admin/(protected)/          Everything below requires a Supabase session
    ├── layout.tsx               AdminShell + AdminNav wrapper
    ├── page.tsx                 Dashboard (live counts via lib/data.ts + direct queries)
    ├── pages/                   Page list + block-based builder (PagesClient.tsx)
    ├── posts/                   Blog/Journal list + editor (PostEditor.tsx, Tiptap)
    ├── services/                "The Departments" — services CRUD (title/desc/price/icon/order)
    ├── testimonials/            "Field Notes" — testimonials CRUD (quote/author/rating/order)
    ├── messages/                "Command Center" — contact_submissions inbox, read/unread
    ├── settings/                Site settings form (key/value → SiteSettings)
    ├── development/             "The Workshop" — placeholder, not wired to real data
    ├── projects/                Placeholder — no real project templates yet
    └── research/                Research notes module
```

**Correction to STATUS.md / BUILD-SCHEDULE.md:** both docs (as of 2026-07-20)
describe a Services/Testimonials admin module as **not yet built**, scheduled
for Jul 22–23. It already exists — `admin/(protected)/services/page.tsx` and
`admin/(protected)/testimonials/page.tsx` are full CRUD UIs (add/edit/delete/
reorder), linked in `AdminNav.tsx` ("Departments" / "Field Notes"), backed by
the real `services`/`testimonials` tables with `client_id` + RLS, going
through `createClient()` directly rather than a `lib/store.ts` abstraction.
Confirmed present since the very first commit that created the Next.js app
(predates this monorepo's import). The Jul 22–23 schedule slot should be
dropped or repointed — see `STATUS.md`'s 2026-07-21 entry for detail. The one
real gap in this area: `cms-loader.js` (the *static* `sites/digitalallies`
site, a separate codebase) is a different rendering path from this admin
module and still needs its own HTML-escaping fix ported to the live
`Digital-Allies/DigitalAllies` repo — that item stands as previously tracked.

## Data layer

There is no `lib/store.ts` / `lib/plans.ts` as the original Build Sequence
(Day 10) envisioned. Instead:

- **`lib/supabase.ts`** — browser Supabase client, used by all `'use client'`
  admin pages for direct reads/writes (services, testimonials, pages, posts,
  settings admin UIs all call `createClient()` inline, not through a shared
  data-access module).
- **`lib/supabase-server.ts`** — server Supabase client (cookie-aware, via
  `@supabase/ssr`), used by `lib/data.ts` and server components.
- **`lib/data.ts`** — the closest thing to a data layer, but public-facing
  only: `getSiteSettings`, `getPublishedPosts`, `getPostBySlug`,
  `getServices`, `getTestimonials`, `getProducts`, `getPageBySlug`. All scoped
  to `NEXT_PUBLIC_CLIENT_ID`, all read-only, all used by the public route
  tree. Admin write paths do not go through this file — each admin page owns
  its own Supabase calls.
- **`lib/types.ts`** — hand-written interfaces mirroring the Postgres tables
  (`Client`, `Post`, `Service`, `Testimonial`, `Product`, `TeamMember`,
  `GalleryItem`, `Setting`, `ContactSubmission`), plus `SiteSettings` /
  `DEFAULT_SETTINGS` / `parseSettings()` which flattens the `settings`
  key-value table into one object.
- **`lib/theme.ts`** — per-`client_id` design-token map, consumed by
  `SiteTheme.tsx` to inject `--tok-*` CSS variables (decision #7's per-client
  theming, Step 2, done 2026-07-09).

**Settings drift from the original plan:** Day 06 of the Build Sequence
called for a single JSONB settings blob per client. What's actually built is
a `settings` table of `(client_id, key, value)` rows, flattened at read time
by `parseSettings()`. Functionally equivalent, different shape — worth
knowing before writing new code against it.

## Content model (Postgres, `supabase/schema.sql` + `supabase/migrations/`)

Core tables, all with `client_id` + RLS: `clients`, `posts`, `services`,
`testimonials`, `team_members`, `gallery_items`, `settings`,
`contact_submissions`. Added later via migrations: `pages` (with a `blocks`
jsonb column — the block-based page builder), `articles`, `tools`,
`design_tokens`, `content_calendar` (`20260101000002_cms_tables.sql`);
`projects`, `project_tasks`, `research_notes`, `dev_tasks`, `notifications`
(`20260101000003_admin_features.sql`); `products` (Atomic Finds catalog,
`20260117000000_products_table.sql`, same `client_id`+RLS convention, merged
via PR #1/#3 but migration still needs to be run in the Supabase SQL editor
by Anthony).

RLS policy shape (see `supabase/schema.sql` ~L170+): authenticated members
read/write their own `client_id`'s rows; `anon` can only `select` rows where
applicable (e.g. `status = 'published'`); no client can see another's data.
`security-fixes.sql` (still unapplied as of last confirmation) tightens the
`SECURITY DEFINER` functions flagged by Supabase's Security Advisor.

## Page rendering — block registry

`BlockRenderer.tsx` maps a `pages.blocks` JSONB array to brand components:
`hero`, `richtext` (raw HTML via `dangerouslySetInnerHTML` — trusted admin
input only, not user-submitted), `services`, `testimonials`, `cta`,
`contact`. Both `src/app/page.tsx` (home) and `src/app/[slug]/page.tsx` (any
other slug) use it; home falls back to a hardcoded settings-driven layout if
no `pages` row exists for `'home'`/`'index'` yet, so a fresh tenant always
renders something before any pages are authored. Both routes use
`revalidate = 60` (ISR), not full static generation — content updates surface
within a minute without a redeploy.

## Auth + routing (`src/middleware.ts`)

Single middleware handles two concerns, both scoped by exact host/path match
so neither leaks to other tenants:

1. `cms.digitalallies.net`'s bare root redirects to `/admin/login` (that
   hostname has no public marketing page of its own — it's the admin-only
   subdomain).
2. Any `/admin/*` route other than `/admin/login` requires a Supabase
   session; unauthenticated requests bounce to `/admin/login`, with session
   cookies carried through the redirect response (a prior infinite-redirect
   bug came from dropping refreshed tokens here — see the inline comment).

`/admin/login` and `/admin/reset-password` are excluded from the auth gate by
the middleware's `matcher` config so they always render regardless of session
state.

## What's real vs. placeholder right now

Wired to real Supabase data: Dashboard counts, Pages (list + block builder),
Posts/Journal, Services/Departments, Testimonials/Field Notes, Command Center
inbox, Settings, the public site renderer, the contact form loop.

Still placeholder (per Anthony's own Vercel Toolbar comments, `STATUS.md`
2026-07-19): `/admin/development` ("The Workshop"), `/admin/projects`. Not
wired to real templates or actions yet — scheduled in `BUILD-SCHEDULE.md`'s
Week of Jul 27.

## Where this deviates from `PIPELINE.md` / the Build Sequence — summary

1. No `lib/store.ts` / `lib/plans.ts` — see Data layer above.
2. `settings` is a key-value table, not one JSONB blob per client.
3. Services/Testimonials admin exists already; the schedule assumed it didn't
   (corrected above and in `STATUS.md`).
4. The public renderer lives at `(site)/[slug]` at the app root, not under a
   `(site)/[client]` route group as Day 16's prompt described — single-tenant-
   per-deployment made the extra segment unnecessary.

Everything else — the three-face model, Templated/Connected website tiers,
`client_id` + RLS isolation, one engine many deployments — matches the plan
as designed.
