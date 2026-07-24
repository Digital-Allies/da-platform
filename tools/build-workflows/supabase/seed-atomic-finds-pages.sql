-- ============================================================
-- Atomic Finds ATX — Pages Seed
-- CLIENT_ID: 443936d5-f92e-480b-b206-c65cfb52bdfc
--
-- Run in Supabase SQL Editor → New Query → Paste → Run
-- Run AFTER migrations and seed-atomic-finds-settings.sql
--
-- Creates initial CMS-managed page entries for Atomic Finds.
--
-- NOTE — HOMEPAGE SPECIAL CASE:
-- src/app/page.tsx special-cases Atomic Finds to render
-- AtomicFindsHomepage.tsx (the bespoke approved design) rather than
-- BlockRenderer. The 'home' page seeded here is a DRAFT reference for
-- the future Aug 5-6 build slot (/admin/pages). It will NOT be live
-- until the special-case is removed and the block-based renderer is
-- promoted as the canonical homepage.
--
-- Block data shape matches BlockRenderer.tsx:
--   { type: 'hero' | 'products' | 'contact' | ..., data: {...} }
--
-- Block types currently supported in BlockRenderer.tsx:
--   hero, richtext, services, products, testimonials, cta, contact
--
-- Safe to re-run: uses on conflict do update.
-- ============================================================

-- ─── Page 1: Homepage (draft — see NOTE above) ──────────────
insert into pages (client_id, title, slug, status, meta, blocks)
values (
  '443936d5-f92e-480b-b206-c65cfb52bdfc',
  'Home',
  'home',
  'draft',

  -- SEO meta
  '{
    "title":       "Atomic Finds ATX — Vintage Rattan & Bamboo Furniture",
    "description": "Explore authentic 1970s rattan and bamboo furniture, hand-sourced and carefully restored in Austin, Texas. Timeless design, built to last."
  }'::jsonb,

  -- Block stack (mirrors the bespoke AtomicFindsHomepage.tsx layout)
  '[
    {
      "type": "hero",
      "data": {
        "title":   "Vintage, Written in the Stars",
        "subtitle": "Explore authentic 1970s rattan and bamboo, restored in Austin for a new generation. Timeless design, built to last.",
        "ctaText": "View Listings",
        "ctaLink": "#listings"
      }
    },
    {
      "type": "products",
      "data": {
        "title": "Featured Finds"
      }
    },
    {
      "type": "richtext",
      "data": {
        "content": "<h2>Hand-sourced. Carefully restored.</h2><p>Atomic Finds ATX specializes in authentic 1970s rattan and bamboo furniture, hand-sourced and carefully restored in Austin, Texas. Each piece is selected for character, construction quality, and the kind of presence that fills a room without trying.</p><p>We believe great furniture should outlast trends. These pieces already have — and they keep going.</p>"
      }
    },
    {
      "type": "contact",
      "data": {
        "title":    "Interested in a piece?",
        "subtitle": "Send a message and we will get back to you with availability and details."
      }
    }
  ]'::jsonb
)
on conflict (client_id, slug)
do update set
  title      = excluded.title,
  meta       = excluded.meta,
  blocks     = excluded.blocks,
  updated_at = now();
-- Note: status is intentionally NOT updated on conflict so a published
-- version is never accidentally demoted back to draft.


-- ─── Page 2: About (standalone page, future URL /about) ─────
insert into pages (client_id, title, slug, status, meta, blocks)
values (
  '443936d5-f92e-480b-b206-c65cfb52bdfc',
  'About',
  'about',
  'draft',

  '{
    "title":       "About Atomic Finds ATX",
    "description": "The story behind Atomic Finds ATX — authentic 1970s rattan and bamboo furniture, hand-sourced and restored in Austin, Texas."
  }'::jsonb,

  '[
    {
      "type": "hero",
      "data": {
        "title":   "Hand-sourced. Carefully restored.",
        "subtitle": "The story behind Atomic Finds ATX.",
        "ctaText": "",
        "ctaLink": ""
      }
    },
    {
      "type": "richtext",
      "data": {
        "content": "<p>Atomic Finds ATX specializes in authentic 1970s rattan and bamboo furniture, hand-sourced and carefully restored in Austin, Texas. Each piece is selected for character, construction quality, and the kind of presence that fills a room without trying.</p><p>We believe great furniture should outlast trends. These pieces already have — and they keep going.</p>"
      }
    },
    {
      "type": "contact",
      "data": {
        "title":    "Get in Touch",
        "subtitle": "Questions about a piece? We would love to hear from you."
      }
    }
  ]'::jsonb
)
on conflict (client_id, slug)
do update set
  title      = excluded.title,
  meta       = excluded.meta,
  blocks     = excluded.blocks,
  updated_at = now();
