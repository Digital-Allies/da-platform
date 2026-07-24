# Anthony's TODO — things Claude/Antigravity can't do for you

Every item here needs a human in a dashboard, or a decision only you can make.
Nothing in this list is code — it's clicks, pastes, and confirmations. Check
items off as you go; agents will read this file to know what's still open.

Update history: created 2026-07-09 by Claude Code. Reviewed 2026-07-16 —
still accurate; added a scope note below and logged what's newly done.
Reviewed again 2026-07-22 — added Priority 0 below (root cause found for
"Atomic Finds isn't loading card content/reviews").

---

## ✅ Priority 0 — RESOLVED 2026-07-24 — Atomic Finds Supabase sync confirmed working

**Resolved:** Branch was fixed (now `main`). Client ID was temporarily wrong — restored to `443936d5-f92e-480b-b206-c65cfb52bdfc` in commit `ef74922`. Verified live 2026-07-24 via Claude in Chrome: 14 products, 19+ reviews, category filters, product detail modal — all loading correctly from Supabase. Supabase logs show HTTP 200s, zero errors.

**What remains (now P0-a):** Browser tab title shows "My Business" — `public.settings` has zero rows for Atomic Finds. See Priority 0-a below.

---

## 🔴 Priority 0-a — Create and run Atomic Finds settings seed (found 2026-07-24)

`public.settings` has 21 rows — all Digital Allies. Zero for Atomic Finds `443936d5-f92e-480b-b206-c65cfb52bdfc`. Until seeded, the site title shows "My Business" and the logo uses a static fallback.

All three seed files are now written. Run them in order in Supabase SQL Editor:

**Step 1 — Site settings (fixes "My Business" title immediately):**
- [x] Claude Code: `seed-atomic-finds-settings.sql` ✅ written (20 keys: Identity, Hero, About, Contact, Social)
- [ ] Anthony: Open Supabase SQL Editor → New Query → paste contents of `tools/build-workflows/supabase/seed-atomic-finds-settings.sql` → Run
- [ ] Verify: reload https://atomicfindsatx.store — tab title should read "Atomic Finds ATX"

**Step 2 — Design tokens (feeds the admin Theme editor):**
- [x] Claude Code: `seed-atomic-finds-design-tokens.sql` ✅ written (colors, fonts, type scale, spacing)
- [ ] Anthony: Run `seed-atomic-finds-design-tokens.sql` in Supabase SQL Editor

**Step 3 — Pages (draft homepage + About for the page builder):**
- [x] Claude Code: `seed-atomic-finds-pages.sql` ✅ written (2 draft pages: home, about)
- [ ] Anthony: Run `seed-atomic-finds-pages.sql` in Supabase SQL Editor
- [ ] Note: Homepage draft is standby for Aug 5–6 build slot — live site still uses bespoke AtomicFindsHomepage.tsx

---

## 🔴 ARCHIVED — Priority 0 original entry (branch fix): wrong deploy branch (found 2026-07-22)

