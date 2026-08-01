# Atomic Finds ATX — Pre-Handoff Build Checklist

**Client:** Atomic Finds ATX  
**client_id:** `443936d5-f92e-480b-b206-c65cfb52bdfc`  
**Live site:** https://atomicfindsatx.store  
**CMS admin:** https://cms.digitalallies.net/admin  
**Contact:** Jennyfer Gomez  

Run this checklist before deciding AF is ready for client handoff. Cross-reference STATUS.md and DA-PLATFORM-MASTER-CONTEXT.md for current state.

> ⚠️ Per CLAUDE.md: running SQL against live Supabase requires Anthony's sign-off. Write the queries, flag them, wait for approval before executing.

---

## PHASE 1 — Technical Foundation (Supabase)

- [ ] `clients` row exists with correct `client_id` ✅ (confirmed 2026-07-24)
- [ ] `auth_user_id` linked to client admin email ✅
- [ ] **`settings` seed run** — 3 seed files written, NOT YET RUN → shows "My Business" fallback ❌
- [ ] **`design_tokens` seed run** — written, NOT YET RUN ❌
- [ ] **`pages` seed run** — written, NOT YET RUN ❌
- [ ] Starter catalog seed run — 14 products already live ✅
- [ ] RLS verified: anon cannot read another client's data — unconfirmed, `supabase/security-fixes.sql` status unknown ⚠️
- [ ] RLS verified: drafts are not readable by anon — unconfirmed ⚠️

### Seed files (written, awaiting Anthony's sign-off to run):
- `tools/build-workflows/supabase/seed-atomic-finds-settings.sql`
- `tools/build-workflows/supabase/seed-atomic-finds-design-tokens.sql`
- `tools/build-workflows/supabase/seed-atomic-finds-pages.sql`

### Vercel
- [ ] Vercel project exists ✅
- [ ] Production branch = `main` ✅
- [ ] `NEXT_PUBLIC_CLIENT_ID` = `443936d5-f92e-480b-b206-c65cfb52bdfc` ✅ (fixed 2026-07-24, commit ef74922)
- [ ] `NEXT_PUBLIC_SUPABASE_URL` set ✅
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` set (`sb_publishable_...` format) ✅
- [ ] `SUPABASE_SERVICE_ROLE_KEY` set ✅
- [ ] `NEXT_PUBLIC_SITE_URL` = `https://atomicfindsatx.store` — verify
- [ ] `CONTACT_FORM_TO_EMAIL` set to AF email — verify
- [ ] `RESEND_API_KEY` set ✅ (old key may need rotation — see P3)
- [ ] Latest deploy is green ✅

### Domain & DNS
- [ ] Custom domain `atomicfindsatx.store` live ✅
- [ ] HTTPS resolves without warnings ✅
- [ ] Domain added to Supabase Auth URL config — verify

---

## PHASE 2 — Content & Brand

- [ ] Site title shows "Atomic Finds ATX" (not "My Business") ❌ — blocked on settings seed
- [ ] Logo visible — verify after seed run
- [ ] Favicon set — verify
- [ ] Hero headline is real (not placeholder) — verify after seed run
- [ ] About section has real copy — verify after seed run
- [ ] Contact info is real — verify after seed run
- [ ] Social links set (Instagram, Facebook at minimum)
- [ ] 14 products published and visible ✅
- [ ] Brand colors (#F5C842, #D4822A, #1E1E1E, #F0E8D8) displaying correctly — verify after design_tokens seed

---

## PHASE 3 — Required Pages

- [ ] Homepage loads and renders correctly ✅ (14 products, 19 reviews)
- [ ] About page exists — verify
- [ ] Contact section works and sends email
- [ ] `/terms` — Terms of Service exists
- [ ] `/privacy` — Privacy Policy exists
- [ ] `/cookies` — Cookie Policy exists
- [ ] `/accessibility` — Accessibility Statement exists
- [ ] `/use-of-ai` — AI Disclosure exists
- [ ] `/sitemap` — Sitemap page and `/sitemap.xml` both return
- [ ] 404 page renders

---

## PHASE 4 — SEO & AEO

- [ ] `<title>` shows "Atomic Finds ATX" (not "My Business") ❌ — blocked on settings seed
- [ ] Meta description set
- [ ] Open Graph tags present
- [ ] `/sitemap.xml` returns valid XML with real URLs
- [ ] `/robots.txt` returns and is correct
- [ ] JSON-LD structured data on homepage (LocalBusiness schema with AF details)
- [ ] `<html lang="en">` is set ✅

---

## PHASE 5 — Performance & Accessibility

- [ ] Mobile layout at 375px renders correctly
- [ ] Mobile layout at 768px renders correctly
- [ ] No console errors on page load
- [ ] All images have alt text
- [ ] Contact form submits without errors
- [ ] Contact form delivers email to AF address
- [ ] Lighthouse Performance ≥ 80
- [ ] Lighthouse Accessibility ≥ 90
- [ ] No WCAG Critical/Serious violations
- [ ] Text contrast meets WCAG AA (4.5:1 body, 3:1 large text)

---

## PHASE 6 — Admin Setup

- [ ] Jennyfer can log into cms.digitalallies.net/admin
- [ ] Dashboard shows "Atomic Finds ATX" (not "Digital Allies") — blocked on settings seed
- [ ] All tabs accessible (The Workshop is correctly hidden for this client ✅)
- [ ] Jennyfer can edit a Setting and see it update live
- [ ] Jennyfer can edit a product and see it update live ✅ (confirmed working)
- [ ] Password reset flow works via email magic link

---

## HANDOFF DOCS

- [ ] Onboarding binder generated ✅ — `tools/build-workflows/public/onboarding/binder-atomic-finds.html`
- [ ] First-login welcome banner — NOT built in CMS (Phase 2 feature)
- [ ] First-login tour — NOT built in CMS (Phase 2 feature); binder substitutes
- [ ] Jennyfer's admin email invited via Supabase Auth → Invite
- [ ] Welcome email drafted with: login link, binder link, Anthony's contact
- [ ] Jennyfer briefed on support: email hello@digitalallies.net, 24h response

---

## DEFERRED / PHASE 2 (not blocking launch)

- Language switcher (EN/ES) — plan in `I18N_SYSTEM_PLAN.md`, not built
- In-platform checkout — provider undecided
- Press Office → public site article sync
- Welcome banner and first-login tour (CMS features)
- Plan-based feature gating (Starter/Pro/Agency tiers)
- Old Resend key rotation (P3 security)
- `supabase/security-fixes.sql` confirmation (P3 security)
