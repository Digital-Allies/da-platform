# Anthony's TODO — things Claude/Antigravity can't do for you

Every item here needs a human in a dashboard, or a decision only you can make.
Nothing in this list is code — it's clicks, pastes, and confirmations. Check
items off as you go; agents will read this file to know what's still open.

Update history: created 2026-07-09 by Claude Code. Reviewed 2026-07-16 —
still accurate; added a scope note below and logged what's newly done.

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

**⚠ The actual admin-login bug, confirmed 2026-07-19 by submitting the
live form (not just loading the page):** it returned a real Supabase
error, **"Legacy API keys are disabled."** The client-side
`NEXT_PUBLIC_SUPABASE_ANON_KEY` (and `SUPABASE_SERVICE_ROLE_KEY`) baked
into this deployment were still legacy-format keys — the Vercel↔Supabase
integration's badge being present didn't mean it had actually re-synced
after legacy keys got disabled. **Fixed by Anthony (2026-07-19):**
manually updated both to the current Publishable/Secret key values.
**Still needed: a fresh deployment** — `NEXT_PUBLIC_`-prefixed vars are
baked in at build time, so the corrected values won't take effect until
the next deploy. A docs-only commit was pushed right after this fix
specifically to trigger one; check `/admin/login` again once that
deployment shows READY.

**Also confirmed while checking this (2026-07-19):** `NEXT_PUBLIC_SUPABASE_URL`,
`CONTACT_FORM_TO_EMAIL`, `RESEND_API_KEY`, and `NEXT_PUBLIC_CLIENT_ID` on
this project are **manually-entered, not integration-synced** — no amount
of pushing to the repo updates them; Vercel env vars have zero connection
to the repo's `.env.local` (which is gitignored and which Vercel wouldn't
read from anyway even if it weren't). `RESEND_API_KEY` here is known stale
(needs the new key, tracked in Priority 4). The other three are probably
still correct but unverified.

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
      `CONTACT_FORM_TO_EMAIL` (`atomicfindsat@gmail.com`), and Atomic
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
