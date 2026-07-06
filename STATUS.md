# da-platform — running status

**The shared source of truth for every AI agent (Claude Code + Antigravity) and
for Anthony.** Read this first, before doing anything. Update it after every
large step: what changed, what's true now, what's next. Keep it short and current
— stale status is worse than none.

**Last updated:** 2026-07-06 — by Claude Code (Opus 4.8) — repo decision confirmed; "you are here" pinned

---

## Decisions locked (do not re-litigate without a written reason)

1. **Repo structure = ONE monorepo.** `Digital-Allies/da-platform` is the single
   source of truth. The old individual repos still exist on GitHub but are
   **archive/backup only — do not commit to them.** Originals also sit in
   `../archive/pre-monorepo/`. Rationale: the multi-tenant model needs one shared
   codebase, not one repo per site.  **Confirmed by Anthony 2026-07-06.**
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

## Shared-agent setup (Claude Code + Antigravity)

- `AGENTS.md` is the single shared brain; `CLAUDE.md` and `GEMINI.md` symlink to
  it (workspace root and here). Antigravity reads `AGENTS.md`, Claude Code reads
  `CLAUDE.md`, Gemini reads `GEMINI.md` — same file. Either agent can drive.
- Auto-sync (launchd, every 15 min + at login) keeps GitHub current, so both
  agents on both Macs always see the latest code and this status.

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
- **Engine baseline verified (30-Day Run Day 1 done-state):** deps install clean,
  `tsc --noEmit` exit 0, dev server serves `/`→200, `/blog`→200, `/admin`→307
  (auth gate live). Live twin: https://da-webwssite-build-workflows.vercel.app .
- Local `.env.local` restored for dev (gitignored, never pushed).

**YOU ARE HERE (30-Day Run audit, 2026-07-06)**
- **Code is built through ~Day 15 (all of Weeks 1–3), plus some Phase 2 stubs.**
  Present: Next.js app + Vercel deploy + Supabase clients (Days 1–5); full schema
  with RLS defined (Days 6–7); `lib/data.ts` fetchers (Day 10); admin routes for
  dashboard, posts, pages, services, testimonials, settings, messages, content,
  plus projects/research/development stubs (Days 11–15).
- **The environment is stuck at Day 08.** Blocking gaps: Supabase is **not
  seeded**, `security-fixes.sql` **not applied**, and there is **no admin user**
  — so the admin can't be logged into and shows empty. Nothing works at runtime
  until these run.
- **Resume point = Day 08 → 09 → create admin user** (needs Supabase dashboard
  clicks). That unlocks logging in and validating the already-built Days 11–15,
  then Week 4 (public block-renderer, transmission loop, domain cutover).
- Minor: `ARCHITECTURE.md` (Day 04) missing; Week 4 public renderer is minimal
  (home + blog only, not the full block registry).
- `digitalallies.net` is **not yet connected** to Supabase.
- Repo sprawl on GitHub (da-cms, DigitalAllies_CMS, Branddigitalalliesnet, etc.)
  — many overlapping old repos. Not urgent; leave untouched until we decide.

---

## Next steps (in order)

1. **Day 08–09: seed + secure Supabase.** Run `supabase/seed-da.sql` and
   `supabase/security-fixes.sql`, enable leaked-password protection, then invite
   the first admin user. This is the resume point. *Needs Supabase dashboard
   access — the one thing that needs Anthony's hands (or a Supabase token so the
   agent can run it directly).*
2. **Validate Days 11–15** by logging into the seeded admin — confirm the
   already-built modules work against real data.
3. **Week 4:** full public block-renderer + site parity, the transmission loop
   (contact → message + email), then domain/DNS cutover and launch QA.
4. Backfill the Day-04 `ARCHITECTURE.md` at a convenient point.

## Only-Anthony dependency (not a decision — just access)

- Supabase steps in Day 08–09 need the dashboard (SQL editor + invite user), or a
  Supabase access token / DB connection string added so the agent can run them.
  Shared project: `auwhvicpyiwsubucanpb`.

## Operating mode

Claude Code / Antigravity **drive and decide** — no decision-questions back to
Anthony when there's a clear best move; override with a written reason and record
it here. Pull Anthony in only for hands-on external clicks. He trusts the setup.

---

*Update rule: after any large step, edit this file — move items between Done /
Next, bump the timestamp, note new decisions. Both agents rely on it.*
