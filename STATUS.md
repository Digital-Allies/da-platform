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
- **Environment is FURTHER along than the docs claimed (verified against the live
  Supabase 2026-07-06).** The old README saying "seed not run / no admin user" is
  STALE. Reality:
  - Supabase **is seeded** — DA settings (19), services (3), testimonials (2).
  - Admin user **exists**: `contact@digitalallies.net`
    (`492ac568-…`). Also present: `acinktown@gmail.com`, `vickiebuckholz@…`.
  - **HCTC already has a client row** (`7896354c-…`) — two tenants live, not one.
  - Fixed a drift: DA `brand_color` had become teal `#0F766E`; corrected to Signal
    Red `#C5301A` per the design system.
- **So the admin should already be loginable** (code + data + user all exist).
  Anthony can log in at the Vercel URL as `contact@digitalallies.net`.
- **Genuinely still open:** `security-fixes.sql` NOT applied (anon can still call
  `get_my_client_id` → HTTP 200; low severity, returns null for anon). Needs the
  SQL editor. Week 4 public block-renderer is minimal (home + blog only). No
  blog `posts`/`pages` rows yet. `ARCHITECTURE.md` (Day 04) missing.
- **Per-client theming gap (from decision #7) — scoped to PUBLIC sites only:**
  the public renderer must theme fully from each client's own tokens, but today
  only DA has brand data and only a single `brand_color`; HCTC/Atomic Finds have
  none; `design_tokens` is effectively empty. To do: (a) load per-client tokens
  (colors/fonts/radius) from each `sites/<site>/CLAUDE.md` into the DB, (b) make
  the **public renderer** consume the full set so each site looks like itself,
  (c) never fall back to DA's brand on a public site. The **admin stays
  DA-branded** — no per-client admin theming needed now. Do this before
  onboarding HCTC/Atomic Finds visually.
- `digitalallies.net` is **not yet connected** to Supabase.
- Repo sprawl on GitHub (da-cms, DigitalAllies_CMS, Branddigitalalliesnet, etc.)
  — many overlapping old repos. Not urgent; leave untouched until we decide.

---

## Next steps (in order)

1. **Confirm the admin actually works** — Anthony logs in once at the Vercel URL
   as `contact@digitalallies.net` and sanity-checks the Press Office shows the
   seeded data. (One hands-on login; everything else is in place.)
2. **Apply `security-fixes.sql` + leaked-password toggle** — one paste into the
   Supabase SQL editor + one Auth setting. The only real hardening gap.
3. **Week 4 — the connected loop for DA:** build out the public block-renderer,
   the transmission loop (contact → message + email), then connect the real
   `digitalallies.net` to Supabase and do the domain/DNS cutover + launch QA.
4. Backfill the Day-04 `ARCHITECTURE.md` at a convenient point.

## Only-Anthony dependencies (not decisions — just hands-on)

- **Supabase SQL editor:** paste `supabase/security-fixes.sql` and Run; then Auth
  → Providers → Email → enable leaked-password protection. (Or add a Supabase
  access token so the agent can run SQL/DDL directly in future.)
- **One admin login** to confirm the Press Office works. Project:
  `auwhvicpyiwsubucanpb`.

## Operating mode

Claude Code / Antigravity **drive and decide** — no decision-questions back to
Anthony when there's a clear best move; override with a written reason and record
it here. Pull Anthony in only for hands-on external clicks. He trusts the setup.

---

*Update rule: after any large step, edit this file — move items between Done /
Next, bump the timestamp, note new decisions. Both agents rely on it.*
