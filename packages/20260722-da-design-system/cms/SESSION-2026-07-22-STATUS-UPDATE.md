## 2026-07-22 — Design-system session: CMS cleanup, Anthony task tracker, Page Editor prototype + spec, client templates

Paste into `da-platform/STATUS.md` above the most recent entry.

**Placement (current actual location):** these files live in the dated design-system snapshot folder `da-platform/packages/20260722-da-design-system/` — `cms/` at `.../20260722-da-design-system/cms/`, `client-docs/` at `.../20260722-da-design-system/client-docs/`. That folder is a design-system mirror/snapshot, **not live code or a deployed site** — the real engine is `tools/build-workflows`, where `client-docs/` moves once it's wired to real client records. (Folder naming in `packages/` is known-inconsistent — the dated `20260722-da-design-system` name vs. the canonical `packages/design-system` the architecture docs refer to; a repo-wide naming-convention pass is a deliberately-deferred future project, per Anthony.) This status-update file itself is a paste-in draft, not meant to be kept as a permanent doc.

- **Design-system project cleanup:** removed a stale bundled export
  (`Digital Allies CMS.html`) that duplicated `cms/dashboard.html`.
- **New: `cms/anthony-tasks.html`** — visual check-off tracker of every
  open `[Anthony]`-only item (Supabase/Vercel/registrar clicks), grouped
  by urgency, seeded from this file + `BUILD-SCHEDULE.md`. Checkbox
  state persists per-device via localStorage. Linked from `cms/index.html`
  + `cms/README.md`. Keep this in sync going forward — update the task
  list here whenever real status changes.
- **New: `cms/page-editor.html`** — clickable hi-fi prototype of the
  Pages block/section builder (the least production-ready admin area
  per Anthony's own Vercel Toolbar comments, "this build isn't meant for
  production"). Covers: section stack with reorder/duplicate/delete,
  inline content editor, a section-library modal to insert new blocks,
  a multi-tenant live-preview switcher (DA / Atomic Finds / HCTC token
  sets), and a subscription-tier gate (Starter/Pro/Agency) on the code
  editor. Design reference only — not wired to real data.
- **New: `cms/PAGE_EDITOR_SPEC.md`** — the Next.js implementation notes
  for the above: Page/Section data model, a `SECTION_REGISTRY` pattern
  (one entry per section type = schema + AdminForm + PublicBlock, so
  admin edit-forms and the public renderer never drift), API surface,
  and where section layouts should come from (DS-native components
  restyled per-client via `--tok-*`, or shadcnblocks/Mantine layout
  patterns copied for code ownership and re-skinned the same way).
  Also scopes the Starter/Pro/Agency gating and flags an open decision
  for Anthony: iframe vs. shadow-DOM sandboxing for Agency-tier custom
  section code.
- **New: `client-docs/welcome-letter.html` + `client-docs/setup-instructions.html`**
  — printable, brand-voiced client onboarding documents (doc-page based,
  DA tokens/fonts), with bracketed fill-in fields. Static for now per
  Anthony's call — wiring to real client records into the CMS is a later
  phase, not scoped yet.
- **Not done this session, explicitly deferred:** rebuilding
  `CMS_IMPLEMENTATION_PLAN.html`'s generic Node/Express/Mongo tech-stack
  section to match the real Next.js/Supabase architecture — still
  inaccurate, flagged for a follow-up pass.
- **Open decision surfaced, not resolved:** whether `digitalallies.net`
  gets rebuilt on-platform (real Pages/Press Office/Settings, matching
  the "Connected" tier clients already get) vs. staying static with
  targeted patches. Recommendation from the design session: rebuild is
  the right long-term move (per decision #2's "one platform, three
  faces" model — DA's own site should eat its own dog food and stop
  needing hand-ported fixes into a separate frozen repo), but sequence
  it AFTER the Pages/section-builder work above actually ships against
  real data — rebuilding onto a still-unfinished page editor just moves
  the same gaps onto a second codebase.

## Addendum (same session, later) — module naming + page templates decision

Anthony clarified real intent after seeing the prototype: **the admin
backend is one shared build for every client** — so client-facing module
names must be generic (Services / Testimonials / Blog / Articles /
Contact / Settings), NOT Digital Allies' own proprietary vocabulary (The
Departments / Field Notes / The Press Office / Command Center). Reserve
DA's jargon for DA's OWN admin instance only, via a per-tenant label map
over the same registry/nav data — not a second codebase.

