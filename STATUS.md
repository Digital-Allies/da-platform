# da-platform — running status

**The shared source of truth for every AI agent (Claude Code + Antigravity) and
for Anthony.** Read this first, before doing anything. Update it after every
large step: what changed, what's true now, what's next. Keep it short and current
— stale status is worse than none.

**Last updated:** 2026-07-21 — by Claude Code (daily build session —
`ARCHITECTURE.md` backfilled; found the Services/Testimonials admin module
already exists, contradicting the Jul 22–23 schedule slot — see below)
**Week of July 13 Core Tasks Completed:** Dynamic block renderer (`BlockRenderer.tsx`), root dynamic catch-all pages (`[slug]/page.tsx`), and contact form block integration in the page editor + renderer are fully implemented and verified. Next.js compiles with zero errors.
Prior: Mobile login layout fixed + Step 2 client theming finished with Google Fonts loaded and CSS scope overrides.

## 2026-07-21 — daily build session: `ARCHITECTURE.md` backfilled

Ran the scheduled Tue Jul 21 `BUILD-SCHEDULE.md` item (the Day-04 doc that's
been outstanding since 2026-07-09). No `[Anthony]` blockers applied — this
was a standalone docs task.

- **`tools/build-workflows/ARCHITECTURE.md` written** from the CMS Build
  Plan's original Vercel/architecture layout, reconciled line-by-line against
  the actual `src/` tree rather than transcribed from the plan doc as-is (per
  CLAUDE.md's "trust the code over old notes" rule — and it paid off, see
  next item). Covers stack, multi-tenancy model, full route structure, the
  data layer (and where it diverges from the original `lib/store.ts` design),
  the content model/schema, the block-registry renderer, and the auth
  middleware. `npx tsc --noEmit` clean (docs-only change, no code touched).

- **Real finding, not just a writing exercise: the Services/Testimonials
  admin module already exists.** Both `STATUS.md` (Major need #4) and
  `BUILD-SCHEDULE.md` (Week of Jul 20, Wed–Thu Jul 22–23 slot) describe this
  as unbuilt — "CMS admin has no Services/Testimonials module... editing
  needs raw SQL." That's stale. `src/app/admin/(protected)/services/page.tsx`
  ("The Departments") and `.../testimonials/page.tsx` ("Field Notes") are
  full CRUD UIs — add/edit/delete/reorder, wired to the real `services`/
  `testimonials` tables (`client_id` + RLS), linked in `AdminNav.tsx`. `git
  log` shows this predates even this monorepo's Jul 6 import — it's not new
  work landing unnoticed, it's been there the whole time and the docs never
  caught up. **Action taken:** the Jul 22–23 schedule slot below is marked
  superseded; don't pick it up as originally scoped. Full detail + the one
  narrower gap that's still real (the *static* `sites/digitalallies`
  `cms-loader.js` HTML-escaping port, a different codebase entirely) is in
  `ARCHITECTURE.md`'s "Correction to STATUS.md" section — read that before
  touching this area again.

## 2026-07-20 — daily build session: two Mon Jul 20 code fixes shipped

