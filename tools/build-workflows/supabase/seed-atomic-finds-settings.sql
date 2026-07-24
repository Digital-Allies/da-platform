-- ============================================================
-- Atomic Finds ATX — Site Settings Seed
-- CLIENT_ID: 443936d5-f92e-480b-b206-c65cfb52bdfc
--
-- Run in Supabase SQL Editor → New Query → Paste → Run
-- Run AFTER schema.sql and seed-atomic-finds-catalog.sql
--
-- Covers ALL 20 keys used by /admin/settings (settings/page.tsx):
--   Identity (6), The Lobby/Hero (4), About (3), Contact (4), Social (4)
--   + 1 extra (twitter_url) added to match the Social group in the admin page
--
-- logo_url and favicon_url: upload real assets via /admin/settings
-- once you have final brand files. Placeholder is the static logo
-- already in /public/atomic-finds/.
--
-- about_image_url: add a real shop/studio photo later.
--
-- instagram_url: fill in Jenny's shop handle once confirmed.
--
-- Run "on conflict ... do update" so this is safe to re-run.
-- ============================================================

-- ─── Step 1: Confirm client row exists ──────────────────────
-- (Row was inserted earlier — this is a no-op safety check)
insert into clients (id, auth_user_id, business_name) values
  ('443936d5-f92e-480b-b206-c65cfb52bdfc', null, 'Atomic Finds ATX')
on conflict (id) do update set business_name = excluded.business_name;

-- ─── Step 2: Identity ───────────────────────────────────────
insert into settings (client_id, key, value) values
  ('443936d5-f92e-480b-b206-c65cfb52bdfc', 'site_title',        'Atomic Finds ATX'),
  ('443936d5-f92e-480b-b206-c65cfb52bdfc', 'tagline',           'Vintage, Written in the Stars'),
  ('443936d5-f92e-480b-b206-c65cfb52bdfc', 'site_description',  'Explore authentic 1970s rattan and bamboo, restored in Austin for a new generation. Timeless design, built to last.'),
  ('443936d5-f92e-480b-b206-c65cfb52bdfc', 'brand_color',       '#C89B3C'),
  ('443936d5-f92e-480b-b206-c65cfb52bdfc', 'logo_url',          '/atomic-finds/logo.png'),
  ('443936d5-f92e-480b-b206-c65cfb52bdfc', 'favicon_url',       '')

on conflict (client_id, key) do update set value = excluded.value;

-- ─── Step 3: The Lobby (hero section) ───────────────────────
insert into settings (client_id, key, value) values
  ('443936d5-f92e-480b-b206-c65cfb52bdfc', 'hero_title',        'Vintage, Written in the Stars'),
  ('443936d5-f92e-480b-b206-c65cfb52bdfc', 'hero_subtitle',     'Explore authentic 1970s rattan and bamboo, restored in Austin for a new generation. Timeless design, built to last.'),
  ('443936d5-f92e-480b-b206-c65cfb52bdfc', 'hero_cta_text',     'View Listings'),
  ('443936d5-f92e-480b-b206-c65cfb52bdfc', 'hero_cta_link',     '#listings')

on conflict (client_id, key) do update set value = excluded.value;

-- ─── Step 4: About ──────────────────────────────────────────
insert into settings (client_id, key, value) values
  ('443936d5-f92e-480b-b206-c65cfb52bdfc', 'about_title',       'Hand-sourced. Carefully restored.'),
  ('443936d5-f92e-480b-b206-c65cfb52bdfc', 'about_body',        '<p>Atomic Finds ATX specializes in authentic 1970s rattan and bamboo furniture, hand-sourced and carefully restored in Austin, Texas. Each piece is selected for character, construction quality, and the kind of presence that fills a room without trying.</p><p>We believe great furniture should outlast trends. These pieces already have — and they''ll keep going.</p>'),
  ('443936d5-f92e-480b-b206-c65cfb52bdfc', 'about_image_url',   '')

on conflict (client_id, key) do update set value = excluded.value;

-- ─── Step 5: Contact ────────────────────────────────────────
insert into settings (client_id, key, value) values
  ('443936d5-f92e-480b-b206-c65cfb52bdfc', 'phone',             ''),
  ('443936d5-f92e-480b-b206-c65cfb52bdfc', 'email',             'atomicfindsatx@gmail.com'),
  ('443936d5-f92e-480b-b206-c65cfb52bdfc', 'address',           'Austin, Texas'),
  ('443936d5-f92e-480b-b206-c65cfb52bdfc', 'business_hours',    'Available by appointment and online')

on conflict (client_id, key) do update set value = excluded.value;

-- ─── Step 6: Social ─────────────────────────────────────────
-- TODO: fill in Jenny's actual Instagram handle
insert into settings (client_id, key, value) values
  ('443936d5-f92e-480b-b206-c65cfb52bdfc', 'instagram_url',     ''),
  ('443936d5-f92e-480b-b206-c65cfb52bdfc', 'facebook_url',      ''),
  ('443936d5-f92e-480b-b206-c65cfb52bdfc', 'linkedin_url',      ''),
  ('443936d5-f92e-480b-b206-c65cfb52bdfc', 'twitter_url',       '')

on conflict (client_id, key) do update set value = excluded.value;