Also: a **page-template picker** (separate from the section library) is
now scoped — new pages start from Blank / Home / Blog Post / Case Study
(generic, every client) or, **DA-tenant only**, Service/Tool Detail +
Services Index — which should literally be built FROM this design
system's existing `ToolDetail.dc.html` / `ServicesIndex.dc.html`, not a
re-derivation. Other clients get their own equivalent templates once
their own design systems exist.

`cms/page-editor.html` and `cms/PAGE_EDITOR_SPEC.md` updated to reflect
both changes. New client doc added: `client-docs/platform-access-guide.html`
— post-launch "how to accept your invite email, log in, and find key
URLs" doc (the welcome letter + setup instructions docs from earlier in
this session cover PRE-launch onboarding; this one covers POST-launch
access, per Anthony's follow-up ask).

## Addendum 2 — deep-review pass against ARCHITECTURE.md / PIPELINE.md / THEME_ENGINE_PLAN.md / TODO.md

Anthony asked for a full reconciliation pass before he ports this session's
work into the real folders. Real conflicts/corrections found, all now
reflected in `cms/PAGE_EDITOR_SPEC.md`'s new "Reconciliation" section:

1. **Schema:** the spec first proposed normalized `Section` rows; the real
   `pages` table already stores `blocks` as one `jsonb` array. Corrected to
   match — no migration needed for the base model.
2. **Naming:** `BlockRenderer.tsx`'s block-type KEYS are already generic
   (`services`, `testimonials`, not `departments`/`fieldnotes`) — only the
   admin NAV LABELS in `AdminNav.tsx` carry DA jargon ("The Departments",
   "Field Notes", "Command Center"), for every tenant, today. The
   generic-by-default / DA-only-override naming decision from this session
   is real, unbuilt code work — a per-tenant label map doesn't exist yet.
3. **Multi-tenant preview switcher:** the prototype's DA/Atomic
   Finds/HCTC live-preview switcher is a design-review convenience only —
   flagged explicitly so it doesn't get built literally. Real architecture
   is one deployment = one client, no runtime tenant switching
   (`ARCHITECTURE.md`).
4. **Blog Post / Case Study page templates:** conflicts with the existing
   separate `posts` table + Tiptap editor ("The Press Office"). Corrected —
   removed from the page-shell template picker's real-build scope; they
   belong as content *types* inside the Posts module instead, matching
   `CMS_IMPLEMENTATION_PLAN.html`'s original scoping for that module.
5. **Subscription tiers:** no conflict, good news — a `clients.plan`
   column migration already exists
   (`supabase/migrations/20260109000000_client_plan.sql`, unapplied, no
   gating logic yet). The Starter/Pro/Agency code-editor gate in this
   session's prototype should read that column rather than add a second
   plan field.
6. **Global design-token / theme editor** (the other admin-priority item
   from this session's questions): already fully scoped in
   `THEME_ENGINE_PLAN.md` (extend `settings` with `theme_*` keys). No
   overlap with the page-editor work, but noting it so nobody re-scopes it
   from scratch — follow that doc's own sequencing.

No other conflicts found against `PIPELINE.md`'s locked vocabulary (Platform
/ Admin / Brand / Website, Templated / Connected) — this session's UI-copy
changes are module display names, not Platform-level naming, so they don't
violate PIPELINE.md's "we are done rebranding" line.

