# da-platform — running status

**The shared source of truth for every AI agent (Claude Code + Antigravity) and
for Anthony.** Read this first, before doing anything. Update it after every
large step: what changed, what's true now, what's next. Keep it short and current
— stale status is worse than none.

**Last updated:** 2026-07-06 — by Claude Code (Opus 4.8)

---

## Decisions locked (do not re-litigate without a written reason)

1. **Repo structure = ONE monorepo.** `Digital-Allies/da-platform` is the single
   source of truth. The old individual repos still exist on GitHub but are
   **archive/backup only — do not commit to them.** Originals also sit in
   `../archive/pre-monorepo/`. Rationale: the multi-tenant model needs one shared
   codebase, not one repo per site.  *(Pending Anthony's explicit confirm — see
   Open questions.)*
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

**Not done / important truths**
- The **codebase is already well past Day 1** of the 30-Day Run (admin, public
  components, schema, auth all scaffolded). We must **audit where we actually are
  in the sequence and resume in order from the first incomplete step** — not
  redo Days 1–N.
- Supabase is **not seeded** and there is **no admin user yet**, so the admin
  looks empty and can't be logged into. (README "Step 1".)
- `digitalallies.net` is **not yet connected** to Supabase.
- Repo sprawl on GitHub (da-cms, DigitalAllies_CMS, Branddigitalalliesnet, etc.)
  — many overlapping old repos. Not urgent; leave untouched until we decide.

---

## Next steps (in order)

1. **Confirm repo direction** (monorepo vs individuals) — blocking, see below.
2. **Pin "you are here" on the 30-Day Run** — audit current code vs the sequence,
   mark the first genuinely-incomplete day.
3. **Finish CMS admin setup** so the Press Office is usable: run `supabase/
   seed-da.sql` + `security-fixes.sql`, enable leaked-password protection, invite
   the first admin user. (Needs Supabase dashboard clicks.)
4. Resume the 30-Day Run in order from the pinned point.

## Open questions (waiting on Anthony)

- [ ] Confirm: keep the **monorepo** as source of truth (recommended), and treat
      the individual GitHub repos as archive-only? Or revert to individual repos?
- [ ] Where do we run the Supabase steps — is the shared Supabase project
      (`auwhvicpyiwsubucanpb`) still the one to use?

---

*Update rule: after any large step, edit this file — move items between Done /
Next, bump the timestamp, note new decisions. Both agents rely on it.*
