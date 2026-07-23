# da-platform — running status

**The shared source of truth for every AI agent (Claude Code + Antigravity) and
for Anthony.** Read this first, before doing anything. Update it after every
large step: what changed, what's true now, what's next. Keep it short and current
— stale status is worse than none.

**Last updated:** 2026-07-23 (daily build session) — by Claude Code (dashboard-backlog audit: `/admin/projects` confirmed superseded; `/admin/content` live-parity check found a real, currently-live bug on digitalallies.net, in the separate `Digital-Allies/DigitalAllies` repo)

## 2026-07-23 — daily build session: `/admin/projects` superseded (same pattern); `/admin/content` live-parity check finds a real, currently-live production bug — NOT in this repo

**Schedule order followed:** Wed–Thu Jul 29–30's `/admin/projects` slot was
next. Checked `ProjectsClient.tsx` against Anthony's original complaint
("doesn't work and need to build actual project templates") — **same stale
pattern as the other three dashboard-backlog items.** `git log` on the whole
`admin/(protected)/projects/` directory shows exactly one commit ever
touched it (`c277733`, the Jul 6 import) — it predates the monorepo and has
never been revisited. The code already has: full CRUD for projects + tasks,
a working drag-and-drop Kanban board (`todo`/`in_progress`/`review`/`done`),
and — the specific thing the complaint says is missing — a "Initialize
Template" picker on project creation with 3 real templates (Software
Launch / Marketing Campaign / SEO Audit) that insert real starter tasks
into `project_tasks` on creation, not stub content. Nothing to build here.
Marked superseded in `BUILD-SCHEDULE.md` below.

**Moved to the next item, Mon–Tue Aug 3–4's `/admin/content` slot.** This
one had a real open question STATUS.md flagged twice before but nobody had
tools to check: does a post made in the CMS admin's Press Office actually
show up on the live `digitalallies.net/learn/` page? Previous sessions
could only check `sites/digitalallies` **in this monorepo** (a frozen,
one-time import, confirmed via git log to have exactly one commit ever) —
not the separate live `Digital-Allies/DigitalAllies` repo that
digitalallies.net actually deploys from. This session had working `gh`
access to that repo for the first time, so did the check for real.

