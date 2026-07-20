# da-platform — Build Schedule (remaining run to Phase 1 launch)

> **Where this comes from:** the order of operations is `tools/build-workflows/tasks/
> Claude Code - Build Sequence.md` (the 20-day run) + the backlog in `STATUS.md`.
> This file is the *dated* version — what to do which day, from where we actually
> are. Read `STATUS.md` first; update both after each step.

**Anchor:** as of **Mon 2026-07-06**, code is built through **~Day 15** (Weeks 1–3
done: Next.js app, Vercel deploy, Supabase schema + RLS, `lib/store` data layer,
and the full Press Office admin). So the remaining run is the **backlog hardening
+ Week 4 (Days 16–20)** — *not* a restart. Cadence from the build doc: **one
focused task per weekday (~135 min), weekends are review-only.**

Legend: **[Agent]** = Claude Code / Antigravity can drive · **[Anthony]** =
hands-on external click only you can do (Supabase / Vercel / registrar).

---

## Week of Jul 6 — Harden the foundation before shipping more

### Tue Jul 7 · Confirm login + apply security fixes
*Prereqs, both quick. (~60 min)*
- **[Anthony]** Log in once at the Vercel URL as `contact@digitalallies.net`;
  confirm the Press Office shows seeded data (settings, services, testimonials).
- **[Anthony]** Supabase SQL editor → paste `supabase/security-fixes.sql`, Run.
  Then Auth → Providers → Email → enable **leaked-password protection**.
- **Done when —** you can log in and see real data; anon can no longer call
  `get_my_client_id`.

### Wed Jul 8 · Re-point Vercel at the monorepo
*Deploy from the source of truth. (~90 min)*
- **[Anthony + Agent]** In Vercel, change the project's Git repo from
  `cassellac/da-webwssite-build-workflows` to `Digital-Allies/da-platform`, root
  directory `tools/build-workflows`. Redeploy and confirm prod builds green.
- **Done when —** production deploys come from `Digital-Allies/da-platform`.

