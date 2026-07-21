# Theme Engine — Scope

Not built yet. This is the plan for making each client's site theme
admin-editable instead of hardcoded, per Anthony's 2026-07-21 direction
("the design system should eventually act as a live plugin for the admin
dashboard and give the user the ability to change the theme globally").

## Where things stand today

Two disconnected mechanisms, neither of which is what "global theme
editing" needs:

1. **`src/lib/theme.ts`** — `DesignTokens` (colors, fonts, radius) per
   client, hardcoded as TypeScript objects (`ATOMIC_TOKENS`, `DA_TOKENS`,
   `HCTC_TOKENS`), keyed by Supabase `client_id` in `TOKENS_BY_CLIENT`.
   `SiteTheme.tsx` reads this and sets `--tok-*` CSS variables on the
   public renderer. Changing a client's palette today means an engineer
   editing this file and redeploying — there is no admin path to it at
   all.
2. **`/admin/settings`** already has a `brand_color` field
   (`SettingsPage.tsx`), saved to the generic `settings` table
   (`client_id, key, value`, RLS-scoped, upsert-on-save). But nothing in
   the renderer reads `brand_color` — it's a dead field today, disconnected
   from what actually themes the site.

Separately, **`packages/design-system`** is Digital Allies' own brand
documentation (static HTML, no `package.json`, not imported anywhere) —
it is not related to either mechanism above and isn't the thing that
becomes a plugin. No change needed there.

## Goal

An admin user edits their site's full token set from `/admin/settings`
and it applies to their public site with no engineer/redeploy in the
loop.

## Design

Extend the **existing** `settings` table + UI pattern rather than add a
new table — it's already client-scoped, RLS'd, has a working save/upsert
flow, and `SettingsPage.tsx` already has a working color-swatch input to
build on.

1. Add `theme_*`-prefixed keys, one per `DesignTokens` field:
   `theme_bg`, `theme_surface`, `theme_text`, `theme_text_muted`,
   `theme_primary`, `theme_secondary`, `theme_border`,
   `theme_font_heading`, `theme_font_body`, `theme_radius`,
   `theme_radius_lg`.
   - Font fields should be a **constrained picker** (small curated
     allowlist), not freeform text — a bad `font-family` string is a
     silent, build-time-uncatchable breakage on a client's live site.
2. `theme.ts`'s hardcoded `TOKENS_BY_CLIENT` map becomes the
   **seed/fallback**, not the source of truth. `getDesignTokens()`
   becomes async: read from `settings` first, fall back to the hardcoded
   map for any client with no `theme_*` rows yet (so nothing breaks for
   clients not yet migrated).
3. `SiteTheme.tsx` currently runs as a synchronous client-agnostic
   function — needs its data fetched server-side and threaded down as a
   prop from wherever the page tree renders (already server-rendered),
   to avoid a flash-of-default-theme on load.
4. Admin `/admin/settings` gets a new "Theme" section, reusing the
   existing `SETTING_GROUPS` pattern — the swatch UI already exists for
   `brand_color`; extend it to the 11 `theme_*` keys plus a new
   font-picker control type.
5. **Later, not phase 1:** live preview (iframe or inline pane showing
   the swapped CSS vars before Save).

## Guardrail (STATUS.md decision #7)

The admin panel chrome itself stays Digital Allies-branded regardless of
what a client sets for their own site — this plan only touches the
public-site renderer path (`SiteTheme.tsx`), never `/admin/*` layout.

## Sequencing

1. No schema migration needed (reuses `settings`) — seed `theme_*` rows
   for the 3 existing clients (DA, HCTC, Atomic Finds) from `theme.ts`'s
   current hardcoded values, so the cutover changes nothing visually.
2. `getDesignTokens()` → async, settings-table read + hardcoded fallback.
3. Wire `SiteTheme.tsx` to the async path server-side.
4. Add the Theme section to `/admin/settings` (7 colors, 2 fonts,
   2 radii).
5. Regression-check: confirm DA/HCTC/Atomic Finds all render identically
   to today post-cutover — this should be invisible to end users at
   launch, only newly editable.
6. Later: live preview, richer font picker, per-block overrides.

## Explicitly out of scope here

- Responsive/mobile layout work — separate effort, see STATUS.md/TODO.md.
  A breakpoint/mobile-scale token could eventually live in this same
  `theme_*` key set, but the actual component CSS work is unrelated to
  this plan and shouldn't block it.
- Redesigning `packages/design-system` — unrelated system, unchanged.
