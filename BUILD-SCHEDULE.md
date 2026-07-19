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

## Backfill / anytime
- **Day 04 `ARCHITECTURE.md`** — write it from the Build Plan's Vercel layout when
  convenient (STATUS.md next-step #4).
- **Large tracked files → Git LFS** — `src.zip` (HCTC), `flash sections.gif`
  (elise-baca), `flora.ai` (portfolio). Under GitHub's 100MB hard limit today but
  should be migrated. See `../SYNC-NOTES.md`.

## Notes
- **Onboarding the two portfolio sites** (a friend's + Anthony's mother's — both
  pro-bono showcases, no paying clients yet) comes *after* the DA loop is live and
  the mobile admin + theming are done. They ride the same engine, configured not
  rebuilt.
- Phase 2 (multi-client onboarding UI, plan gating, Stripe billing, The Workshop)
  is intentionally out of scope until Phase 1 ships.
