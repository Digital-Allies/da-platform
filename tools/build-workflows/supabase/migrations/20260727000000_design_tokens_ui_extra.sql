-- ============================================================
-- design_tokens.ui_extra — button/card/spacing tokens from the admin
-- Theme Customizer (ThemeClient.tsx)
--
-- The Theme Customizer's Save button used to write flat columns
-- (primary_color, button_radius, button_glow, card_glow, section_spacing,
-- custom_tokens, ...) that don't exist on this table — every save failed
-- with a Postgres "column does not exist" error. The existing `spacing`
-- and `type_scale` jsonb columns looked like spare capacity but aren't:
-- they already hold real per-client data (see
-- seed-atomic-finds-design-tokens.sql — a numeric spacing scale and a
-- type scale), so reusing either would have silently overwritten that on
-- the next save instead of just failing loudly.
--
-- This adds a dedicated jsonb column for the button/card/spacing/custom
-- tokens instead. Additive only — safe to run any time.
-- Run in Supabase SQL Editor.
-- ============================================================

alter table design_tokens add column if not exists ui_extra jsonb;