**Finding #1 — the homepage no longer loads `cms-loader.js` at all, so
editing Services/Testimonials in the CMS admin has zero live effect on
digitalallies.net's homepage today.** Confirmed by reading the live repo's
`index.html` script tags (none reference `cms-loader.js`) and by loading
the live page in-browser and querying `document.querySelectorAll('script')`
— same result. The `#departments` and `#field-notes` sections that used to
be populated dynamically are now fully static, hand-written HTML baked
into `index.html` (4 dept-cards, 3 pinned-note testimonials, hardcoded).
Traced the cause: `Merge pull request #52 from Digital-Allies/site-overhaul-2026`
(`4838b4aa`, 2026-07-14) rewrote the homepage and dropped the Supabase
wiring that the 2026-06-26 `feat: connect static website to Supabase CMS`
commit had originally added. **This directly updates/supersedes the
2026-07-16 audit entry below** ("digitalallies.net IS connected to
Supabase") — that was accurate when written, but a same-repo merge two
days later silently reverted it and nobody re-checked live since. Not
flagging this as something to fix right now (Anthony may have intentionally
gone static in the overhaul) — just correcting the record so nobody trusts
the stale "connected" claim.

**Finding #2 — `learn/index.html` still loads `cms-loader.js`, but the live
copy of that script has been silently broken since 2026-07-16, so it's been
stuck on "Loading articles..." for every visitor for over a week.** Live
repo commit `f77d1596` ("Update Supabase anon key to new publishable key",
2026-07-16T17:04:21Z — a manual edit to the static site's key, unrelated to
the admin CMS) renamed the `SUPABASE_ANON_KEY` constant to
`supabase_anon_new` but left both references inside the `headers` object
(`apikey` / `Authorization`) pointing at the old, now-undefined name. That's
a top-level `ReferenceError` the instant the script parses — it throws
before the `DOMContentLoaded` listener (and its `try/catch`) ever
registers, so **the entire script never runs**: no settings/brand-color
apply, no services/testimonials fetch (moot now per Finding #1), no
contact-form wiring, and no articles fetch. Verified live via the actual
served response (`https://digitalallies.net/assets/js/cms-loader.js`,
byte-identical to the repo's `main` branch) and via
`document.getElementById('learn-articles-grid').innerHTML` on the live
page, which is still the unreplaced static placeholder: `"Loading
articles..."` / `"Cargando artículos..."`. **This directly answers the Aug
3–4 schedule item's "done when" — confirmed, not assumed: no, a post made
in the Press Office does NOT currently reach the live `/learn/` page,** for
a reason that has nothing to do with the CMS admin's own code (which is
fine) — it's a one-character-class typo in a completely different,
separately-deployed static-site repo.

**Also reconfirmed while in that file:** the escapeHtml/XSS fix built in
this monorepo's frozen copy 2026-07-20 (`sites/digitalallies/assets/js/cms-loader.js`)
was never ported to the live repo — the live `cms-loader.js` still builds
`innerHTML` from `title.en`/`desc.en`/`art.type`/etc. with zero escaping.
Same manual-port gap already tracked in `TODO.md`'s Backlog, now more
directly relevant since fixing the `ReferenceError` above would re-enable
that unescaped path for real published content.

**The fix itself is trivial** (rename the two `headers` references from
`SUPABASE_ANON_KEY` to `supabase_anon_new`, or rename the `const` the other
way — either restores the intended key) **but deliberately not applied by
this session.** `Digital-Allies/DigitalAllies` is a separate, live,
customer-facing production repo outside this scheduled task's scope
(`da-platform` only, per the task's own instructions) — pushing a fix
there, even a safe one-line one, isn't something to do autonomously in a
non-interactive session with nobody able to say yes. Flagging clearly here
instead. **Whoever picks this up next (Anthony directly, or an agent
session explicitly scoped to that repo) should fix both issues in the same
edit:** the `SUPABASE_ANON_KEY`/`supabase_anon_new` mismatch, and the
missing `escapeHtml()` wrapping (diff already sitting in `da-platform`
commit `6876c63` as the pattern to port, per `TODO.md`'s Backlog entry).

**Net effect on `BUILD-SCHEDULE.md`:** marked Wed–Thu Jul 29–30
(`/admin/projects`) superseded below, same as the other three. Mon–Tue Aug
3–4 (`/admin/content`) is now **investigated and answered** (the "done
when" question has a confirmed answer), but not "done" in the sense of
nothing left to do — the live bug above is real, outstanding work, just
not in this repo. Did not start Aug 5–6 (`/admin/pages`) — that's a
genuine, substantial feature build (code-view + real components), one task
per weekday per the schedule's own cadence, and today's slot was already
spent on the two items above.

**Verified:** no code in this repo changed this session (docs-only), so no
`tsc` run needed; `git status` clean before and after. All live-site
findings verified directly (live page console/network/DOM state via
browser tools, live repo source via `gh api`), not inferred from docs.

## 2026-07-22 — Atomic Finds: galaxy card rings restored, logo wired to settings, mobile card sizing fixed

Anthony reported a batch of visual regressions on the live (post branch-fix)
Atomic Finds deployment. Root-caused and fixed all five, committed to `main`
(`c75f1a4`):

- **Galaxy Card rings gone on mobile AND desktop** — root cause: successive
  "fix mobile ring overflow" commits earlier in the day added `overflow:
  hidden` to the card's own outer containers. The ring was only ever visible
  via its bleed *beyond* the card's box (the matching central area is
  correctly hidden behind the opaque card face) — clipping at the card level
  removed that bleed entirely, on every screen size, not just mobile. Fix:
  removed the per-card `overflow:hidden` (redundant — `.af-homepage`'s
  page-level `overflow-x:hidden` already prevents horizontal scroll) and the
  mobile `display:none` override. Verified live: ring now bleeds a real 76px
  beyond the card, clipped only by the intentional page-level container.
- **Header logo not data-driven** — `AtomicNav.tsx` hardcoded the logo image
  path with zero connection to `settings.logo_url`, unlike every other
  site's `Navigation` component. Wired `getSiteSettings()` into the Atomic
  Finds branch of `page.tsx` and threaded `logoUrl` through to `AtomicNav`,
  falling back to the static brand mark when unset. **Note:** queried the
  live `settings` table for Atomic Finds' `client_id` — it currently has
  **zero rows**, so nothing will visually change until Anthony populates
  settings via `/admin/settings` (or a settings row gets seeded).
- **Mobile product cards thin/off-center** — `ProductGrid`'s grid used
  `auto-fit, minmax(280px, 1fr)`, so cards stretched to fill their column
  instead of having a fixed width. Gave standard cards the same
  `clamp(280px, 90vw, 360px)` width as `GalaxyCard`, centered.
- **Photo-less products removed from view** — filtered products with no
  `image_url` out of both the standard grid and the featured Galaxy Card
  selection (temporary, until real photography is in — per Anthony).
- **Footer heart → DA brand signal dot** — replaced the pink heart emoji
  with DA's actual `--signal-red` (#C5301A) brand dot from
  `packages/design-system`, animated with the same pulse pattern as the DA
  logo's FAB dot (that dot is normally static per the design system's own
  "never animated" rule — this footer credit is the deliberate exception).

**Not changed / needs follow-up:** the "layout/ratios changing over time"
observation is likely the cumulative effect of the same-day iterative
ring/card sizing tweaks (700px→500px ring, etc.) rather than a single bug —
worth being more deliberate about touching these clamp() values going
forward rather than re-tuning repeatedly. Reviews still fall back to mock
(the `reviews` table migration still hasn't been run in Supabase — tracked
separately, unchanged by this session).

## 2026-07-22 (daily build session) — dashboard-backlog audit: `/admin/development` ("The Workshop") already fully built

Today's scheduled slot (Wed–Thu Jul 22–23) is the superseded Services/
Testimonials slot from the 2026-07-21 finding — nothing to do there. Per
this file's own "Next steps" #7, picked up the next real `BUILD-SCHEDULE.md`
item early: Week of Jul 27's `/admin/development` ("The Workshop"). **Same
pattern as the Services/Testimonials finding: the Anthony Vercel Toolbar
comments this schedule slot is based on are ~23+ days old and predate this
monorepo's Jul 6 import** (confirmed via `git log` — every file involved
traces to the single `c277733` import commit) — they describe an earlier,
unfinished state that's since been built out.

Checked each of the four specific complaints against the actual code:
- **"there is no login/out button"** — false now. `AdminShell.tsx` (the
  layout actually wired in `layout.tsx`) has a working `Sign Out` button
  calling `supabase.auth.signOut()`. Found a *second*, unused copy of the
  same logic in a dead `AdminNav.tsx` component (superseded by `AdminShell`,
  confirmed via grep — zero imports anywhere) — deleted it as a low-risk
  cleanup, `tsc --noEmit` clean.
- **"real notifications need to be built"** — false now. `AdminShell.tsx`
  has a real `notifications` table-backed bell with a live Supabase
  Realtime subscription (`postgres_changes` on INSERT) and a working
  mark-read action. Not a stub.
- **"cms needs to be connected to actual site - digitalallies.net"** —
  code-complete, one env var short. The Workshop's "View live site" link
  reads `NEXT_PUBLIC_SITE_URL` and falls back to `/` if unset
  (`AdminShell.tsx:121`) — and that var is genuinely still missing from the
  `da-webwssite-build-workflows` Vercel project, but that's **already
  tracked** as an open item in `TODO.md` Priority 4, not new work.
- **"doesn't work needs templates"** — unclear what this refers to for a
  dev-task tracker specifically (full CRUD works fine without a "template"
  concept); possibly a mis-transcription from a different tab. Not treating
  this as a real gap without more specific evidence.

**Spot-checked the other 3 dashboard-backlog items for the same staleness,
without doing full implementation passes** (that's out of this week's
scope) — worth knowing before anyone picks them up on schedule:
- **`/admin/projects`** — also traces to the `c277733` import commit; real
  `projects`/`project_tasks` tables + CRUD exist. Not deeply reviewed beyond
  that; still treat Wed–Thu Jul 29–30 as real until someone actually checks
  `ProjectsClient.tsx` against Anthony's specific complaint.
- **`/admin/content`** ("The Press Office") — also predates the import.
  **Two of its complaints are already resolved:** a "Templates" tab exists
  with 3 ready-to-use templates (Blog Post / Press Release / Case Study,
  `ContentClient.tsx:452-476`) covering all 3 content-type tabs; and
  articles saved here with `status: 'published'` **do** flow live to
  `digitalallies.net/learn/` — confirmed by reading
  `sites/digitalallies/assets/js/cms-loader.js:190-213`, which fetches
  `articles?client_id=eq.…&status=eq.published` directly and renders
  title/excerpt/type through the same `escapeHtml`/`parseBilingual` helpers
  fixed 2026-07-20. **Caveat, same one that already applies everywhere in
  this file:** `sites/digitalallies` here is the frozen one-time import —
  this confirms the *code* exists and is wired correctly in this copy, not
  that it's live on the actual `Digital-Allies/DigitalAllies` repo digitalallies.net
  deploys from. Don't mark this fully resolved without checking that repo.
- **`/admin/pages`** — **this one is a genuine, still-real gap, confirmed
  at the code level, not stale.** `PagesClient.tsx`'s live preview
  (`generatePreviewHtml()`, ~line 154) is a hand-rolled string of hardcoded
  inline-styled HTML per block type — the `services`/`testimonials` blocks
  render fake placeholder content ("Strategy Consulting", "Jane Doe, CEO")
  regardless of real data, not the actual `BlockRenderer.tsx`/design-system
  components the public site renders with. There's also no code-view/raw-
  HTML editing option anywhere in the file. Anthony's original complaint
  ("isn't meant for production... use actual components") is accurate as-is
  — treat the Aug 5–6 schedule slot as real, unlike the other three.

**Net effect on `BUILD-SCHEDULE.md`:** marked Mon–Tue Jul 27–28
(`/admin/development`) done below. Left Jul 29–30 and Aug 3–4 schedule
dates as-is (not confirmed complete, just flagged for a cheaper first-check
before building) — only Aug 5–6 (`/admin/pages`) is confirmed still fully
real work.

**Verified:** `npx tsc --noEmit` clean after the `AdminNav.tsx` deletion.
Did not start the dev server — the pages are all auth-gated behind
`/admin/login` and no credentials are available in this non-interactive
session; verification here is code-level (git history + grep + direct
reads), same standard the 2026-07-21 Services/Testimonials finding used.

Committed directly to `main` (small, low-risk: one dead-code deletion +
docs).

## 2026-07-22 — Fixed: public data fetches were permanently stuck on mock data (code bug, not config)

**A second, independent root cause**, found from a live Vercel runtime log after
the branch fix below was applied: `src/app/page.tsx` sets
`export const revalidate = 60` (ISR), but `getProducts()`/`getFeaturedReviews()`
in `data.ts` used the cookie-based Supabase client (`supabase-server.ts`).
Calling `cookies()` during a static-generation attempt makes Next.js throw its
internal `DYNAMIC_SERVER_USAGE` bailout signal — and the `try/catch` added for
the mock-data fallback was swallowing that signal before Next's own pipeline
could react to it. Net effect: **the homepage would permanently serve mock
product/review data on every build and every ISR revalidation, forever,
regardless of branch or env vars** — this would have kept failing even after
the Vercel branch fix above.

**Fix:** confirmed via the `products`/`reviews` RLS policies (`using (true)` —
pure public reads, no session dependency) that a cookie-free client is correct
here. Added `createPublicClient()` to `supabase-server.ts` (plain
`@supabase/supabase-js`, no `cookies()` call) and switched all of `data.ts`'s
public read functions to it. Admin pages keep using the cookie-based client
unchanged — confirmed via grep that `data.ts` was the only non-admin consumer
of it.

**Verified:** `tsc --noEmit` clean; `npm run build` — homepage now builds as
`○ (Static)` with working ISR, zero `DYNAMIC_SERVER_USAGE` errors; live local
run confirms real product data renders ("14 pieces available", real listings)
instead of the 4-item mock set. Reviews still fall back to mock, but that's
the **separate, already-tracked** issue below — the `reviews` table migration
has never been run in Supabase.

Committed directly to `main` (`52ff5ff`).

## 2026-07-22 — Root cause found: Atomic Finds production deploys from a stale branch, not env vars

**Not a Supabase key problem.** Anthony pulled a full Vercel env-var audit
across all 4 projects and confirmed via the Vercel Toolbar that
`atomic-finds-atx` deploys from `claude/products-table-review-fixes-doa26m`
(PR #4's branch) — never repointed to `main` after the PR merged at `b1ac668`.
`git log claude/products-table-review-fixes-doa26m..main` shows **22 commits**
of later work invisible to production: PR #5 cleanup, PR #7 mobile-responsive
+ Greptile a11y fixes, contrast/footer-credit fixes, and the mock-data
fallback in `data.ts`. That fully explains the missing cards/reviews/sections
Anthony was seeing — production was just running old code.

**Fix (dashboard-only, tracked in `tasks/anthony/TODO.md` Priority 0):**
repoint `atomic-finds-atx`'s Vercel Production Branch to `main`, redeploy.

**Also confirmed in the same audit:** `atomicfindsatx@gmail.com` (with the
"x") is the correct contact email — an earlier TODO.md reference without the
"x" was stale, now corrected. `healthcare-training-center`'s Supabase anon
key is still the old legacy JWT format, not yet verified broken but flagged.
`digital-allies`'s Vercel project has zero env vars despite reportedly
reading some Supabase tables — not yet root-caused.

## 2026-07-21 (evening) — Atomic Finds Mobile Responsiveness, Overflow & Fallback Mock Data

**Layout & Responsiveness Fixes:**
- **Stacked mobile curators layout**: Changed the curators grid (`.af-curators-grid`) to stack in a single column (`grid-template-columns: 1fr`) on screens under `560px` with a `32px` gap. This prevents curator bio text from clipping or overflowing on phone screens, keeping the design premium.
- **Fixed horizontal layout overflow**: Added `overflow-x: hidden` to `.af-homepage` in `atomic-finds.css` to prevent absolute-positioned elements (such as the `GalaxyCard` orbital rings) from causing horizontal scrolling and layout shifts.
- **Local mock data fallback**: Implemented a query fallback inside `src/lib/data.ts` to return mock data for products and reviews when remote database fetches fail (e.g. inside network-sandboxed local environments). This allows previewing pages locally.

---

## 2026-07-21 (evening) — Production outage resolved: Supabase keys rotated & Vercel env vars updated

**Outage summary:** CMS was returning 500 errors ("Your project's URL and Key are required to create a Supabase client!") since 2026-07-19.

**Root cause:** Missing Supabase authentication keys in Vercel environment variables. The `NEXT_PUBLIC_SUPABASE_ANON_KEY` and `SUPABASE_SERVICE_ROLE_KEY` were not present in the `da-webwssite-build-workflows` production environment.

**Fix applied (by Anthony):**
- Rotated Supabase API keys (new `supabase_anon_new` and `supabase_service_role_new` keys generated)
- Added `NEXT_PUBLIC_SUPABASE_ANON_KEY` to Vercel Production + Preview scope
- Added `SUPABASE_SERVICE_ROLE_KEY` to Vercel Production scope (server-side secret, not in Preview)
- Verified `NEXT_PUBLIC_SUPABASE_URL` is correctly set
- Updated SETUP.md with detailed key naming guidance and scoping requirements

**Status:** ✅ Ready to redeploy. Next deployment will activate the new environment variables and resolve all 500 errors.

**Documentation updated:** `SETUP.md` section 3b now includes detailed notes on Supabase key naming conventions and environment variable scoping to prevent this in future deployments.

---

## 2026-07-21 (evening) — Contrast fixes, DA footer credit, i18n architecture scoped

**Contrast improvements (WCAG AA compliance):**
- Changed all non-accent body text to white (#ffffff) from low-contrast CSS vars:
  - Section descriptions (collection, process): `var(--fg-body)` → white
  - Footer copyright text: `var(--fg-soft)` → white
  - Curator roles, review dates/tags, contact subtitles, social links: `var(--fg-muted)` → white
  - Delivery stat labels: `var(--fg-muted)` → white

**Digital Allies footer credit:**
- Added "Website made with love by Digital Allies 🩷" below copyright
- "Digital Allies" text links to https://digitalallies.com (gold color on hover)
- Heart emoji (#F5A4C7, DA light pink) pulses with 2-second animation (scale 1→1.15)
- New CSS classes: `.af-footer-credit`, `.af-da-heart` with `@keyframes af-pulse`

**Bilingual system scoped (i18n):**
- Created `I18N_SYSTEM_PLAN.md`: comprehensive architecture for EN/ES bilingual sites
- Covers: next-intl integration, translations table schema, admin dashboard, language switcher UX, SEO (hreflang, sitemap, robots.txt), WCAG accessibility, Phase 1 (MVP on Atomic Finds) and Phase 2 (rollout) timelines
- Ready for implementation when prioritized; enables all three sites (DA, HCTC, AF) to offer Spanish versions

All changes verified TypeScript-clean, committed to `feat/atomic-finds-mobile-responsive`.

## 2026-07-21 (evening) — Mobile responsive Greptile review fixes

Fixed all 4 Greptile review issues on PR #7 (feat/atomic-finds-mobile-responsive):

- **Issue 1 — Closed menu keeps invisible focus targets:** Added `aria-hidden={!open}` and `inert={!open}` to nav panel to remove closed menu from accessibility tree and tab order.
- **Issue 2 — Panel starts inside sticky navigation:** Adjusted `.af-nav-links` `top` position from 60px to 80px to account for mobile nav height (~48px logo + 12px padding top/bottom = 72px).
- **Issue 3 — Responsive shell clips fixed content:** Increased GalaxyCard height clamp from `clamp(400px, 120vw, 520px)` to `clamp(520px, 140vw, 620px)` to prevent text clipping; made all text sizes responsive with clamp(); reduced padding at mobile; reduced description line clamp from 3 to 2 lines.
- **Issue 4 — Row gap smaller than ring overhang:** Increased `.af-featured-root` row gap from 60px to 120px at mobile breakpoint (≤640px) to prevent orbital rings from overlapping.

All changes TypeScript-verified clean. Commit pushed to `feat/atomic-finds-mobile-responsive`.

## 2026-07-21 (cont'd) — Atomic Finds ATX bespoke homepage, Galaxy Card, reviews system

Continuation of the same-day commerce build below, on the same branch/PR #4
(still a draft — Anthony asked to hold merge until he's reviewed the design
match). Scope corrected mid-session: Anthony clarified the "flexible
conversion layer" scope was about how the product grid/checkout *functions*,
not the whole homepage — the actual ask is a homepage that mirrors the
approved Claude Design homepage (Claude Design project `29110ac3-0a76-4fa1-
a322-a78bc212a50d`) closely enough to show the client for the first time.

- **`AtomicFindsHomepage.tsx`** (new, ~300 lines) — full bespoke homepage
  (hero, about, shop grid via `ProductGrid`, curators, 3 featured Galaxy
  Cards, process, reviews, contact, text band, footer) with real copy from
  the design handoff. Special-cased in `src/app/page.tsx` by
  `ATOMIC_FINDS_CLIENT_ID` so it bypasses the generic `BlockRenderer` — see
  that file's comment for why. Wrapped in `<SiteTheme>` (see bug below).
- **`GalaxyCard.tsx`** (new) — production port of the signature orbital-ring
  featured-product component; quick-view dialog CTA now goes through
  `resolveProductCta()` instead of the reference's hardcoded "Add to Cart".
- **Reviews system (reusable, not Facebook-only):**
  `20260122000000_reviews_table.sql` (new `reviews` table — `source` is a
  free-text field, default `'other'`, editable per row, NOT hard-coded to
  Facebook) + `seed-atomic-finds-reviews.sql` (19 real reviews from
  Jennyfer's Facebook Marketplace profile, `source='facebook'`, 6 featured)
  + `getFeaturedReviews()` in `data.ts` + full admin CRUD at
  `/admin/reviews` with a `<datalist>` of source suggestions.
  **Not yet run in Supabase** — Anthony already ran the commerce-fields
  migration + catalog seed, but these two reviews files came after that and
  are still pending.
- **`src/styles/atomic-finds.css`** (new) — full token + section CSS scoped
  under `.af-homepage`, ported from the design handoff.
- **Bonus fix, pre-existing, site-wide:** `tools/build-workflows` had no
  `postcss.config.js`, so Tailwind's `@tailwind` directives were never
  processed by Next's build pipeline — every `@tailwind`-derived utility
  class was silently a no-op across the *entire* app, not just this build.
  Root-caused via `getComputedStyle` (classes present, styles absent) and
  fixed by adding `postcss.config.js` (`tailwindcss` + `autoprefixer`).
- **Other real bugs found + fixed via Playwright visual verification:** a
  CSS specificity bug (`.af-homepage a` outranking single-class button
  rules, making hero CTA text invisible — fixed with `:where(a)`); quick-view
  modal `z-50` rendering below the sticky nav's `z-index: 100` — fixed to
  `z-[200]`; modal CTA text clipping in the narrow detail column — fixed by
  stacking price/CTA vertically instead of one crowded row.
- **Verified:** visually confirmed every homepage section against the
  approved design via a temporary local route + Playwright screenshots
  (route deleted before commit — not part of the shipped diff); `tsc
  --noEmit` clean; `next build` succeeds end-to-end with the full route
  table (`/admin/products`, `/admin/reviews`, homepage, etc.), zero errors.
- **`sites/atomic-finds/README.md`** rewritten to reflect the actual live
  build location and commerce architecture instead of only listing design
  deliverables.
- **Still open:** run the two reviews SQL files in Supabase (see above);
  native on-site checkout intentionally still unbuilt (decision #8);
  cart/deep-linking beyond `#contact` not yet built.

## 2026-07-21 — Atomic Finds ATX storefront: components, admin Showroom, commerce schema

The e-commerce build (decision #8 below) shipped on branch
`claude/products-table-review-fixes-doa26m` (PR #4's branch), on top of the
merged products table (PR #1, applied to live Supabase by Anthony — both
SQL runs verified):

- **Migration `20260121000000_products_commerce_fields.sql`** — adds the
  design-catalog fields (`sku`, `category`, `tagline`, `badge`, `in_stock`,
  `origin`, `era`, `dimensions`) plus the flexible conversion layer:
  `selling_state` ('listing' | 'inquiry' | 'direct' | 'checkout') +
  `cta_label`; makes `external_url` nullable. Additive + safe to re-run.
  **Not yet run in Supabase** (Anthony: SQL editor, then the catalog seed).
- **`src/lib/commerce.ts`** — `resolveProductCta()`: the ONE place CTAs
  resolve (label + destination per selling state, provider-agnostic). A
  future checkout provider slots in by extending this function only.
- **`ProductGrid.tsx`** (site component, client leaf) — cards + category
  tabs + quick-view modal per `design_handoff_product_grid` spec: null-image
  "Photo coming soon" state, Sale/Featured badges, "Inquire" price state,
  2-line title clamp, seller trust line. Styled entirely from `--tok-*`
  theme vars, so it's reusable by any commerce client. Wired into
  `BlockRenderer` (`case 'products'`, fetched in parallel) and into the
  Pages builder (add-button, preview, title field).
- **Admin "The Showroom"** (`/admin/products` + nav) — full CRUD for
  non-technical product management, Services-module pattern: ordering,
  sale pricing, photo URL, category, in-stock/featured, and a "How it
  sells" section choosing the selling method per product.
- **`seed-atomic-finds-catalog.sql`** — the 10 photographed design-catalog
  pieces (SKUs AF-002…AF-014, prices from the design's catalog JSON) as
  `inquiry` products; photos shipped at
  `tools/build-workflows/public/atomic-finds/products/` (14 files). The 4
  Marketplace rows stay `listing` — 14 items total, both CTA states live.
  Idempotent (delete-by-client+SKU first).
- **Theme sync:** ATOMIC_TOKENS heading font → Bagel Fat One (+ Pacifico
  import) matching the synced `sites/atomic-finds/CLAUDE.md`.
- **Verified:** `tsc --noEmit` clean; full `next build` succeeds with
  `/admin/products` in the route table.
- **Still open:** 4 photos without data rows (lamp-01, bookshelf-03,
  peacock-05, bamboo-armchair-09 — need titles/prices, add via Showroom);
  contact form as the inquiry destination is `#contact` — fine on pages
  with a contact block, revisit deep-linking later; cart/checkout remains
  deliberately unbuilt (foundation only, per decision #8).

**Week of July 13 Core Tasks Completed:** Dynamic block renderer (`BlockRenderer.tsx`), root dynamic catch-all pages (`[slug]/page.tsx`), and contact form block integration in the page editor + renderer are fully implemented and verified. Next.js compiles with zero errors.
Prior: Mobile login layout fixed + Step 2 client theming finished with Google Fonts loaded and CSS scope overrides.

## 2026-07-21 — `sites/atomic-finds` cleanup, theme-engine scope, and a real finding on PR #4

- **`sites/atomic-finds` cleanup** ([PR #5](https://github.com/Digital-Allies/da-platform/pull/5)): removed 381 tracked files — three superseded generations of the design system, two abandoned scroll-hero prototypes, a standalone Galaxy Card prototype with unused scaffold Supabase functions, dev screenshots, and image-gen scratch output. Verified via grep before removal that nothing in `tools/build-workflows` or the canonical `design_handoff_homepage/` referenced any of it. Kept: `CLAUDE.md`, `design_handoff_homepage/` (canonical), `assets/` (still holds the raw Marketplace product photos needed for `products.image_url`, though some subfolders in it look prunable in a follow-up pass), and the Master Setup Doc (has real owner contact info/review themes not fully verified elsewhere — held for a human read rather than auto-removed).
- **Theme engine scoped, not built**: `tools/build-workflows/THEME_ENGINE_PLAN.md` — plan to make per-client site theming admin-editable by extending the existing `settings` table (which already has a disconnected, unused `brand_color` field) rather than adding a new table, with `theme.ts`'s hardcoded `TOKENS_BY_CLIENT` becoming the seed/fallback instead of the source of truth.
- **⚠ Open question — Atomic Finds frontend diverged from `main`:** storefront implementation appears only in draft [PR #4](https://github.com/Digital-Allies/da-platform/pull/4) (branch `claude/products-table-review-fixes-doa26m`). The `atomic-finds-atx` Vercel production alias appears to be deploying that branch rather than `main` — confirm Production Branch in Vercel Settings → Git before doing responsive/mobile work.

## 2026-07-21 — daily build session: `ARCHITECTURE.md` backfilled

Ran the scheduled Tue Jul 21 `BUILD-SCHEDULE.md` item (the Day-04 doc that's
been outstanding since 2026-07-09). No `[Anthony]` blockers applied — this
was a standalone docs task.

- **`tools/build-workflows/ARCHITECTURE.md` written** from the CMS Build
  Plan's original Vercel/architecture layout, reconciled line-by-line against
  the actual `src/` tree rather than transcribed from the plan doc as-is (per
  CLAUDE.md's "trust the code over old notes" rule — and it paid off, see
  next item). Covers stack, multi-tenancy model, full route structure, the
  data layer (and where it diverges from the original `lib/store.ts` design),
  the content model/schema, the block-registry renderer, and the auth
  middleware. `npx tsc --noEmit` clean (docs-only change, no code touched).

- **Real finding, not just a writing exercise: the Services/Testimonials
  admin module already exists.** Both `STATUS.md` (Major need #4) and
  `BUILD-SCHEDULE.md` (Week of Jul 20, Wed–Thu Jul 22–23 slot) describe this
  as unbuilt — "CMS admin has no Services/Testimonials module... editing
  needs raw SQL." That's stale. `src/app/admin/(protected)/services/page.tsx`
  ("The Departments") and `.../testimonials/page.tsx` ("Field Notes") are
  full CRUD UIs — add/edit/delete/reorder, wired to the real `services`/
  `testimonials` tables (`client_id` + RLS), linked in `AdminNav.tsx`. `git
  log` shows this predates even this monorepo's Jul 6 import — it's not new
  work landing unnoticed, it's been there the whole time and the docs never
  caught up. **Action taken:** the Jul 22–23 schedule slot below is marked
  superseded; don't pick it up as originally scoped. Full detail + the one
  narrower gap that's still real (the *static* `sites/digitalallies`
  `cms-loader.js` HTML-escaping port, a different codebase entirely) is in
  `ARCHITECTURE.md`'s "Correction to STATUS.md" section — read that before
  touching this area again.

## 2026-07-20 — daily build session: two Mon Jul 20 code fixes shipped

Ran the scheduled Mon Jul 20 `BUILD-SCHEDULE.md` item. All four `[Anthony]`
items for today (security-fixes.sql, leaked-password protection, the
2026-07-17 audit confirmations, PR #1 review/merge) are dashboard-only —
none blocked the two `[Agent]` items, so both were done independently:

- **Escaped HTML in `cms-loader.js`'s card-building code**
  (`sites/digitalallies/assets/js/cms-loader.js`). Centralized the fix in
  `parseBilingual()` (added an `escapeHtml()` helper it now runs both
  language variants through, since every caller interpolates the result
  into `innerHTML`) plus three direct call sites that bypassed it
  (`svc.icon`, `art.type`, `art.slug`). Verified the escaping itself with a
  quick node check (`<script>`/`onerror` payloads come back neutralized)
  and verified the page still renders with no console errors by serving
  the static files locally and checking in-browser.
- **Removed the dead `tailwind.config` block** — turned out to be site-wide,
  not just `index.html` as STATUS.md previously scoped it: **13 of 15**
  HTML files in `sites/digitalallies` had the block (two single-line
  variants in `learn/dept-cooperation.html` and
  `learn/self-governing-bureau.html`, the rest multi-line), and **none** of
  the 15 load the Tailwind CDN script that would make `tailwind.config`
  a defined global — every page was throwing a `ReferenceError` on load.
  Removed all 13, verified in-browser (multi-line and single-line variants
  both spot-checked) that styling is untouched (site is precompiled/
  self-hosted Tailwind, `tailwind.min.css` doesn't need the config) and the
  console is clean.

**⚠ Important caveat, don't skip past this:** `sites/digitalallies` in this
monorepo is the frozen one-time import noted in the 2026-07-16 audit below
(`git log` confirms exactly one commit ever touched these files — the
import itself, `2a84e5c`) — it is **not** the source the live
digitalallies.net deploys from (that's the separate
`Digital-Allies/DigitalAllies` repo). So these two fixes are real and
verified *in this repo's copy*, but **won't take effect on the live site**
until Anthony manually ports them to `Digital-Allies/DigitalAllies` — same
pattern as the Supabase-data and duplicated-`<html>` fixes he applied
directly there on 2026-07-16. Added as a new checklist item in `TODO.md`.

Both fixes got auto-committed and pushed by the 15-min sync script mid-session
(`chore: sync MM23 2026-07-20 16:48`, `6876c63`) before a descriptive commit
message could be written — noting the real "why" here since the commit
message itself doesn't carry it.

**Not started, correctly so:** the next `[Agent]` item in schedule order is
Tue Jul 21's `ARCHITECTURE.md` backfill — left for tomorrow's scheduled run
rather than front-run today, per the one-task-per-weekday cadence.

## 2026-07-19 — admin login: real bug found, after a wrong first guess

**✅ Login confirmed working, no reset needed after all** — Anthony logged
in fine on both domains shortly after. The password reset flow built above
is still a real, permanent gap-fill (there genuinely was no way to trigger
one before), just turned out not to be needed in the moment.

**"Malformed placeholder" mystery resolved — not a regression.** Checked
Vercel Toolbar comments on the admin deployment: 10 comments, all posted by
Anthony (`cassellac`) **~23 days before this entry** (i.e. well before the
Jul 10 monorepo switch), 3 marked resolved and 7 still open. These are
Anthony's own notes that large parts of the admin dashboard were
placeholder/unfinished from early on — nothing was lost or regressed in
the repo switch, it's the same known gaps, still open:

- `/admin` (Dashboard): ~~"dashboard is not wired to real data"~~,
  ~~"fake numbers"~~ — both resolved.
- `/admin/development` ("The Workshop"): **open** — "doesn't work needs
  templates"; "cms needs to be connected to actual site - digitalallies.net";
  "real notifications need to be [built]"; "there is no login/out button."
- `/admin/projects`: **open** — "doesn't work and need to build actual
  project templates."
- `/admin/content` ("The Press Office"): **open** — "needs to include
  templates for all category tabs as well as connect to the primary site
  for posting in the same format as the digitalallies.net/learn/ page
  articles."
- `/admin/pages`: **open** — "this build isn't meant for production — new
  pages should offer a code option with live preview and use actual
  components for elements, sections, cards, etc."
- `/admin/research`: ~~"doesn't work needs templates"~~ — resolved.

**These are real code tasks, not Anthony-dashboard clicks** — belongs here
in STATUS.md's backlog, not `TODO.md`. Not started; needs prioritization
before picking any of these up (see Next steps).

Anthony reported `/admin/login` broken and the Vercel project possibly not
re-pointed to the monorepo. **First pass got it wrong — corrected here
rather than left standing:** claimed the Vercel Git connection was still on
the old disconnected repo and that this explained a "redirect away from
/admin/login." Neither held up. Anthony's own screenshot plus Vercel's
deployment history show the project has been correctly connected to
`Digital-Allies/da-platform` since Jul 10, auto-deploying successfully ever
since. The "redirect" was a misread of a browser tool's output (it reports
tab origin, not full path) — the login page was rendering the whole time.
Lesson: verify by reading the actual page/response, not by trusting a
tool's summary line.

**The real bug, found by actually submitting the live form:** it returned
a genuine Supabase error, **"Legacy API keys are disabled."** The anon/
service-role key values baked into this deployment were still legacy-
format, despite the Vercel↔Supabase integration badge being present on
those variables — the integration hadn't actually re-synced after legacy
keys got disabled. **Fixed by Anthony:** manually updated both to current
Publishable/Secret values.

**✅ Verified fixed, same session:** the docs-correction commit triggered
a fresh deployment; once it showed READY, re-submitted the live login form
with a deliberately wrong password. The error changed from "Legacy API
keys are disabled" to "Invalid login credentials" — the correct behavior
of a working auth system, confirming the key fix actually took effect.
Also confirmed in that same test: the login page now shows "DIGITAL
ALLIES" instead of the generic fallback business name, and
`cms.digitalallies.net` is now a live alias on this deployment — the
domain connection Anthony was setting up completed successfully.

**Also surfaced:** `NEXT_PUBLIC_SUPABASE_URL`, `CONTACT_FORM_TO_EMAIL`,
`RESEND_API_KEY`, `NEXT_PUBLIC_CLIENT_ID` on this project are manually-
entered, not integration-synced — and, worth being explicit about since it
came up directly: **Vercel env vars have no connection whatsoever to the
repo's `.env.local`.** Pushing commits never syncs them; `.env.local` is
gitignored and Vercel wouldn't read it for its own config even if it
weren't. Full detail in `TODO.md` Priority 1.

- **`cms.digitalallies.net`'s root now redirects to `/admin/login`** instead
  of showing the generic "My Business"/"Welcome" fallback — fixed in code,
  scoped to that hostname only (verified locally against a spoofed `Host`
  header), pushed to `main`. This part of the diagnosis was correct.
- **Backlog idea captured, not scheduled:** per-site document storage in
  the admin (contracts/invoices/client uploads) — see `TODO.md`'s new
  Backlog section.

## 2026-07-17 — Atomic Finds catalog, Vercel/Supabase audit, tooling additions

- **Atomic Finds product catalog started.** PR
  [#1](https://github.com/Digital-Allies/da-platform/pull/1) adds a
  `products` table (same client_id + RLS convention as
  services/testimonials), a `getProducts()` data function, and seeds 4 real
  listings from Jennyfer's (Atomic Finds owner) Facebook Marketplace
  catalog — real data, not placeholders. Not merged/applied yet — the
  migration + seed are files to review and run in the Supabase SQL editor,
  nothing touches the live DB automatically. Still needed: a 5th product
  (cut off mid-paste), real product photos (`image_url` is null for all
  four on purpose), and the frontend catalog components (still being
  designed). Full checklist: `tools/build-workflows/tasks/anthony/TODO.md`
  Priority 5.
- **Reality check on Atomic Finds, since it came up directly:** there is no
  live Atomic Finds site. What exists in `sites/atomic-finds` is a design
  system/component showcase, a few standalone prototypes (Galaxy Card,
  scroll-hero experiments), and planning docs — not a built product site.
  **Treat the "v3 layered rebuild — APPROVED" note and the Celestial Scroll
  Hero write-up further down this file with caution** — when asked
  directly, Anthony did not recognize those as things he'd signed off on.
  Don't take "APPROVED"/"CONFIRMED" language elsewhere in this file at face
  value going forward; confirm with Anthony before treating a past
  session's characterization of a decision as settled.
- **Read-only Vercel/Supabase audit (Claude in Chrome) found real gaps** —
  full list + exact fix steps in `TODO.md` Priority 4. Highlights:
  `da-webwssite-build-workflows` is missing `NEXT_PUBLIC_SITE_URL` entirely;
  `healthcare-training-center`'s Supabase keys are manually-pasted, not
  integration-managed; two duplicate Supabase key pairs exist
  ("default" + "supabase_anon_new"/"supabase_service_role_new"); new
  per-site Resend keys (generated after the shared one was flagged
  compromised) exist only in local `.env.local`, not in Vercel yet.
- **Standing constraint, not a bug:** we're on free-tier Vercel/Supabase.
  Vercel's Supabase integration caps out at 2 connected projects, already
  used. Any additional Vercel project (HCTC now, Atomic Finds once it gets
  one) needs its Supabase keys pasted in by hand, and **every future key
  rotation has to be manually repeated on those non-integration-managed
  projects** — they won't self-update. Checklist is in `TODO.md` Priority 4.
  Resolves itself once there's revenue to justify the paid tier; not worth
  re-architecting around in the meantime.
- **`cms.digitalallies.net` domain connection in progress** (Anthony,
  2026-07-17) — steps in `TODO.md` Priority 4.
- **Greptile added for code review** (Anthony, 2026-07-17) —
  `https://app.greptile.com/digital-allies/`. Review findings on this repo
  now come through Greptile directly to the agent, in addition to whatever
  review happens in-session.
- **Clarified: da-platform's `sites/` folders are sometimes used for
  general storage, not only build source** — e.g. the
  `healthcare-training-center/review/Caladrius Brand Review - Standalone.html`
  file flagged as a mystery on 2026-07-16 was intentional (Anthony). Don't
  treat every unexpected file in a site folder as a bug — the actual
  stray-file problem this file has tracked (loose numbered downloads
  dumped at a project's *root*, e.g. the `magical-village-assets (N).png`
  pattern found in other projects) is a different, narrower thing than
  Anthony deliberately parking a reference doc in a subfolder.

## 2026-07-16 audit — what changed since Jul 9

A full stock-take of this file against live reality, prompted by Anthony
noticing digitalallies.net was serving placeholder Supabase content. Findings:

- **digitalallies.net and the CMS admin engine are two separate Vercel
  projects — this file previously conflated them.** Confirmed via Vercel's
  API (team `digital-allies`):
  - **`digital-allies`** project → `digitalallies.net` / `www.digitalallies.net`.
    This is the static marketing site (source repo: the separate GitHub repo
    `Digital-Allies/DigitalAllies`, **not** this monorepo — `sites/digitalallies`
    here is a one-time historical import from `2a84e5c`, frozen at import
    time, with no commits since. Don't treat it as source of truth for this
    site; it's stale.
  - **`da-webwssite-build-workflows`** project → the Next.js CMS admin engine
    (`tools/build-workflows`). This is the one still connected to the wrong
    repo (`cassellac/da-webwssite-build-workflows` instead of
    `Digital-Allies/da-platform`) — see Major needs #2 below.
- **`digitalallies.net` IS connected to Supabase** (the line below claiming
  otherwise is stale — removing it). A Claude-in-Chrome session found the
  `services`/`testimonials` tables held generic placeholder demo rows
  (fake departments, fake testimonials, Lucide icon *names* rendering as
  literal text because `cms-loader.js` only knows emoji) and replaced them
  with the real bilingual copy from the live site. While verifying, that
  session also found the live `index.html` had the **entire document
  duplicated** (two `<html>`/`<head>`/`<body>`), which silently broke the
  EN/ES toggle site-wide via a `LanguageController` redeclaration
  `SyntaxError`. Anthony fixed both the Supabase data and the duplicated
  HTML directly on the live repo since then. **Verified live just now:** no
  console errors, real content renders, EN/ES toggle correctly re-translates
  the page (checked index, privacy.html, /learn/).
- **Auto-sync + health-check automations were silently broken since Jul 7,
  fixed this session.** A Jul 7 reorg moved the working scripts into
  `projects/air-setup/` but the already-installed launchd plists on this Mac
  still pointed at the old flat `projects/sync.sh` / `projects/sync-health.sh`
  paths, which didn't exist — every 15-min sync and 3-hr health check failed
  immediately (exit 127) for 53+ hours (last successful auto-commit before
  the fix: Jul 14 02:18). Fixed by copying the working scripts into the flat
  path and reloading the launchd jobs; a fresh sync commit landed immediately
  after. `db-backup-reminder` (Saturdays 9am) was also pointed at a missing
  script but is calendar-scheduled so hadn't audibly failed yet — fixed the
  same way.
- **`cms-suite/` was a misplaced nested repo** (its own git history, pointed
  at `github.com/cassellac/cms-suite`) sitting untracked inside da-platform's
  root, picked up once as an accidental gitlink by the broken auto-sync
  script. Moved to `~/Claude/projects/cms-suite/` (its own project folder,
  history intact), the accidental gitlink commit reverted, and it's now
  gitignored here so it can't recur.

## Atomic Finds — Celestial Scroll Hero (2026-07-08)
- **What:** the scroll-scrubbed hero of the AF owner (celestial-70s styling) was
  rebuilt from the ground up. Root cause of the old "not smooth" + "photos 4/5/6
  cropped" complaints: it crossfaded transparent *cutouts* on separate sky
  gradients at `object-fit: contain`. New build scrubs the original full 2K frames
  as **full-bleed `cover`** with a continuous camera push-in + lerped progress +
  snappy dissolves (breedlove.xyz-style). Both issues fixed, verified in-browser.
- **Deliverables:** HTML component `sites/atomic-finds/scroll-animation-hero-component/celestial-hero.html`
  (canonical, framework-free); React port `tools/build-workflows/src/components/site/CelestialScrollHero.tsx`
  (typechecks clean; frames in `public/celestial-hero/`); web-optimized frames
  `assets/kai/web/frame-1..7.jpg` (~400 KB ea, from 5 MB masters); registered in
  `atomic-finds-design-system/_ds_manifest.json`; full doc `COMPONENT.md`.
- **Configurable** (one component, three uses per Anthony): `mode` = hero / about /
  social; ending = smile / playful; screens, push, mist, and all copy as props.
- **Two open items for Anthony** (in `COMPONENT.md`): (1) to go fully silky, add
  identity-locked in-between frames — engine handles any count;
  (2) **font conflict** — CLAUDE.md says Lilita One/Tilda Script, but the AF
  design-system package ships Recoleta/Bromello. Component consumes the token vars
  w/ fallbacks so it renders either way, but the brand needs one source of truth.

### v3 layered rebuild — status disputed, see 2026-07-17 note above
**⚠ 2026-07-17: Anthony did not recognize this as something he'd approved
when asked directly — do not resume this plan as-is without checking with
him first.** Leaving the original write-up below for reference only.

The user decided v2's flat full-bleed photos lost the "she's moving THROUGH the
clouds" feeling, and approved a **v3 layered rebuild**: character cutout +
multi-rate cloud parallax + foreground wisps that partially occlude her +
independently-animated constellation disc + dozens of AI in-between frames.
- **Approved plan (full detail):** `~/.claude/plans/cheerful-waddling-meteor.md`
- **Done so far:** 7 of 9 keyframe cutouts already existed as real-alpha `pose-*`
  files, copied to `assets/kai/cutout-A/1b/2/3/4/6/7.png`.
- **Next:** cutouts for frame-1 + frame-5, disc extraction, 3 wisp sprites,
  in-between generation (gated pilot first), then rebuild `celestial-hero.html`
  + `CelestialScrollHero.tsx` with the layer stack, then verify in preview.
- **Jenny Breedlove Hero (2026-07-10):**
  - **What:** Completed the Breedlove-inspired scroll animation hero for Jenny using her 7 portrait frames. Added snappy dissolves, zoom push-in, grid lines, vertical Nominee badge, corner metadata text, and a Day/Night theme toggle (Night mode: #0c0b0f background/neon-gold text; Gold mode: #211917 background/sunset-copper text/scrim overlay).
  - **Deliverables:** Scoped Duda-compatible code blocks (HTML/CSS/JS) and standalone preview workspace in `sites/atomic-finds/scroll-animation-hero-2/index.html`. Written walkthrough details in `walkthrough.md`.
  - **Status:** Done. Dev server launched on port 8080.
- **Image tooling:** nano-banana is DEAD (retired Gemini model → 404). Use
  **higgsfield** (Pro trial active — prioritize) or **openart** for generation;
  Adobe `image_remove_background` works for one-off cutouts (manual picker only).
  `sips -Z` (no `-s format`) preserves alpha. Character must follow the guidelines
  in the scroll-animation-hero-component directory.

## Automation + ops (2026-07-06, repaired 2026-07-16)
- **Sync health monitor installed.** `../sync-health.sh` + launchd agent
  `com.digitalallies.sync-health` (every 3 hr) reads the sync logs, walks every
  repo, and **notifies only on problems** (stale sync, push failures, stuck git
  locks, oversized tracked files, missing remotes). Details + known issues:
  `../SYNC-NOTES.md`. Run `./sync-health.sh` anytime (read-only).
- **2026-07-16: found and fixed a silent 53+ hour outage.** A Jul 7 reorg
  moved the working sync/health scripts into `projects/air-setup/`, but the
  launchd plists already installed on this Mac still pointed at the old flat
  `projects/sync.sh` / `projects/sync-health.sh` paths — neither existed, so
  every scheduled run failed instantly (exit 127) from shortly after Jul 7
  until this fix. Confirmed via `launchctl list` (exit 32512) and the git log
  (`chore: sync MM23` commits stopped dead at Jul 14 02:18). Fixed by copying
  `air-setup/{sync,sync-health,db-backup-reminder,maintenance-status}.sh` into
  the flat `projects/` path the plists expect, then `launchctl unload`/`load`
  on all three agents. Verified: a fresh sync commit landed within seconds of
  the reload. **Note for whoever bootstraps the MacBook Air later:**
  `air-setup/bootstrap-air.sh` is still the right tool for that machine —
  this fix only addressed the already-installed agents on this Mac (Mini/MM23).
- **Fixed:** cleared 11 stale git `*.lock` files across repos that were silently
  blocking commits (cms-suite + 9 HEAD.lock from a Jun-15 batch op + 1 packed-refs).
- **Known ops issues** (tracked in `../SYNC-NOTES.md`): headless GitHub auth
  dropped ~2 hrs this morning then recovered; `atomic-finds` remote half-wired
  (no `main`, LFS errors); 3 tracked files ≥49 MB should move to Git LFS.
- **The dated plan for the remaining build is `BUILD-SCHEDULE.md`** (backlog
  hardening Jul 7–10, then Week 4 / Days 16–20 Jul 13–17 to Phase 1 launch).

---

## Decisions locked (do not re-litigate without a written reason)

1. **Repo structure = ONE monorepo.** `Digital-Allies/da-platform` is the single
   source of truth. The old individual repos still exist on GitHub but are
   **archive/backup only — do not commit to them.** Originals also sit in
   `../archive/pre-monorepo/`. Rationale: the multi-tenant model needs one shared
   codebase, not one repo per site.  **Confirmed by Anthony 2026-07-06.**
   (**Caveat, 2026-07-16:** this decision's "private" framing was wrong in
   practice — the repo was actually public on GitHub until fixed that day.
   Verify security-sensitive claims like this against the live GitHub
   settings rather than trusting this file, which is exactly how that drift
   went unnoticed.)
2. **The model = one Platform, three faces per client.** Build the engine once;
   each client is configured, not rebuilt. Faces: **Admin** (their login +
   workspace), **Brand** (their tokens), **Website** (their pages). The Website
   face has two tiers: **Templated** (engine renders it) or **Connected** (their
   own site, fed by the CMS). Full model + naming: `tools/build-workflows/PIPELINE.md`.
3. **Repo ≠ deployment.** One codebase, many Vercel deployments — one per client,
   each with its own `NEXT_PUBLIC_CLIENT_ID`. That is how each client gets their
   own admin + site. Isolation is `client_id` + Supabase RLS.
4. **Canonical CMS = the Next.js engine** in `tools/build-workflows/src/`. The
   older static `dashboard.html` prototype is reference only.
5. **Design source of truth =** each site's `sites/<site>/CLAUDE.md` +
   `packages/design-system`. (The DA "concierge" brand board was a full-circle
   aside, not the palette — DA palette is `#2D2D2D` charcoal / `#C5301A` red.)
6. **Plan order:** the **30-Day Run** (`tools/build-workflows/tasks/Claude Code -
   Build Sequence.md`, the markdown twin of `Connected CMS - 30-Day Run.html`) is
   the **order of operations**. The **CMS Build Plan** (`CMS Build Plan.html`) is
   the **architecture reference** — what to build, not when. Follow the order;
   don't skip or reorder without a written reason.
7. **Websites are per-client; the admin can be DA-branded** (Anthony, 2026-07-06).
   - **Public websites MUST each use their OWN design system** — a client site
     must NEVER look like Digital Allies. Non-negotiable ("clients, not my
     children"). Full per-client tokens (colors/fonts/radius/etc.) from
     `sites/<site>/CLAUDE.md` drive the public renderer. (HCTC = navy/teal +
     Montserrat; Atomic Finds = celestial-70s dark.)
   - **The admin/CMS panel may stay Digital Allies-branded for ALL clients** — it
     is the tool; one consistent look is fine. Per-client white-label admin is an
     OPTIONAL future capability (plan-gated, likely agency tier), not required now.
   - Net: per-client theming work is scoped to the **public site renderer only**,
     not the admin. Less work than theming both.
8. **Atomic Finds ATX = priority build + the platform's e-commerce proving
   ground; conversion layer stays flexible** (Anthony, 2026-07-21).
   - The client is **Atomic Finds ATX** (use that name). It is prioritized
     alongside digitalallies.net as the most real client-like use case — the
     commerce patterns built for it (product cards, quick-view modals,
     cart-capable foundation, admin product management) must be **reusable for
     future clients**, not one-offs.
   - **E-commerce-READY, not checkout-committed.** Sales complete off-site
     today (Facebook Marketplace links, direct payment, inquiry coordination)
     and the conversion path may vary per product. Quick-view modals instead of
     separate product pages for now.
   - **No provider-specific (e.g. Stripe-specific) assumptions** in UX, CTA
     language, or architecture — say "checkout provider" / "payment platform" /
     "purchase flow." Stripe may win later; not decided.
   - **No hard-coded "Buy Now."** CTA patterns must support multiple selling
     states — approved directions: View Listing / Show Interest / Claim Me /
     Ask About This Item / Get in Touch / Purchase Options / Message to Buy.
   - A future on-site checkout must slot in with **no schema rethink**
     (`external_url` already carries the outbound target per product).
   - **HCTC stays a placeholder**: host live as-is, basic content display only.
     No deep build, no compliance scope, no training modules / video / progress
     tracking / certificates yet — long-term ideas only.

## Shared-agent setup + what actually syncs (READ THIS)

- **Conversations do NOT sync between devices — only files do.** This `STATUS.md`
  is how work carries across devices, sessions, and agents. Keep it current.
- **What syncs: the `da-platform` repo** (this STATUS.md, its `AGENTS.md`, all
  code) — pushed to GitHub and pulled by launchd every 15 min on both Macs. This
  is the reliable cross-device record.
- **What does NOT sync: the workspace-root files** `../AGENTS.md` / `../CLAUDE.md`
  / `../GEMINI.md`. Their repo (`/Users/cuus/Claude`) has **no remote** (bad
  remotes were removed to fix a sync hang), so edits there stay on one device.
  Do not rely on them for cross-device continuity — put it here instead.
- Within da-platform, `AGENTS.md` is the shared brain; `CLAUDE.md`/`GEMINI.md`
  symlink to it. Antigravity reads AGENTS.md, Claude Code reads CLAUDE.md — same
  file. Either agent can drive.
- Open gap: the workspace-root shared brain no longer has a sync path. Fix later
  if we want workspace-wide conventions to travel between Macs.
- **2026-07-16:** `../AGENTS.md` didn't actually exist on disk (this file's own
  reference to it was stale) — recreated it with the one convention that
  mattered right now (where generated/downloaded files belong, so they stop
  landing loose in project roots). Still no sync path to the Air; still local
  to this Mac only.

---

## Current state (what is true now)

**Done**
- Workspace setup: GitHub auth fixed, auto-sync installed, monorepo built &
  published (`Digital-Allies/da-platform`, private), end-to-end sync verified.
- Fixed a stray parent-repo that was breaking sync (removed wrong remotes).
- Pipeline authored: `tools/build-workflows/PIPELINE.md` +
  `templates/BUILD-BRIEF.template.md` + `templates/CLIENT-ONBOARDING.template.md`.
- Per-site design references dropped in: `sites/*/CLAUDE.md` (each carries its
  source Claude Design project id).
- **Admin login page mobile fix:** `/admin/login` and `/admin/reset-password` responsive cards + prevent iOS input zoom-shift (Jul 9).
- **Step 2 Client Theming (complete):** client Google Fonts imported; CSS variable overrides scoped to `.site-theme-scope` in `globals.css` map Nav, Hero, Footer, and Cards to HCTC and Atomic Finds design tokens (Jul 9).
- **Week of July 13 Renderer & Routing (complete):** `BlockRenderer.tsx` built; root dynamic routing `[slug]` configured; contact form block added to Pages admin builder & visual preview (Jul 9).

**YOU ARE HERE (30-Day Run audit, 2026-07-09)**
- **Code is built through Day 18 (all core features of Weeks 1–4 are coded).**
  Present: Next.js app + Vercel deploy + Supabase clients (Days 1–5); schema + RLS (Days 6–7); dynamic page/settings/collections fetchers (Days 10, 16); admin pages builder (Days 11–15); public block renderer (Day 16); dynamic route pages (Day 17); contact form block (Day 18).
- **Environment is FURTHER along than the docs claimed (verified against the live Supabase).** Reality:
  - Supabase **is seeded** — DA settings (19), services (3), testimonials (2).
  - Admin user **exists**: `contact@digitalallies.net` (`492ac568-…`).
  - **HCTC already has a client row** (`7896354c-…`) — two tenants live.
  - Fixed a drift: DA `brand_color` corrected to Signal Red `#C5301A` per the design system.
- **So the admin should already be loginable** (code + data + user all exist).
  Anthony can log in at the Vercel URL as `contact@digitalallies.net`.
- **Genuinely still open:** `security-fixes.sql` NOT applied (anon can still call `get_my_client_id` → HTTP 200; low severity, returns null for anon). Needs the SQL editor. `ARCHITECTURE.md` (Day 04) missing.
- **Per-client theming (decision #7) — COMPLETED (Step 2, 2026-07-09):**
  `src/lib/theme.ts` holds design tokens mapped by `client_id`. `SiteTheme.tsx` injects them as `--tok-*` CSS variables on the public site scope. Public components (Hero, Nav, cards, Footer) now consume these tokens through `.site-theme-scope` variable overrides in `globals.css`. Client fonts (Montserrat, Lilita One, DM Sans) are imported.
- **The CMS admin engine's Vercel project deploys from the OLD repo, not the monorepo.** The live app (`da-webwssite-build-workflows.vercel.app`) still builds from `cassellac/da-webwssite-build-workflows`. Same code today, but re-point Vercel at `Digital-Allies/da-platform` (root `tools/build-workflows`) so production deploys come from the source of truth. Loose end — do before shipping changes. (This is the CMS *admin* app — NOT digitalallies.net, which is a separate Vercel project/repo; see "2026-07-16 audit" above.)
- Note: the DA `brand_color` fix lives in Supabase (live data), not in git.
- `digitalallies.net` **is connected to Supabase** and verified working as of 2026-07-16 (real content, EN/ES toggle functional) — see "2026-07-16 audit" above. It deploys from the separate `Digital-Allies/DigitalAllies` repo, not this monorepo.
- Repo sprawl on GitHub — archive old repos later.
- **CMS admin has no Services/Testimonials module.** Editing that content today means hand-written SQL in the Supabase table editor. Needed before "fully connecting" digitalallies.net's content the way it should work long-term.
- **`cms-loader.js` builds cards via unescaped `innerHTML`.** Fine while only Claude/Anthony touch the DB directly; becomes a real injection risk once a Services/Testimonials admin module exists and non-developers can enter content. Fix before that module ships.
- **Dead `tailwind.config = {...}` block** in digitalallies.net's inline script references a CDN Tailwind global that isn't loaded (site is precompiled/self-hosted) — harmless but throws a `ReferenceError` on every page load. Small cleanup, low priority.

---

## Major needs / known issues (prioritized)

**Status unknown as of 2026-07-17 — needs confirming, not assumed done:**
whether `security-fixes.sql` has been applied, whether leaked-password
protection is on, and whether the CMS admin engine's Vercel Git connection
has actually been re-pointed to the monorepo. All three were open as of
2026-07-16 and haven't been explicitly confirmed since.

1. **Apply `security-fixes.sql` + enable leaked-password protection** — Supabase SQL editor + one Auth toggle. Also directly confirmed by Supabase's own Security Advisor (2026-07-17 audit: 6 warnings, including the exact RLS/`SECURITY DEFINER` issues this file fixes). (Anthony Dependency)
2. ~~Rotate the leaked Supabase `service_role` key~~ — **done 2026-07-16.** Turned out more urgent than previously documented: `Digital-Allies/da-platform` was actually **public** on GitHub (STATUS.md's own decision #1 wrongly assumed private), so the leaked key was live-exposed, not a future risk. Anthony migrated to Supabase's new Publishable/Secret key system, disabled legacy keys (killing the old leaked one), updated the new Secret key in Vercel + `.env.local`, and made the repo private. Verified live: digitalallies.net and the CMS admin engine both work cleanly post-rotation.
3. ~~Re-point the CMS admin engine's Vercel project at the monorepo~~ — **confirmed done, 2026-07-19** (connected to `Digital-Allies/da-platform` since Jul 10, per Anthony's screenshot + Vercel deployment history — earlier claims in this file that it was still on the old repo were wrong, corrected). This is **only** the CMS admin app — digitalallies.net is a separate, already-correct Vercel project (see 2026-07-16 audit).
4. ~~Build the missing Services/Testimonials admin module~~ — **already
   exists, confirmed 2026-07-21** (`ARCHITECTURE.md`'s correction section has
   full detail). This need is resolved; what's left is unrelated: porting
   the `cms-loader.js` HTML-escaping fix (below) to the live static site.
5. **Escape HTML in `cms-loader.js`'s card-building code** — done in this
   monorepo's copy 2026-07-20, still needs manual porting to the live
   `Digital-Allies/DigitalAllies` repo (separate codebase from the admin
   module above — see `TODO.md` Backlog).
6. **2026-07-17 Vercel/Supabase audit fixes + Atomic Finds onboarding** — full checklist in `TODO.md` Priorities 4–5, not duplicated here.

## Next steps (in order)

1. ~~Add basic HTML-escaping to `cms-loader.js`'s card-building code~~ — done 2026-07-20 (this repo's copy); still needs manual porting to the live `Digital-Allies/DigitalAllies` repo.
2. ~~Remove the dead `tailwind.config` block from digitalallies.net's inline script~~ — done 2026-07-20; same live-repo porting gap as above.
3. ~~Build the missing Services/Testimonials admin module~~ — turned out to already exist, confirmed 2026-07-21 (see ARCHITECTURE.md).
4. **Anthony-only:** rotate the leaked `service_role` key; apply `security-fixes.sql` + enable leaked-password protection; re-point the `da-webwssite-build-workflows` Vercel project to `Digital-Allies/da-platform` (root `tools/build-workflows`).
5. **The original Day 19/20 domain cutover is still the real end-state goal, just not yet — do after 4.** `BUILD-SCHEDULE.md` originally called for pointing `digitalallies.net` itself at the Next.js CMS engine (the "Templated" tier from decision #2) and retiring the separate static-site repo. Today's setup — static site + `cms-loader.js` pulling from Supabase — is the "Connected" tier working as designed, and it's live and fine, but it isn't the full cutover the 30-Day Run originally scoped. Revisit whether full cutover is still the goal now that the admin module (step 3) is confirmed to exist; if so: add `digitalallies.net`/`www` to the `da-webwssite-build-workflows` Vercel project, update Supabase Auth Site URL + redirect URLs, verify magic-link login and the contact form on the real domain, confirm anon/draft RLS, then switch DNS.
6. ~~Backfill the Day-04 `ARCHITECTURE.md`~~ — done 2026-07-21.
7. Pick the next real `BUILD-SCHEDULE.md` item now that Jul 22–23's original
   slot (Services/Testimonials) is moot — see that file's Week of Jul 20
   section for the note, and decide what fills the freed time (dashboard
   backlog items from Week of Jul 27 are the next real code work, but check
   for anything higher-priority first).

## Only-Anthony dependencies (not decisions — just hands-on)

**Full step-by-step checklist:** `tools/build-workflows/tasks/anthony/TODO.md`
— every dashboard-only action (Vercel, Supabase, GitHub) any agent has queued
up for Anthony lives there, in priority order. Agents: read/update that file
instead of duplicating this list.

- **Supabase SQL editor:** paste `supabase/security-fixes.sql` and Run; then Auth
  → Providers → Email → enable leaked-password protection. (Or add a Supabase
  access token so the agent can run SQL/DDL directly in future.)
- **One admin login** to confirm the Press Office works. Project:
  `auwhvicpyiwsubucanpb`.

## Operating mode

Claude Code / Antigravity **drive and decide** — no decision-questions back to
Anthony when there's a clear best move; override with a written reason and record
it here. Pull Anthony in only for hands-on external clicks. He trusts the setup.

## Claude Design -2026-07-22 — Design-system session: CMS cleanup, Anthony task tracker, Page Editor prototype + spec, client templates

Paste into `da-platform/STATUS.md` above the most recent entry.

**Placement (current actual location):** these files live in the dated design-system snapshot folder `da-platform/packages/20260722-da-design-system/` — `cms/` at `.../20260722-da-design-system/cms/`, `client-docs/` at `.../20260722-da-design-system/client-docs/`. That folder is a design-system mirror/snapshot, **not live code or a deployed site** — the real engine is `tools/build-workflows`, where `client-docs/` moves once it's wired to real client records. (Folder naming in `packages/` is known-inconsistent — the dated `20260722-da-design-system` name vs. the canonical `packages/design-system` the architecture docs refer to; a repo-wide naming-convention pass is a deliberately-deferred future project, per Anthony.) This status-update file itself is a paste-in draft, not meant to be kept as a permanent doc.

- **Design-system project cleanup:** removed a stale bundled export
  (`Digital Allies CMS.html`) that duplicated `cms/dashboard.html`.
- **New: `cms/anthony-tasks.html`** — visual check-off tracker of every
  open `[Anthony]`-only item (Supabase/Vercel/registrar clicks), grouped
  by urgency, seeded from this file + `BUILD-SCHEDULE.md`. Checkbox
  state persists per-device via localStorage. Linked from `cms/index.html`
  + `cms/README.md`. Keep this in sync going forward — update the task
  list here whenever real status changes.
- **New: `cms/page-editor.html`** — clickable hi-fi prototype of the
  Pages block/section builder (the least production-ready admin area
  per Anthony's own Vercel Toolbar comments, "this build isn't meant for
  production"). Covers: section stack with reorder/duplicate/delete,
  inline content editor, a section-library modal to insert new blocks,
  a multi-tenant live-preview switcher (DA / Atomic Finds / HCTC token
  sets), and a subscription-tier gate (Starter/Pro/Agency) on the code
  editor. Design reference only — not wired to real data.
- **New: `cms/PAGE_EDITOR_SPEC.md`** — the Next.js implementation notes
  for the above: Page/Section data model, a `SECTION_REGISTRY` pattern
  (one entry per section type = schema + AdminForm + PublicBlock, so
  admin edit-forms and the public renderer never drift), API surface,
  and where section layouts should come from (DS-native components
  restyled per-client via `--tok-*`, or shadcnblocks/Mantine layout
  patterns copied for code ownership and re-skinned the same way).
  Also scopes the Starter/Pro/Agency gating and flags an open decision
  for Anthony: iframe vs. shadow-DOM sandboxing for Agency-tier custom
  section code.
- **New: `client-docs/welcome-letter.html` + `client-docs/setup-instructions.html`**
  — printable, brand-voiced client onboarding documents (doc-page based,
  DA tokens/fonts), with bracketed fill-in fields. Static for now per
  Anthony's call — wiring to real client records into the CMS is a later
  phase, not scoped yet.
- **Not done this session, explicitly deferred:** rebuilding
  `CMS_IMPLEMENTATION_PLAN.html`'s generic Node/Express/Mongo tech-stack
  section to match the real Next.js/Supabase architecture — still
  inaccurate, flagged for a follow-up pass.
- **Open decision surfaced, not resolved:** whether `digitalallies.net`
  gets rebuilt on-platform (real Pages/Press Office/Settings, matching
  the "Connected" tier clients already get) vs. staying static with
  targeted patches. Recommendation from the design session: rebuild is
  the right long-term move (per decision #2's "one platform, three
  faces" model — DA's own site should eat its own dog food and stop
  needing hand-ported fixes into a separate frozen repo), but sequence
  it AFTER the Pages/section-builder work above actually ships against
  real data — rebuilding onto a still-unfinished page editor just moves
  the same gaps onto a second codebase.

## Addendum (same session, later) — module naming + page templates decision

Anthony clarified real intent after seeing the prototype: **the admin
backend is one shared build for every client** — so client-facing module
names must be generic (Services / Testimonials / Blog / Articles /
Contact / Settings), NOT Digital Allies' own proprietary vocabulary (The
Departments / Field Notes / The Press Office / Command Center). Reserve
DA's jargon for DA's OWN admin instance only, via a per-tenant label map
over the same registry/nav data — not a second codebase.

Also: a **page-template picker** (separate from the section library) is
now scoped — new pages start from Blank / Home / Blog Post / Case Study
(generic, every client) or, **DA-tenant only**, Service/Tool Detail +
Services Index — which should literally be built FROM this design
system's existing `ToolDetail.dc.html` / `ServicesIndex.dc.html`, not a
re-derivation. Other clients get their own equivalent templates once
their own design systems exist.

`cms/page-editor.html` and `cms/PAGE_EDITOR_SPEC.md` updated to reflect
both changes. New client doc added: `client-docs/platform-access-guide.html`
— post-launch "how to accept your invite email, log in, and find key
URLs" doc (the welcome letter + setup instructions docs from earlier in
this session cover PRE-launch onboarding; this one covers POST-launch
access, per Anthony's follow-up ask).

## Addendum 2 — deep-review pass against ARCHITECTURE.md / PIPELINE.md / THEME_ENGINE_PLAN.md / TODO.md

Anthony asked for a full reconciliation pass before he ports this session's
work into the real folders. Real conflicts/corrections found, all now
reflected in `cms/PAGE_EDITOR_SPEC.md`'s new "Reconciliation" section:

1. **Schema:** the spec first proposed normalized `Section` rows; the real
   `pages` table already stores `blocks` as one `jsonb` array. Corrected to
   match — no migration needed for the base model.
2. **Naming:** `BlockRenderer.tsx`'s block-type KEYS are already generic
   (`services`, `testimonials`, not `departments`/`fieldnotes`) — only the
   admin NAV LABELS in `AdminNav.tsx` carry DA jargon ("The Departments",
   "Field Notes", "Command Center"), for every tenant, today. The
   generic-by-default / DA-only-override naming decision from this session
   is real, unbuilt code work — a per-tenant label map doesn't exist yet.
3. **Multi-tenant preview switcher:** the prototype's DA/Atomic
   Finds/HCTC live-preview switcher is a design-review convenience only —
   flagged explicitly so it doesn't get built literally. Real architecture
   is one deployment = one client, no runtime tenant switching
   (`ARCHITECTURE.md`).
4. **Blog Post / Case Study page templates:** conflicts with the existing
   separate `posts` table + Tiptap editor ("The Press Office"). Corrected —
   removed from the page-shell template picker's real-build scope; they
   belong as content *types* inside the Posts module instead, matching
   `CMS_IMPLEMENTATION_PLAN.html`'s original scoping for that module.
5. **Subscription tiers:** no conflict, good news — a `clients.plan`
   column migration already exists
   (`supabase/migrations/20260109000000_client_plan.sql`, unapplied, no
   gating logic yet). The Starter/Pro/Agency code-editor gate in this
   session's prototype should read that column rather than add a second
   plan field.
6. **Global design-token / theme editor** (the other admin-priority item
   from this session's questions): already fully scoped in
   `THEME_ENGINE_PLAN.md` (extend `settings` with `theme_*` keys). No
   overlap with the page-editor work, but noting it so nobody re-scopes it
   from scratch — follow that doc's own sequencing.

No other conflicts found against `PIPELINE.md`'s locked vocabulary (Platform
/ Admin / Brand / Website, Templated / Connected) — this session's UI-copy
changes are module display names, not Platform-level naming, so they don't
violate PIPELINE.md's "we are done rebranding" line.



---

*Update rule: after any large step, edit this file — move items between Done /
Next, bump the timestamp, note new decisions. Both agents rely on it.*