**This is the actual root cause of "Atomic Finds isn't loading card content,
reviews, or a few other sections" — it is NOT a Supabase key problem.**
Anthony pulled a full env-var audit CSV from Vercel across all 4 projects
(`atomic-finds-atx`, `da-webwssite-build-workflows`, `digital-allies`,
`healthcare-training-center`) and confirmed via the Vercel Toolbar that the
`atomic-finds-atx` project is deploying from branch
`claude/products-table-review-fixes-doa26m` (PR #4's branch) — not `main`.

That branch's own commits **are** in `main` (merged at `b1ac668`), but the
branch itself was never advanced afterward, so Vercel is deploying a frozen
snapshot from before 22 commits of later work, including:
- PR #5 (`chore/atomic-finds-cleanup`) — the products/design-system directory cleanup
- PR #7 + Greptile fixes — full mobile-responsive design, nav accessibility
- Contrast fixes + Digital Allies footer credit (pulsing heart)
- The local mock-data fallback for products/reviews in `src/lib/data.ts`

None of this is visible on production because Vercel never deploys `main`
for this project.

- [ ] **Vercel → `atomic-finds-atx` project → Settings → Git → Production
      Branch → change from `claude/products-table-review-fixes-doa26m` to
      `main`.** Trigger a redeploy after.
- [ ] After redeploy, verify cards/reviews/footer credit/mobile nav all
      render correctly on the live URL.
- [ ] Once confirmed stable, `claude/products-table-review-fixes-doa26m` can
      be deleted (PR #4 is fully merged, nothing else depends on it).

**Also confirmed in the same audit (env vars were NOT the problem, but two
small things need a decision):**
- `atomic-finds-atx`'s `CONTACT_FORM_TO_EMAIL` is `atomicfindsatx@gmail.com`
  — **confirmed correct by Anthony 2026-07-22.** The `atomicfindsat@gmail.com`
  (missing "x") reference earlier in this file (Priority 5, below) was the
  stale/wrong one — corrected there.
- `digital-allies` Vercel project has **zero environment variables set**.
  Anthony confirmed 2026-07-22: this is the live marketing site, and it's
  "partially connected to the Supabase CMS tables via reviews and services."
  Needs follow-up to confirm how it's reading Supabase data with no env vars
  configured in this Vercel project (maybe hardcoded, maybe a different
  project holds the real config, maybe it's client-side calling a public
  endpoint) — not yet root-caused, just flagging the gap.
- `healthcare-training-center`'s `NEXT_PUBLIC_SUPABASE_ANON_KEY` and
  `VITE_SUPABASE_ANON_KEY` are still the **old legacy JWT-format key**
  (`eyJhbGc...`), not the new `sb_publishable_...` key. Per Priority 3 below,
  legacy keys were supposed to be disabled after the rotation — if so, this
  project is likely hitting the same "Legacy API keys are disabled" error
  the CMS had before its fix. Not yet verified live, just flagged from the
  audit — worth an actual test load of the HCTC site.

---

## 🔴 Priority 1 — get Digital Allies' own site live for testing

- [x] **Re-point the `da-webwssite-build-workflows` Vercel project to the
      monorepo.** Confirmed done — the project's Connected Git Repository
      has shown `Digital-Allies/da-platform` since Jul 10 (Anthony
      confirmed via screenshot 2026-07-19), and deployment history shows
      it's been auto-deploying successfully on every push since. **Earlier
      notes in this file claiming the repo re-point was still open, or
      that it explained a login redirect bug, were wrong — corrected here
      2026-07-19.** Root Directory should still be double-checked is set
      to `tools/build-workflows` in Settings → General, but the Git
      connection itself is right.

**✅ Admin login fixed and verified, 2026-07-19.** Root cause: it returned
a real Supabase error, **"Legacy API keys are disabled"** — the client-side
`NEXT_PUBLIC_SUPABASE_ANON_KEY` (and `SUPABASE_SERVICE_ROLE_KEY`) baked
into this deployment were still legacy-format keys, despite the
Vercel↔Supabase integration badge being present (the badge doesn't mean it
auto-resyncs on every downstream Supabase change). Anthony manually
updated both to the current Publishable/Secret values, then a fresh
deployment was triggered and confirmed READY. **Verified by actually
submitting the live login form with a deliberately wrong password**: the
error changed from "Legacy API keys are disabled" to "Invalid login
credentials" — the correct response from a working auth system, not proof
of a working password, but proof the key rejection is gone. Also
confirmed in the same test: the login page now shows "DIGITAL ALLIES" as
the business name (was showing the generic fallback before), and
`cms.digitalallies.net` is now a live alias on this deployment — the
domain connection completed successfully too.

**Also confirmed while checking this (2026-07-19):** `NEXT_PUBLIC_SUPABASE_URL`,
`CONTACT_FORM_TO_EMAIL`, `RESEND_API_KEY`, and `NEXT_PUBLIC_CLIENT_ID` on
this project are **manually-entered, not integration-synced** — no amount
of pushing to the repo updates them; Vercel env vars have zero connection
to the repo's `.env.local` (which is gitignored and which Vercel wouldn't
read from anyway even if it weren't). `RESEND_API_KEY` here is known stale
(needs the new key, tracked in Priority 4). The other three are probably
still correct but unverified.

**⚠ Still can't actually log in — Anthony's password itself doesn't work
(separate issue from the key rejection above), and there was no working
password-reset path.** Confirmed the app had no "Forgot password?"
trigger anywhere — the `/admin/reset-password` page existed, but nothing
called `resetPasswordForEmail()` with a correct `redirectTo`, so any reset
attempt (e.g. one triggered manually from Supabase's own dashboard) used
Supabase's generic Site URL and landed on the bare homepage with an
`otp_expired`/`access_denied` error instead of the reset form — exactly
what Anthony hit. **Fixed and deployed, 2026-07-19:** login page now has a
"Forgot password?" link that calls `resetPasswordForEmail` with the right
redirect; the reset page itself now detects an expired/invalid link and
shows "Request a new link" instead of a dead-end form.

**✅ Second half of the same bug found and fixed, 2026-07-22:** the link
generation and the reset page itself were both correct, but `middleware.ts`
was still gating `/admin/reset-password` behind a session check. Supabase's
recovery link carries the token in the URL *hash* (`#access_token=...`),
which browsers never send to the server — so `getUser()` in middleware saw
no session on that first hit and redirected straight to `/admin/login`
before the page's client-side code ever got a chance to read the hash.
Excluded `/admin/reset-password` from the middleware auth gate (same as
`/admin/login`); verified an unauthenticated visit now renders the form
instead of bouncing to login, and confirmed `/admin` is still correctly
protected. Committed `4324b32`.

- [x] ~~Use the new "Forgot password?" link to regain access~~ — moot,
      Anthony logged in fine on both domains without needing it. The flow
      itself is still a real permanent fix, just wasn't needed this time.
- [x] ~~Check whether `/admin` shows the dashboard~~ — resolved, see
      `STATUS.md`'s 2026-07-19 entry: not a regression. Anthony's own
      Vercel Toolbar comments from ~23 days ago confirm Development,
      Projects, Content, and Pages were already known-unfinished
      placeholders before the monorepo switch — 7 open code-level items
      logged there as backlog, needing prioritization before any get
      picked up.

**Scope note (2026-07-16):** this is about the CMS *admin* engine
(`da-webwssite-build-workflows`), not digitalallies.net. The marketing site
is a separate Vercel project/GitHub repo, already live, and already
Supabase-connected — see `STATUS.md`'s 2026-07-16 audit.

- [ ] **Test the full admin loop once the fresh deployment is live:**
  - [ ] Log in with a real password.
  - [ ] Edit a page in `/admin/pages`.
  - [ ] Post a blog entry in `/admin/content` ("The Press Office").
  - [ ] Click "View live site" and confirm it shows real DA content, not
        the generic "My Business"/"Welcome" fallback.

---

## 🟡 Priority 2 — Supabase hardening (small, low-risk, keeps getting deferred)

- [ ] **Apply `security-fixes.sql`.**
  1. Open `tools/build-workflows/supabase/security-fixes.sql` in this repo.
  2. Supabase dashboard → your project (`auwhvicpyiwsubucanpb`) → SQL Editor →
     paste the whole file → Run.
- [ ] **Enable leaked-password protection.**
  Supabase dashboard → Authentication → Providers → Email → toggle on
  "Leaked password protection."
- [ ] **Apply the new `plan` column migration.**
  1. Open `tools/build-workflows/supabase/migrations/20260109000000_client_plan.sql`.
  2. SQL Editor → paste → Run. (This just reserves a column for future
     subscription tiers — no behavior changes yet, safe to run anytime.)

---

## 🟠 Priority 3 — rotate the leaked service-role key

~~Antigravity committed your Supabase **service_role key** (full database
bypass — not the safe public anon key) in plaintext inside
`tools/build-workflows/tasks/antigravity/list_clients.js`.~~

**✅ Done, 2026-07-16.** This turned out more urgent than this note assumed —
`Digital-Allies/da-platform` was actually **public** on GitHub (not private,
despite STATUS.md's decision #1), so the leaked key was exposed live, not
just a future risk. Anthony:
- Migrated to Supabase's new key system (Publishable + Secret keys) and
  disabled the legacy `anon`/`service_role` pair, which kills the old
  leaked key.
- Updated the new Secret key in Vercel (auto-synced via the Supabase↔Vercel
  integration on projects that have it connected) and in
  `tools/build-workflows/.env.local`.
- Made `Digital-Allies/da-platform` private.
- Verified live: digitalallies.net renders correctly (Supabase-fed
  Departments/testimonials sections, EN/ES toggle) with zero console
  errors; the CMS admin engine's sign-in page loads clean.

---

## 🟢 Priority 4 — fix tonight: 2026-07-17 Vercel/Supabase audit findings

A read-only audit (Claude in Chrome, cross-checking a rotation done a day
earlier) of both Vercel projects + the Supabase project turned up real
gaps. None of these are code — there's no tool that can write Vercel env
vars or touch Supabase's dashboard directly, so every item here is
genuinely a dashboard click, not something that can be done from the repo.

**Standing constraint (2026-07-17, confirmed by Anthony — not a bug):**
we're on free-tier Vercel/Supabase, and Vercel's native Supabase
integration only supports 2 connected projects on that tier — already
used up. This is a budget decision, not an oversight, and Anthony's plan
is to upgrade once there's paying-customer revenue, at which point this
whole section becomes moot. Until then: **any Vercel project beyond the
first 2 must have its Supabase keys pasted in by hand, and — this is the
part that actually matters — every future key rotation has to be repeated
manually on those same projects, since they don't auto-sync.** Right now
that's `healthcare-training-center`; the moment Atomic Finds gets its own
Vercel project (Priority 5), it joins this list too. Don't try to "fix"
this by connecting the integration there — it can't be, at this tier.
**Checklist for next time ANY Supabase key gets rotated:** manually update
`NEXT_PUBLIC_SUPABASE_ANON_KEY` / `SUPABASE_SERVICE_ROLE_KEY` in
`healthcare-training-center` (and, once it exists, Atomic Finds' project)
— `da-webwssite-build-workflows` alone will update itself.

- [ ] **Add `NEXT_PUBLIC_SITE_URL` to `da-webwssite-build-workflows`** — it
      doesn't exist in this project at all right now. Settings →
      Environment Variables → Add → Name `NEXT_PUBLIC_SITE_URL`, Value
      `https://da-webwssite-build-workflows.vercel.app` for now (update to
      `https://cms.digitalallies.net` once that domain is connected, below).
- [ ] **Confirm `healthcare-training-center`'s Supabase keys are current.**
      They're manually-pasted by necessity (see constraint above, not a
      mistake) — just confirm they hold today's actual Publishable/Secret
      key values. Supabase dashboard → Project Settings → API Keys → copy
      the current Publishable key value → paste into this project's
      `NEXT_PUBLIC_SUPABASE_ANON_KEY`; copy the current Secret key value →
      paste into `SUPABASE_SERVICE_ROLE_KEY`. Redeploy after.
- [ ] **Clean up duplicate Supabase keys.** There are two Publishable/Secret
      key pairs in the Supabase project — one named "default," one named
      "supabase_anon_new"/"supabase_service_role_new" (the ones actually in
      use). Confirm the "_new" pair is what's referenced in both Vercel
      projects, then revoke the unused "default" pair so there's no
      unused-but-valid credential sitting around.
- [ ] **Connect the `cms.digitalallies.net` domain** to
      `da-webwssite-build-workflows` — not done yet. Steps: project →
      Settings → Domains → add it; update the *existing* Cloudflare CNAME
      record to point at Vercel (set to "DNS only," not proxied — Cloudflare's
      proxy commonly breaks Vercel's own SSL); add the domain to Supabase →
      Authentication → URL Configuration (Site URL + Redirect URLs); update
      `NEXT_PUBLIC_SITE_URL` to match once it's live.
- [ ] **Add the new per-site Resend API keys to Vercel** — generated
      2026-07-17 after the old shared key was flagged compromised; they're
      only in the local `.env.local` right now. Add `RESEND_API_KEY` to
      `da-webwssite-build-workflows` (Digital Allies' own key) and to
      `healthcare-training-center` (its own key). Atomic Finds doesn't have
      a Vercel project yet — nothing to add there until Priority 5 below.
- [ ] **Revoke the old, compromised Resend key** in Resend's own dashboard,
      if not done already — replacing where it's *referenced* doesn't kill
      the old key itself.

Not urgent, just noted: `healthcare-training-center`'s `NEXT_PUBLIC_SITE_URL`
currently points at its default `.vercel.app` URL, not a custom domain —
fine for now, revisit whenever HCTC gets a real domain.

- [x] **`cms.digitalallies.net` root redirect** — done in code (2026-07-19):
      hitting the bare domain now redirects to `/admin/login` instead of
      showing the generic placeholder homepage, since there's no real
      content to show there yet. Scoped to that hostname only, verified
      locally against a spoofed Host header — won't affect any other
      tenant's own site.
- **Note on "and cms.digitalallies.net/login":** only `/admin/login` exists
  in the codebase — there's no separate `/login` route. If a distinct
  client-facing login (as opposed to `/admin/login`) is actually wanted,
  that needs to be built; for now the redirect only targets `/admin/login`.
- [ ] **Domain connection itself** (Vercel Settings → Domains, Cloudflare
      CNAME, Supabase redirect URLs) is in progress as of 2026-07-19 — same
      steps as before, not repeated here.

**Also surfaced by the audit, ties into Priority 2 above:** Supabase's own
Security Advisor currently shows 0 errors, 6 warnings, 1 suggestion —
overly permissive RLS policies, two `SECURITY DEFINER` functions callable
without proper restriction (this matches `get_my_client_id()`, which
`security-fixes.sql` addresses), and leaked-password protection still off.
Applying `security-fixes.sql` (Priority 2) should clear most of these —
worth re-checking the Advisor after.

---

## 🔵 Priority 5 — onboarding Atomic Finds (in progress, not "later" anymore)

Anthony is actively finishing the design (a Figma Make trial is underway)
and backend groundwork has started — this is no longer blocked/deferred.

- [x] **Products catalog schema** — PR
      [#1](https://github.com/Digital-Allies/da-platform/pull/1)
      (`feat/atomic-finds-products-catalog`) adds a `products` table
      (matching the services/testimonials client_id+RLS convention),
      a `getProducts()` data function, and seeds 4 real listings from
      Jennyfer's catalog. **Needs:** review + merge the PR, then run the
      migration and seed file yourself in the Supabase SQL editor — neither
      runs automatically.
- [ ] Re-send the 5th product (cut off mid-paste in the original message)
      so it can be added to the seed.
- [ ] Get real product photos — none in the source data; `image_url` is
      `null` for all four seeded products on purpose, not faked.
- [ ] Frontend product grid/card components — still being designed
      (Figma Make trial), not built yet.
- [ ] Once design + backend are both ready: Create a new Vercel project →
      Add New Project → import `Digital-Allies/da-platform` → Root
      Directory `tools/build-workflows`.
- [ ] Copy these env vars over: `NEXT_PUBLIC_SUPABASE_URL`,
      `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`,
      `CONTACT_FORM_TO_EMAIL` (`atomicfindsatx@gmail.com`), and Atomic
      Finds' own `RESEND_API_KEY` (generated 2026-07-17, currently only in
      local `.env.local`).
- [ ] Set `NEXT_PUBLIC_CLIENT_ID` = `443936d5-f92e-480b-b206-c65cfb52bdfc`
      and `NEXT_PUBLIC_SITE_URL` (fill in after first deploy gives you the
      URL).
- [ ] Also re-point `healthcare-training-center`'s Vercel project the same
      way as Priority 1 (Git → `Digital-Allies/da-platform`, root
      `tools/build-workflows`, confirm `NEXT_PUBLIC_CLIENT_ID` =
      `7896354c-1d34-4649-85f5-51f2e5a7df6c`), whenever HCTC needs testing
      too.

---

## ⚪ Backlog — future features (not scheduled, just captured)

- **🔴 Upgrade from Backlog — this one is currently live-broken, found
  2026-07-23.** `Digital-Allies/DigitalAllies`'s `assets/js/cms-loader.js`
  (the SEPARATE live repo, not this monorepo) has had a top-level
  `ReferenceError` since commit `f77d1596` (2026-07-16T17:04:21Z, a manual
  Supabase-key edit): it renamed the `SUPABASE_ANON_KEY` const to
  `supabase_anon_new` but left both references inside the `headers` object
  pointing at the old name. The script throws before it ever runs, so on
  every page that still loads it (`learn/index.html`), NOTHING works.
  Verified live: `#learn-articles-grid` on `digitalallies.net/learn/` has
  shown a static "Loading articles..." to every visitor for over a week.
  **The fix is one line** — in `assets/js/cms-loader.js`, change the two
  `SUPABASE_ANON_KEY` references inside the `headers` object (lines ~9-10)
  to `supabase_anon_new` (matching the const actually declared on line 5).
  Do the escapeHtml fix below in the same edit while the file's open — full
  detail on both: `STATUS.md`'s 2026-07-23 entry. **Also worth knowing:**
  the live homepage (`index.html`) no longer loads `cms-loader.js` at all
  as of the 2026-07-14 site-overhaul merge — Services/Testimonials edits in
  the CMS admin currently have zero effect there, only `/learn/` is
  affected by the bug above.
- **Port two verified code fixes from da-platform to the live
  `Digital-Allies/DigitalAllies` repo.** 2026-07-20: the HTML-escaping fix
  in `cms-loader.js` and the dead `tailwind.config` removal (13 files) were
  built and verified in `da-platform`'s `sites/digitalallies`, but that
  copy is a frozen one-time import — it's not what digitalallies.net
  actually deploys from. Same manual-port pattern as the 2026-07-16
  Supabase-data/duplicated-`<html>` fixes. Diffs are in `da-platform`
  commit `6876c63` (`sites/digitalallies/assets/js/cms-loader.js` +
  the 13 HTML files) — copy the equivalent changes into
  `Digital-Allies/DigitalAllies` directly. Full detail: `STATUS.md`
  2026-07-20 entry.

- **Per-site document storage in the admin.** Anthony wants a dedicated
  storage area inside each tenant's admin panel — not just for content
  clients upload themselves, but also for documents *Anthony* adds per
  client (contracts, invoices, etc.), accessible to both sides. Noted
  2026-07-19, explicitly deferred: naming conventions and scope are a task
  for later, not now. When this gets picked up, it'll need its own design
  pass (storage backend — likely Supabase Storage, bucketed per
  `client_id` — plus an admin UI section and access rules for who can see
  what).

## Done / resolved this session (for reference, not action items)

- ✅ Atomic Finds now has a Supabase `clients` row
      (`443936d5-f92e-480b-b206-c65cfb52bdfc`).
- ✅ Admin dashboard de-hardcoded from "Digital Allies" — now pulls business
      name/color/avatar from each tenant's own settings.
- ✅ Root-caused both "scary broken admin" incidents (stale dev server,
      stale Vercel deployment) — no code was lost.
- ✅ (2026-07-16, Anthony) digitalallies.net's `services`/`testimonials`
      Supabase rows fixed (were placeholder demo data) and the live
      `index.html`'s duplicated-document bug fixed (was breaking the EN/ES
      toggle site-wide). Verified live. Still open from that investigation:
      no Services/Testimonials admin module exists yet (editing needs raw
      SQL), and `cms-loader.js` builds cards via unescaped `innerHTML` —
      both tracked in `STATUS.md`'s Next steps, not here (they're code
      tasks, not dashboard/Anthony tasks).
