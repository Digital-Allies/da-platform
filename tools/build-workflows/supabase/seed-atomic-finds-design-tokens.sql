-- ============================================================
-- Atomic Finds ATX — Design Tokens Seed
-- CLIENT_ID: 443936d5-f92e-480b-b206-c65cfb52bdfc
--
-- Run in Supabase SQL Editor → New Query → Paste → Run
-- Run AFTER migrations (20260101000002_cms_tables.sql)
--
-- Populates the design_tokens table with the official Atomic Finds ATX
-- brand tokens. These mirror the values in:
--   tools/build-workflows/src/lib/theme.ts → ATOMIC_TOKENS
--
-- The admin dashboard's "Design" / "Theme" section reads from this table.
-- When Anthony edits brand colors/fonts in the admin, these rows are
-- the starting point Supabase writes back to.
--
-- Type scale uses a fluid Utopia-style major-third ratio. Spacing follows
-- a 4-point base grid. Both are stored as jsonb so the admin can surface
-- them visually without a migration.
--
-- logo / favicon: real asset paths relative to /public in the CMS engine.
-- Upload replacements via /admin/settings once final files are ready.
--
-- Safe to re-run: uses on conflict do update.
-- ============================================================

insert into design_tokens (
  client_id,
  colors,
  fonts,
  type_scale,
  spacing,
  logo,
  favicon
)
values (
  '443936d5-f92e-480b-b206-c65cfb52bdfc',

  -- ─── Colors ───────────────────────────────────────────────
  -- Source: theme.ts → ATOMIC_TOKENS.colors
  -- Celestial-70s dark palette: deep charcoal, warm-gold accents
  '{
    "bg":        "#1E1E1E",
    "surface":   "#2A2017",
    "text":      "#F0E8D8",
    "textMuted": "#9A8F7D",
    "primary":   "#F5C842",
    "secondary": "#D4822A",
    "border":    "rgba(245,200,66,0.15)",
    "gold":      "#C89B3C"
  }'::jsonb,

  -- ─── Fonts ────────────────────────────────────────────────
  -- Source: theme.ts → ATOMIC_TOKENS.fonts
  -- Bagel Fat One: bespoke display weight for hero/section titles
  -- DM Sans: clean, legible body copy
  '{
    "heading": "\"Bagel Fat One\", \"DM Serif Display\", Georgia, sans-serif",
    "body":    "\"DM Sans\", system-ui, sans-serif",
    "accent":  "\"Pacifico\", cursive"
  }'::jsonb,

  -- ─── Type Scale ───────────────────────────────────────────
  -- Major-third (1.25) ratio, base 16px
  -- xs → 4xl follows the admin's visual typography editor
  '{
    "xs":   "0.64rem",
    "sm":   "0.8rem",
    "base": "1rem",
    "lg":   "1.25rem",
    "xl":   "1.563rem",
    "2xl":  "1.953rem",
    "3xl":  "2.441rem",
    "4xl":  "3.052rem"
  }'::jsonb,

  -- ─── Spacing ──────────────────────────────────────────────
  -- 4-point base grid; 8 named stops for the admin UI
  '{
    "1":  "4px",
    "2":  "8px",
    "3":  "12px",
    "4":  "16px",
    "6":  "24px",
    "8":  "32px",
    "12": "48px",
    "16": "64px",
    "24": "96px"
  }'::jsonb,

  -- ─── Logo / Favicon ───────────────────────────────────────
  '/atomic-finds/logo.png',
  ''
)
on conflict (client_id)
do update set
  colors     = excluded.colors,
  fonts      = excluded.fonts,
  type_scale = excluded.type_scale,
  spacing    = excluded.spacing,
  logo       = excluded.logo,
  favicon    = case
                 when excluded.favicon = '' and design_tokens.favicon != ''
                 then design_tokens.favicon   -- don't blank out a real favicon
                 else excluded.favicon
               end,
  updated_at = now();
