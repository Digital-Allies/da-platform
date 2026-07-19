# Anthony's TODO — things Claude/Antigravity can't do for you

Every item here needs a human in a dashboard, or a decision only you can make.
Nothing in this list is code — it's clicks, pastes, and confirmations. Check
items off as you go; agents will read this file to know what's still open.

Update history: created 2026-07-09 by Claude Code. Reviewed 2026-07-16 —
still accurate; added a scope note below and logged what's newly done.

---

## 🔴 Priority 1 — get Digital Allies' own site live for testing

**Scope note (2026-07-16):** this is about the CMS *admin* engine
(`da-webwssite-build-workflows`), not digitalallies.net. The marketing site
is a separate Vercel project/GitHub repo, already live, and already
Supabase-connected — see `STATUS.md`'s 2026-07-16 audit. This item is only
about getting the admin dashboard itself deploying from the right repo.

This unblocks the "connect my own website first" plan — deploy DA's tenant,
log in, edit pages, post a blog, confirm everything works before touching
Atomic Finds.

- [ ] **Re-point the `da-webwssite-build-workflows` Vercel project to the monorepo.**
  1. Go to [vercel.com](https://vercel.com) → team **Digital Allies** → project
     `da-webwssite-build-workflows`.
  2. Settings → Git → **Disconnect** the current repo
     (`cassellac/da-webwssite-build-workflows`).
  3. **Connect** a new repo → `Digital-Allies/da-platform`.
  4. Settings → General → **Root Directory** → set to `tools/build-workflows`.
  5. Leave all existing Environment Variables as-is — they're already correct
     for this project.
  6. Trigger a redeploy (Deployments tab → ⋯ on latest → Redeploy, or just
     push any commit to `main`).
  7. Once it's built, open the deployment URL → `/admin` → log in → confirm
     it matches what you see locally.

- [ ] **Test the full admin loop on that live URL:**
  - [ ] Log in.
  - [ ] Edit a page in `/admin/pages`.
  - [ ] Post a blog entry in `/admin/content` ("The Press Office").
  - [ ] Click "View live site" and confirm it shows the styled, current site
        (not the old unstyled version — that was the stale deployment, this
        should be fixed once step above is done).

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