### Thu Jul 9 · Fix the mobile admin login page
*Every client logs in here. (~135 min)*
- **[Agent]** Rebuild `src/app/admin/login/page.tsx` responsive: proper viewport
  handling, no layout shift, touch-friendly inputs/buttons. Admin stays
  DA-branded (decision #7 — layout/UX only, not theming).
- **Done when —** `/admin/login` is clean and usable on a phone, no shift.

### Fri Jul 10 · Finish Step 2 theming
*Make client sites become themselves. (~135 min)*
- **[Agent]** Make the public components (Hero, Nav, cards, Footer) consume the
  `--tok-*` vars from `SiteTheme.tsx` instead of hardcoded DA styles; load the
  non-DA web fonts (HCTC: Montserrat/Inter; Atomic Finds: Lilita One/DM Sans).
- **Done when —** a non-DA client site visually renders as itself, not as DA.

### Sat–Sun Jul 11–12 · Review only
- Skim the week's commits, confirm Vercel deploys are green, **back up the
  Supabase DB** (Dashboard → Database → Backups, or `pg_dump`). No new build prompts.

---

## Week of Jul 13 — Week 4: the connected loop, go live

### Mon Jul 13 · Day 16 — Public block renderer
- **[Agent]** Build `(site)/[client]` block registry (hero, richtext,
  departments, fieldNotes, cta) reading ONLY published data via `lib/store`.
- **Done when —** a public URL renders the real DA Home page from Supabase, no auth.

### Tue Jul 14 · Day 17 — Full site parity
- **[Agent]** Extend renderer to About, Services, and article pages; departments
  + field notes pull live. Use design-system components, not hand-rolled CSS.
- **Done when —** the public site matches the brand and reads entirely from the store.

### Wed Jul 15 · Day 18 — The transmission loop
- **[Agent + Anthony]** Wire the contact form to (1) insert a `messages` row and
  (2) email `contact@digitalallies.net` (Resend recommended; key in Vercel env).
- **Done when —** a submission creates a row, emails you, shows in Command Center.

### Thu Jul 16 · Day 19 — Domain + DNS cutover (do early in the day)
**⚠ SUPERSEDED, see `STATUS.md`'s 2026-07-16/17 notes.** This assumed
`digitalallies.net` itself would be cut over to point at the Next.js CMS
engine. In reality `digitalallies.net` was already live the whole time on
a separate repo/Vercel project (`Digital-Allies/DigitalAllies`, the
"Connected" tier per decision #2) and never needed this cutover — what
actually happened 2026-07-17 was standing up `cms.digitalallies.net` as a
new subdomain for the *admin engine*, leaving digitalallies.net as-is.
Whether the original full cutover (retiring the separate static-site repo)
is still the goal is an open question — see STATUS.md's Next steps.
- ~~**[Anthony]** Add `digitalallies.net` + `www` to Vercel; set A/CNAME at the
  registrar; update Supabase Auth Site URL + redirect URLs to the real domain.
  Keep the old site reachable until HTTPS + magic-link verified.~~
- ~~**Done when —** https://digitalallies.net serves the new site; login still works.~~

### Fri Jul 17 · Day 20 — Launch QA + cut over
**⚠ Also superseded** — depended on the Day 19 cutover above, which didn't
happen as originally scoped. The admin engine's Vercel repo connection and
`security-fixes.sql` are still open regardless (see `STATUS.md` Major
needs); the "Phase 1 shipped" framing here assumed a cutover that didn't
occur this way.
- ~~**[Agent + Anthony]** Run the launch checklist (every page loads, contact form
  end-to-end, login on the real domain, drafts hidden from anon, mobile holds,
  Lighthouse reasonable). Clean prod deploy from `main`; tag `v1`.~~
- ~~**Done when —** the connected loop is live. **Phase 1 shipped.**~~

---

## Week of Jul 20 — Recalibrated run (2026-07-19 audit)

**Why this section exists:** the Jul 13 week above ran long and picked up
scope that wasn't in the original plan (key rotation, admin login bugs,
Atomic Finds catalog, a Vercel/Supabase audit, and a backlog of known
dashboard gaps surfaced via Anthony's own Vercel Toolbar comments — full
detail in `STATUS.md`). This section is the actual current plan, not a
continuation of stale dates above.

### Mon Jul 20 · Security + audit cleanup, plus two quick code wins
- **[Anthony]** Apply `supabase/security-fixes.sql` + enable leaked-password
  protection — still unconfirmed since 2026-07-16, do first.
- **[Anthony]** Confirm the 2026-07-17 Vercel/Supabase audit items:
  `NEXT_PUBLIC_SITE_URL` set on `da-webwssite-build-workflows`; HCTC's
  Supabase keys current; duplicate Supabase key pair cleaned up; new
  per-site Resend keys added to Vercel; old compromised Resend key revoked.
  Full checklist: `tools/build-workflows/tasks/anthony/TODO.md` Priority 4.
- **[Anthony]** Review + merge PR #1 (`feat/atomic-finds-products-catalog`),
  then run its migration + seed file in the Supabase SQL editor.
- **[Agent]** Escape HTML in `cms-loader.js`'s card-building code.
- **[Agent]** Remove the dead `tailwind.config` block from digitalallies.net.
- **Done when —** security items confirmed, audit checklist clear, PR #1
  merged and applied, both small code fixes shipped.

### Tue Jul 21 · Backfill `ARCHITECTURE.md`
- **[Agent]** Write it from the CMS Build Plan's Vercel/architecture layout
  (outstanding since Day 04 — STATUS.md next-step, never done).
- **Done when —** `ARCHITECTURE.md` exists and matches what's actually built.

### Wed–Thu Jul 22–23 · Services/Testimonials admin module
- **[Agent]** Build the missing admin module so digitalallies.net's
  services/testimonials can be edited without hand-written SQL — the
  actual prerequisite for "fully connecting" that site (STATUS.md Major
  need #4). Include the HTML-escaping fix from Monday if not already
  covering this surface.
- **Done when —** services + testimonials are editable from `/admin`, and
  `cms-loader.js`'s rendering is confirmed still correct against it.

### Fri Jul 24 · Review / buffer
- Skim the week's commits, confirm deploys are green, no new build prompts.

## Week of Jul 27 — Dashboard backlog, part 1 (Workshop + Projects)
*Source: Anthony's own Vercel Toolbar comments, ~23 days old — see
STATUS.md's 2026-07-19 entry for the full list.*

### Mon–Tue Jul 27–28 · `/admin/development` ("The Workshop")
- **[Agent]** Build real templates (currently "doesn't work needs
  templates"); wire the CMS-to-live-site connection groundwork toward
  digitalallies.net; add a working login/out button; scope what "real
  notifications" should actually mean here and implement a first version.
- **Done when —** the Workshop's core actions work against real data, not
  placeholders.

### Wed–Thu Jul 29–30 · `/admin/projects`
- **[Agent]** Build real project templates (currently "doesn't work and
  need to build actual project templates").
- **Done when —** creating/viewing a project uses a real template, not a
  stub.

### Fri Jul 31 · Review / buffer

## Week of Aug 3 — Dashboard backlog, part 2 (Press Office + Pages)

### Mon–Tue Aug 3–4 · `/admin/content` ("The Press Office")
- **[Agent]** Build templates for all category tabs; connect posting to
  the primary site so entries match the format of
  `digitalallies.net/learn/` articles.
- **Done when —** a post made here shows up on the live `/learn/` page in
  the right format.

### Wed–Thu Aug 5–6 · `/admin/pages`
- **[Agent]** This build "isn't meant for production" per Anthony's own
  note — add a code-view option with live preview, and use real components
  for elements/sections/cards instead of whatever's there now.
- **Done when —** a new page can be built with real components and
  previewed live, with a code-view option available.

### Fri Aug 7 · Review / buffer

## Parallel / not scheduled — blocked on external input
These move whenever their blocker clears, not on the calendar above:
- **Atomic Finds frontend components** — blocked on Anthony's Figma Make
  design trial.
- **Atomic Finds Vercel project creation** (TODO.md Priority 5) — blocked
  on the above plus the backend being ready.
- **5th product + real product photos** — blocked on Anthony sending them.
- **Checkout provider integration** — blocked on Anthony's conversation
  with Jenny about which provider to use.

---

## Backfill / anytime
- **Large tracked files → Git LFS** — `src.zip` (HCTC), `flash sections.gif`
  (elise-baca), `flora.ai` (portfolio). Under GitHub's 100MB hard limit today but
  should be migrated. See `../SYNC-NOTES.md`.
- **Per-site document storage feature** (contracts/invoices/client
  uploads) — captured as backlog in `TODO.md`, not scoped or scheduled yet.

## Notes
- **Onboarding the two portfolio sites** (a friend's + Anthony's mother's — both
  pro-bono showcases, no paying clients yet) comes *after* the DA loop is live and
  the mobile admin + theming are done. They ride the same engine, configured not
  rebuilt.
- Phase 2 (multi-client onboarding UI, plan gating, Stripe billing, The Workshop)
  is intentionally out of scope until Phase 1 ships.
