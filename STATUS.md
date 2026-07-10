# da-platform — running status

**The shared source of truth for every AI agent (Claude Code + Antigravity) and
for Anthony.** Read this first, before doing anything. Update it after every
large step: what changed, what's true now, what's next. Keep it short and current
— stale status is worse than none.

**Last updated:** 2026-07-09 — by Antigravity (Gemini 3.5 Flash)
**Week of July 13 Core Tasks Completed:** Dynamic block renderer (`BlockRenderer.tsx`), root dynamic catch-all pages (`[slug]/page.tsx`), and contact form block integration in the page editor + renderer are fully implemented and verified. Next.js compiles with zero errors.
Prior: Mobile login layout fixed + Step 2 client theming finished with Google Fonts loaded and CSS scope overrides.

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

### v3 layered rebuild — APPROVED, IN PROGRESS (resume here)
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
- **Image tooling:** nano-banana is DEAD (retired Gemini model → 404). Use
  **higgsfield** (Pro trial active — prioritize) or **openart** for generation;
  Adobe `image_remove_background` works for one-off cutouts (manual picker only).
  `sips -Z` (no `-s format`) preserves alpha. Character must follow the guidelines
  in the scroll-animation-hero-component directory.

## Automation + ops (2026-07-06)
- **Sync health monitor installed.** `../sync-health.sh` + launchd agent
  `com.digitalallies.sync-health` (every 3 hr) reads the sync logs, walks every
  repo, and **notifies only on problems** (stale sync, push failures, stuck git
  locks, oversized tracked files, missing remotes). Details + known issues:
  `../SYNC-NOTES.md`. Run `./sync-health.sh` anytime (read-only).
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
- **Vercel deploys from the OLD repo, not the monorepo.** The live app (`da-webwssite-build-workflows.vercel.app`) still builds from `cassellac/da-webwssite-build-workflows`. Same code today, but re-point Vercel at `Digital-Allies/da-platform` (root `tools/build-workflows`) so production deploys come from the source of truth. Loose end — do before shipping changes.
- Note: the DA `brand_color` fix lives in Supabase (live data), not in git.
- `digitalallies.net` is **not yet connected** to Supabase.
- Repo sprawl on GitHub — archive old repos later.

---

## Major needs / known issues (prioritized)

1. **Apply `security-fixes.sql` + enable leaked-password protection** — Supabase SQL editor + one Auth toggle. The only real hardening gap. (Anthony Dependency)
2. **Re-point Vercel at the monorepo** — the live app still deploys from the old repo `cassellac/da-webwssite-build-workflows`, not `Digital-Allies/da-platform` (root `tools/build-workflows`). Do before shipping further changes. (Anthony Dependency)

## Next steps (in order)

1. **Apply `security-fixes.sql` + leaked-password toggle** — one paste into the Supabase SQL editor + one Auth setting.
2. **Re-point Vercel at the monorepo** — update deployment repo in Vercel.
3. **Domain + DNS Cutover (Day 19) & Launch QA (Day 20)** — point `digitalallies.net` DNS to Vercel, verify magic-link login on the live domain, test contact form email routing, and confirm anon/draft visibility RLS works.
4. Backfill the Day-04 `ARCHITECTURE.md` at a convenient point.

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

---

*Update rule: after any large step, edit this file — move items between Done /
Next, bump the timestamp, note new decisions. Both agents rely on it.*