Ran the scheduled Mon Jul 20 `BUILD-SCHEDULE.md` item. All four `[Anthony]`
items for today (security-fixes.sql, leaked-password protection, the
2026-07-17 audit confirmations, PR #1 review/merge) are dashboard-only —
none blocked the two `[Agent]` items, so both were done independently:

- **Escaped HTML in `cms-loader.js`'s card-building code**
  (`sites/digitalallies/assets/js/cms-loader.js`). Centralized the fix in
  `parseBilingual()` (added an `escapeHtml()` helper it now runs both
  language variants through, since every caller interpolates the result
  into `innerHTML`) plus three direct call sites that bypassed it
  (`svc.icon`, `art.type`, `art.slug`). Verified the escaping itself with a
  quick node check (`<script>`/`onerror` payloads come back neutralized)
  and verified the page still renders with no console errors by serving
  the static files locally and checking in-browser.
- **Removed the dead `tailwind.config` block** — turned out to be site-wide,
  not just `index.html` as STATUS.md previously scoped it: **13 of 15**
  HTML files in `sites/digitalallies` had the block (two single-line
  variants in `learn/dept-cooperation.html` and
  `learn/self-governing-bureau.html`, the rest multi-line), and **none** of
  the 15 load the Tailwind CDN script that would make `tailwind.config`
  a defined global — every page was throwing a `ReferenceError` on load.
  Removed all 13, verified in-browser (multi-line and single-line variants
  both spot-checked) that styling is untouched (site is precompiled/
  self-hosted Tailwind, `tailwind.min.css` doesn't need the config) and the
  console is clean.

**⚠ Important caveat, don't skip past this:** `sites/digitalallies` in this
monorepo is the frozen one-time import noted in the 2026-07-16 audit below
(`git log` confirms exactly one commit ever touched these files — the
import itself, `2a84e5c`) — it is **not** the source the live
digitalallies.net deploys from (that's the separate
`Digital-Allies/DigitalAllies` repo). So these two fixes are real and
verified *in this repo's copy*, but **won't take effect on the live site**
until Anthony manually ports them to `Digital-Allies/DigitalAllies` — same
pattern as the Supabase-data and duplicated-`<html>` fixes he applied
directly there on 2026-07-16. Added as a new checklist item in `TODO.md`.

Both fixes got auto-committed and pushed by the 15-min sync script mid-session
(`chore: sync MM23 2026-07-20 16:48`, `6876c63`) before a descriptive commit
message could be written — noting the real "why" here since the commit
message itself doesn't carry it.

**Not started, correctly so:** the next `[Agent]` item in schedule order is
Tue Jul 21's `ARCHITECTURE.md` backfill — left for tomorrow's scheduled run
rather than front-run today, per the one-task-per-weekday cadence.

## 2026-07-19 — admin login: real bug found, after a wrong first guess

**✅ Login confirmed working, no reset needed after all** — Anthony logged
in fine on both domains shortly after. The password reset flow built above
is still a real, permanent gap-fill (there genuinely was no way to trigger
one before), just turned out not to be needed in the moment.

**"Malformed placeholder" mystery resolved — not a regression.** Checked
Vercel Toolbar comments on the admin deployment: 10 comments, all posted by
Anthony (`cassellac`) **~23 days before this entry** (i.e. well before the
Jul 10 monorepo switch), 3 marked resolved and 7 still open. These are
Anthony's own notes that large parts of the admin dashboard were
placeholder/unfinished from early on — nothing was lost or regressed in
the repo switch, it's the same known gaps, still open:

- `/admin` (Dashboard): ~~"dashboard is not wired to real data"~~,
  ~~"fake numbers"~~ — both resolved.
- `/admin/development` ("The Workshop"): **open** — "doesn't work needs
  templates"; "cms needs to be connected to actual site - digitalallies.net";
  "real notifications need to be [built]"; "there is no login/out button."
- `/admin/projects`: **open** — "doesn't work and need to build actual
  project templates."
- `/admin/content` ("The Press Office"): **open** — "needs to include
  templates for all category tabs as well as connect to the primary site
  for posting in the same format as the digitalallies.net/learn/ page
  articles."
- `/admin/pages`: **open** — "this build isn't meant for production — new
  pages should offer a code option with live preview and use actual
  components for elements, sections, cards, etc."
- `/admin/research`: ~~"doesn't work needs templates"~~ — resolved.

**These are real code tasks, not Anthony-dashboard clicks** — belongs here
in STATUS.md's backlog, not `TODO.md`. Not started; needs prioritization
before picking any of these up (see Next steps).

Anthony reported `/admin/login` broken and the Vercel project possibly not
re-pointed to the monorepo. **First pass got it wrong — corrected here
rather than left standing:** claimed the Vercel Git connection was still on
the old disconnected repo and that this explained a "redirect away from
/admin/login." Neither held up. Anthony's own screenshot plus Vercel's
deployment history show the project has been correctly connected to
`Digital-Allies/da-platform` since Jul 10, auto-deploying successfully ever
since. The "redirect" was a misread of a browser tool's output (it reports
tab origin, not full path) — the login page was rendering the whole time.
Lesson: verify by reading the actual page/response, not by trusting a
tool's summary line.

**The real bug, found by actually submitting the live form:** it returned
a genuine Supabase error, **"Legacy API keys are disabled."** The anon/
service-role key values baked into this deployment were still legacy-
format, despite the Vercel↔Supabase integration badge being present on
those variables — the integration hadn't actually re-synced after legacy
keys got disabled. **Fixed by Anthony:** manually updated both to current
Publishable/Secret values.

**✅ Verified fixed, same session:** the docs-correction commit triggered
a fresh deployment; once it showed READY, re-submitted the live login form
with a deliberately wrong password. The error changed from "Legacy API
keys are disabled" to "Invalid login credentials" — the correct behavior
of a working auth system, confirming the key fix actually took effect.
Also confirmed in that same test: the login page now shows "DIGITAL
ALLIES" instead of the generic fallback business name, and
`cms.digitalallies.net` is now a live alias on this deployment — the
domain connection Anthony was setting up completed successfully.

**Also surfaced:** `NEXT_PUBLIC_SUPABASE_URL`, `CONTACT_FORM_TO_EMAIL`,
`RESEND_API_KEY`, `NEXT_PUBLIC_CLIENT_ID` on this project are manually-
entered, not integration-synced — and, worth being explicit about since it
came up directly: **Vercel env vars have no connection whatsoever to the
repo's `.env.local`.** Pushing commits never syncs them; `.env.local` is
gitignored and Vercel wouldn't read it for its own config even if it
weren't. Full detail in `TODO.md` Priority 1.

- **`cms.digitalallies.net`'s root now redirects to `/admin/login`** instead
  of showing the generic "My Business"/"Welcome" fallback — fixed in code,
  scoped to that hostname only (verified locally against a spoofed `Host`
  header), pushed to `main`. This part of the diagnosis was correct.
- **Backlog idea captured, not scheduled:** per-site document storage in
  the admin (contracts/invoices/client uploads) — see `TODO.md`'s new
  Backlog section.

## 2026-07-17 — Atomic Finds catalog, Vercel/Supabase audit, tooling additions

- **Atomic Finds product catalog started.** PR
  [#1](https://github.com/Digital-Allies/da-platform/pull/1) adds a
  `products` table (same client_id + RLS convention as
  services/testimonials), a `getProducts()` data function, and seeds 4 real
  listings from Jennyfer's (Atomic Finds owner) Facebook Marketplace
  catalog — real data, not placeholders. Not merged/applied yet — the
  migration + seed are files to review and run in the Supabase SQL editor,
  nothing touches the live DB automatically. Still needed: a 5th product
  (cut off mid-paste), real product photos (`image_url` is null for all
  four on purpose), and the frontend catalog components (still being
  designed). Full checklist: `tools/build-workflows/tasks/anthony/TODO.md`
  Priority 5.
- **Reality check on Atomic Finds, since it came up directly:** there is no
  live Atomic Finds site. What exists in `sites/atomic-finds` is a design
  system/component showcase, a few standalone prototypes (Galaxy Card,
  scroll-hero experiments), and planning docs — not a built product site.
  **Treat the "v3 layered rebuild — APPROVED" note and the Celestial Scroll
  Hero write-up further down this file with caution** — when asked
  directly, Anthony did not recognize those as things he'd signed off on.
  Don't take "APPROVED"/"CONFIRMED" language elsewhere in this file at face
  value going forward; confirm with Anthony before treating a past
  session's characterization of a decision as settled.
- **Read-only Vercel/Supabase audit (Claude in Chrome) found real gaps** —
  full list + exact fix steps in `TODO.md` Priority 4. Highlights:
  `da-webwssite-build-workflows` is missing `NEXT_PUBLIC_SITE_URL` entirely;
  `healthcare-training-center`'s Supabase keys are manually-pasted, not
  integration-managed; two duplicate Supabase key pairs exist
  ("default" + "supabase_anon_new"/"supabase_service_role_new"); new
  per-site Resend keys (generated after the shared one was flagged
  compromised) exist only in local `.env.local`, not in Vercel yet.
- **Standing constraint, not a bug:** we're on free-tier Vercel/Supabase.
  Vercel's Supabase integration caps out at 2 connected projects, already
  used. Any additional Vercel project (HCTC now, Atomic Finds once it gets
  one) needs its Supabase keys pasted in by hand, and **every future key
  rotation has to be manually repeated on those non-integration-managed
  projects** — they won't self-update. Checklist is in `TODO.md` Priority 4.
  Resolves itself once there's revenue to justify the paid tier; not worth
  re-architecting around in the meantime.
- **`cms.digitalallies.net` domain connection in progress** (Anthony,
  2026-07-17) — steps in `TODO.md` Priority 4.
- **Greptile added for code review** (Anthony, 2026-07-17) —
  `https://app.greptile.com/digital-allies/`. Review findings on this repo
  now come through Greptile directly to the agent, in addition to whatever
  review happens in-session.
- **Clarified: da-platform's `sites/` folders are sometimes used for
  general storage, not only build source** — e.g. the
  `healthcare-training-center/review/Caladrius Brand Review - Standalone.html`
  file flagged as a mystery on 2026-07-16 was intentional (Anthony). Don't
  treat every unexpected file in a site folder as a bug — the actual
  stray-file problem this file has tracked (loose numbered downloads
  dumped at a project's *root*, e.g. the `magical-village-assets (N).png`
  pattern found in other projects) is a different, narrower thing than
  Anthony deliberately parking a reference doc in a subfolder.

## 2026-07-16 audit — what changed since Jul 9

A full stock-take of this file against live reality, prompted by Anthony
noticing digitalallies.net was serving placeholder Supabase content. Findings:

- **digitalallies.net and the CMS admin engine are two separate Vercel
  projects — this file previously conflated them.** Confirmed via Vercel's
  API (team `digital-allies`):
  - **`digital-allies`** project → `digitalallies.net` / `www.digitalallies.net`.
    This is the static marketing site (source repo: the separate GitHub repo
    `Digital-Allies/DigitalAllies`, **not** this monorepo — `sites/digitalallies`
    here is a one-time historical import from `2a84e5c`, frozen at import
    time, with no commits since. Don't treat it as source of truth for this
    site; it's stale.
  - **`da-webwssite-build-workflows`** project → the Next.js CMS admin engine
    (`tools/build-workflows`). This is the one still connected to the wrong
    repo (`cassellac/da-webwssite-build-workflows` instead of
    `Digital-Allies/da-platform`) — see Major needs #2 below.
- **`digitalallies.net` IS connected to Supabase** (the line below claiming
  otherwise is stale — removing it). A Claude-in-Chrome session found the
  `services`/`testimonials` tables held generic placeholder demo rows
  (fake departments, fake testimonials, Lucide icon *names* rendering as
  literal text because `cms-loader.js` only knows emoji) and replaced them
  with the real bilingual copy from the live site. While verifying, that
  session also found the live `index.html` had the **entire document
  duplicated** (two `<html>`/`<head>`/`<body>`), which silently broke the
  EN/ES toggle site-wide via a `LanguageController` redeclaration
  `SyntaxError`. Anthony fixed both the Supabase data and the duplicated
  HTML directly on the live repo since then. **Verified live just now:** no
  console errors, real content renders, EN/ES toggle correctly re-translates
  the page (checked index, privacy.html, /learn/).
- **Auto-sync + health-check automations were silently broken since Jul 7,
  fixed this session.** A Jul 7 reorg moved the working scripts into
  `projects/air-setup/` but the already-installed launchd plists on this Mac
  still pointed at the old flat `projects/sync.sh` / `projects/sync-health.sh`
  paths, which didn't exist — every 15-min sync and 3-hr health check failed
  immediately (exit 127) for 53+ hours (last successful auto-commit before
  the fix: Jul 14 02:18). Fixed by copying the working scripts into the flat
  path and reloading the launchd jobs; a fresh sync commit landed immediately
  after. `db-backup-reminder` (Saturdays 9am) was also pointed at a missing
  script but is calendar-scheduled so hadn't audibly failed yet — fixed the
  same way.
- **`cms-suite/` was a misplaced nested repo** (its own git history, pointed
  at `github.com/cassellac/cms-suite`) sitting untracked inside da-platform's
  root, picked up once as an accidental gitlink by the broken auto-sync
  script. Moved to `~/Claude/projects/cms-suite/` (its own project folder,
  history intact), the accidental gitlink commit reverted, and it's now
  gitignored here so it can't recur.

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

### v3 layered rebuild — status disputed, see 2026-07-17 note above
**⚠ 2026-07-17: Anthony did not recognize this as something he'd approved
when asked directly — do not resume this plan as-is without checking with
him first.** Leaving the original write-up below for reference only.

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
- **Jenny Breedlove Hero (2026-07-10):**
  - **What:** Completed the Breedlove-inspired scroll animation hero for Jenny using her 7 portrait frames. Added snappy dissolves, zoom push-in, grid lines, vertical Nominee badge, corner metadata text, and a Day/Night theme toggle (Night mode: #0c0b0f background/neon-gold text; Gold mode: #211917 background/sunset-copper text/scrim overlay).
  - **Deliverables:** Scoped Duda-compatible code blocks (HTML/CSS/JS) and standalone preview workspace in `sites/atomic-finds/scroll-animation-hero-2/index.html`. Written walkthrough details in `walkthrough.md`.
  - **Status:** Done. Dev server launched on port 8080.
- **Image tooling:** nano-banana is DEAD (retired Gemini model → 404). Use
  **higgsfield** (Pro trial active — prioritize) or **openart** for generation;
  Adobe `image_remove_background` works for one-off cutouts (manual picker only).
  `sips -Z` (no `-s format`) preserves alpha. Character must follow the guidelines
  in the scroll-animation-hero-component directory.

## Automation + ops (2026-07-06, repaired 2026-07-16)
- **Sync health monitor installed.** `../sync-health.sh` + launchd agent
  `com.digitalallies.sync-health` (every 3 hr) reads the sync logs, walks every
  repo, and **notifies only on problems** (stale sync, push failures, stuck git
  locks, oversized tracked files, missing remotes). Details + known issues:
  `../SYNC-NOTES.md`. Run `./sync-health.sh` anytime (read-only).
- **2026-07-16: found and fixed a silent 53+ hour outage.** A Jul 7 reorg
  moved the working sync/health scripts into `projects/air-setup/`, but the
  launchd plists already installed on this Mac still pointed at the old flat
  `projects/sync.sh` / `projects/sync-health.sh` paths — neither existed, so
  every scheduled run failed instantly (exit 127) from shortly after Jul 7
  until this fix. Confirmed via `launchctl list` (exit 32512) and the git log
  (`chore: sync MM23` commits stopped dead at Jul 14 02:18). Fixed by copying
  `air-setup/{sync,sync-health,db-backup-reminder,maintenance-status}.sh` into
  the flat `projects/` path the plists expect, then `launchctl unload`/`load`
  on all three agents. Verified: a fresh sync commit landed within seconds of
  the reload. **Note for whoever bootstraps the MacBook Air later:**
  `air-setup/bootstrap-air.sh` is still the right tool for that machine —
  this fix only addressed the already-installed agents on this Mac (Mini/MM23).
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
   (**Caveat, 2026-07-16:** this decision's "private" framing was wrong in
   practice — the repo was actually public on GitHub until fixed that day.
   Verify security-sensitive claims like this against the live GitHub
   settings rather than trusting this file, which is exactly how that drift
   went unnoticed.)
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
- **2026-07-16:** `../AGENTS.md` didn't actually exist on disk (this file's own
  reference to it was stale) — recreated it with the one convention that
  mattered right now (where generated/downloaded files belong, so they stop
  landing loose in project roots). Still no sync path to the Air; still local
  to this Mac only.

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
- **The CMS admin engine's Vercel project deploys from the OLD repo, not the monorepo.** The live app (`da-webwssite-build-workflows.vercel.app`) still builds from `cassellac/da-webwssite-build-workflows`. Same code today, but re-point Vercel at `Digital-Allies/da-platform` (root `tools/build-workflows`) so production deploys come from the source of truth. Loose end — do before shipping changes. (This is the CMS *admin* app — NOT digitalallies.net, which is a separate Vercel project/repo; see "2026-07-16 audit" above.)
- Note: the DA `brand_color` fix lives in Supabase (live data), not in git.
- `digitalallies.net` **is connected to Supabase** and verified working as of 2026-07-16 (real content, EN/ES toggle functional) — see "2026-07-16 audit" above. It deploys from the separate `Digital-Allies/DigitalAllies` repo, not this monorepo.
- Repo sprawl on GitHub — archive old repos later.
- **CMS admin has no Services/Testimonials module.** Editing that content today means hand-written SQL in the Supabase table editor. Needed before "fully connecting" digitalallies.net's content the way it should work long-term.
- **`cms-loader.js` builds cards via unescaped `innerHTML`.** Fine while only Claude/Anthony touch the DB directly; becomes a real injection risk once a Services/Testimonials admin module exists and non-developers can enter content. Fix before that module ships.
- **Dead `tailwind.config = {...}` block** in digitalallies.net's inline script references a CDN Tailwind global that isn't loaded (site is precompiled/self-hosted) — harmless but throws a `ReferenceError` on every page load. Small cleanup, low priority.

---

## Major needs / known issues (prioritized)

**Status unknown as of 2026-07-17 — needs confirming, not assumed done:**
whether `security-fixes.sql` has been applied, whether leaked-password
protection is on, and whether the CMS admin engine's Vercel Git connection
has actually been re-pointed to the monorepo. All three were open as of
2026-07-16 and haven't been explicitly confirmed since.

1. **Apply `security-fixes.sql` + enable leaked-password protection** — Supabase SQL editor + one Auth toggle. Also directly confirmed by Supabase's own Security Advisor (2026-07-17 audit: 6 warnings, including the exact RLS/`SECURITY DEFINER` issues this file fixes). (Anthony Dependency)
2. ~~Rotate the leaked Supabase `service_role` key~~ — **done 2026-07-16.** Turned out more urgent than previously documented: `Digital-Allies/da-platform` was actually **public** on GitHub (STATUS.md's own decision #1 wrongly assumed private), so the leaked key was live-exposed, not a future risk. Anthony migrated to Supabase's new Publishable/Secret key system, disabled legacy keys (killing the old leaked one), updated the new Secret key in Vercel + `.env.local`, and made the repo private. Verified live: digitalallies.net and the CMS admin engine both work cleanly post-rotation.
3. ~~Re-point the CMS admin engine's Vercel project at the monorepo~~ — **confirmed done, 2026-07-19** (connected to `Digital-Allies/da-platform` since Jul 10, per Anthony's screenshot + Vercel deployment history — earlier claims in this file that it was still on the old repo were wrong, corrected). This is **only** the CMS admin app — digitalallies.net is a separate, already-correct Vercel project (see 2026-07-16 audit).
4. ~~Build the missing Services/Testimonials admin module~~ — **already
   exists, confirmed 2026-07-21** (`ARCHITECTURE.md`'s correction section has
   full detail). This need is resolved; what's left is unrelated: porting
   the `cms-loader.js` HTML-escaping fix (below) to the live static site.
5. **Escape HTML in `cms-loader.js`'s card-building code** — done in this
   monorepo's copy 2026-07-20, still needs manual porting to the live
   `Digital-Allies/DigitalAllies` repo (separate codebase from the admin
   module above — see `TODO.md` Backlog).
6. **2026-07-17 Vercel/Supabase audit fixes + Atomic Finds onboarding** — full checklist in `TODO.md` Priorities 4–5, not duplicated here.

## Next steps (in order)

1. ~~Add basic HTML-escaping to `cms-loader.js`'s card-building code~~ — done 2026-07-20 (this repo's copy); still needs manual porting to the live `Digital-Allies/DigitalAllies` repo.
2. ~~Remove the dead `tailwind.config` block from digitalallies.net's inline script~~ — done 2026-07-20; same live-repo porting gap as above.
3. ~~Build the missing Services/Testimonials admin module~~ — turned out to already exist, confirmed 2026-07-21 (see ARCHITECTURE.md).
4. **Anthony-only:** rotate the leaked `service_role` key; apply `security-fixes.sql` + enable leaked-password protection; re-point the `da-webwssite-build-workflows` Vercel project to `Digital-Allies/da-platform` (root `tools/build-workflows`).
5. **The original Day 19/20 domain cutover is still the real end-state goal, just not yet — do after 4.** `BUILD-SCHEDULE.md` originally called for pointing `digitalallies.net` itself at the Next.js CMS engine (the "Templated" tier from decision #2) and retiring the separate static-site repo. Today's setup — static site + `cms-loader.js` pulling from Supabase — is the "Connected" tier working as designed, and it's live and fine, but it isn't the full cutover the 30-Day Run originally scoped. Revisit whether full cutover is still the goal now that the admin module (step 3) is confirmed to exist; if so: add `digitalallies.net`/`www` to the `da-webwssite-build-workflows` Vercel project, update Supabase Auth Site URL + redirect URLs, verify magic-link login and the contact form on the real domain, confirm anon/draft RLS, then switch DNS.
6. ~~Backfill the Day-04 `ARCHITECTURE.md`~~ — done 2026-07-21.
7. Pick the next real `BUILD-SCHEDULE.md` item now that Jul 22–23's original
   slot (Services/Testimonials) is moot — see that file's Week of Jul 20
   section for the note, and decide what fills the freed time (dashboard
   backlog items from Week of Jul 27 are the next real code work, but check
   for anything higher-priority first).

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
