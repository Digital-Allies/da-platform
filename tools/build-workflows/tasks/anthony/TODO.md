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

## ⚪ Priority 4 — later: onboarding Atomic Finds (don't do yet)

Reference for whenever we actually get here — not blocking anything now.

- [ ] Create a new Vercel project: Add New Project → import
      `Digital-Allies/da-platform` → Root Directory `tools/build-workflows`.
- [ ] Copy these env vars from `da-webwssite-build-workflows`'s project settings:
      `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
      `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `CONTACT_FORM_TO_EMAIL`.
- [ ] Set these two differently for Atomic Finds:
      - `NEXT_PUBLIC_CLIENT_ID` = `443936d5-f92e-480b-b206-c65cfb52bdfc`
      - `NEXT_PUBLIC_SITE_URL` = (fill in after first deploy gives you the URL)
- [ ] Also re-point `healthcare-training-center`'s Vercel project the same
      way as Priority 1 (Git → `Digital-Allies/da-platform`, root
      `tools/build-workflows`, confirm `NEXT_PUBLIC_CLIENT_ID` =
      `7896354c-1d34-4649-85f5-51f2e5a7df6c`), whenever HCTC needs testing too.

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
