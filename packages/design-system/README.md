# packages/design-system

Shared components, tokens, and design/spec reference docs for da-platform.
This is NOT the CMS. **The real CMS is the Next.js app at
`tools/build-workflows/src/`** — see the repo root `AGENTS.md` and `STATUS.md`
for current state.

## What's actually live (imported by `tools/build-workflows`)

- `src/components/LanguageSwitcher.tsx`
- `src/tokens/index.ts`

Everything else in this folder is design reference or spec documentation —
useful for planning, not wired into any running app.

## Reference docs still current

- `CMS_IMPLEMENTATION_PLAN.html` — spec: what the CMS must include, phased build plan
- `WIRING_GUIDE.md` — how the site, dashboard, and Supabase connect
- `INTEGRATION_OVERVIEW.md` — architecture overview
- `PAGE_EDITOR_SPEC.md` + `page-editor.html` — data model and clickable prototype
  for the block/section page builder (actively cited as build source, see STATUS.md)
- `anthony-tasks.html` — Anthony's personal task tracker, synced from
  `STATUS.md` / `BUILD-SCHEDULE.md`
- `AF_COLLECTIONS_PAGE_EDITOR_BUILD.md`, `AF_PAGE_EDITOR_BUILD_PLAN.md`,
  `ATOMIC_FINDS_TOKEN_SYNC_CHECKLIST.md`, `DIGITALALLIES-REBUILD-BRIEF.md` —
  client-specific planning docs

## Rule

Per `AGENTS.md` § "Repository hygiene — non-negotiable": any design export or
mockup in this folder (Figma Make output, Claude Design handoffs, `.dc.html`
files) exists only until it's ported into real code in `tools/build-workflows`.
Once ported and verified, delete the export in the same commit — don't leave
it here "for reference." This file was previously stale (called a dead HTML
prototype "THE CMS", pointed at `../CMS_IMPLEMENTATION_PLAN.html` when the
file is actually a sibling in this same folder, and linked to a `cms/` folder
structure and `_archive/` directory that never existed at these paths) —
cleaned up 2026-08-02. Keep it accurate going forward.
