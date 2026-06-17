-- ============================================================
-- Digital Allies — Seed Data for Connected CMS
-- Run AFTER schema.sql
--
-- Supabase SQL Editor → New Query → Paste → Run
-- ============================================================

-- CLIENT_ID used in Vercel env: NEXT_PUBLIC_CLIENT_ID
-- Value: 3d76b896-e1fb-49f0-a8db-f62fdd5bc258

-- ─── Step 1: Insert the Digital Allies client row ───────────
insert into clients (id, business_name) values
  ('3d76b896-e1fb-49f0-a8db-f62fdd5bc258', 'Digital Allies')
on conflict (id) do update set business_name = excluded.business_name;

-- ─── Step 2: Site settings ──────────────────────────────────
insert into settings (client_id, key, value) values
  ('3d76b896-e1fb-49f0-a8db-f62fdd5bc258', 'site_title',        'Digital Allies'),
  ('3d76b896-e1fb-49f0-a8db-f62fdd5bc258', 'site_description',  'Technological solutions for people with better things to do. Digital Allies helps small businesses in Kingman, AZ get their tech sorted.'),
  ('3d76b896-e1fb-49f0-a8db-f62fdd5bc258', 'tagline',           'Technology is our craft. People are our purpose.'),
  ('3d76b896-e1fb-49f0-a8db-f62fdd5bc258', 'phone',             '(928) 228-5769'),
  ('3d76b896-e1fb-49f0-a8db-f62fdd5bc258', 'email',             'contact@digitalallies.net'),
  ('3d76b896-e1fb-49f0-a8db-f62fdd5bc258', 'address',           'Kingman, Arizona'),
  ('3d76b896-e1fb-49f0-a8db-f62fdd5bc258', 'brand_color',       '#C5301A'),
  ('3d76b896-e1fb-49f0-a8db-f62fdd5bc258', 'logo_url',          ''),
  ('3d76b896-e1fb-49f0-a8db-f62fdd5bc258', 'instagram_url',     ''),
  ('3d76b896-e1fb-49f0-a8db-f62fdd5bc258', 'facebook_url',      ''),
  ('3d76b896-e1fb-49f0-a8db-f62fdd5bc258', 'linkedin_url',      ''),
  ('3d76b896-e1fb-49f0-a8db-f62fdd5bc258', 'business_hours',    'Mon–Fri: 9am–5pm MST'),
  ('3d76b896-e1fb-49f0-a8db-f62fdd5bc258', 'hero_title',        'Technological solutions for people with better things to do.'),
  ('3d76b896-e1fb-49f0-a8db-f62fdd5bc258', 'hero_subtitle',     'Websites, automations, integrations, and support for small businesses in Arizona. No jargon. No ghosting. Anthony answers the phone.'),
  ('3d76b896-e1fb-49f0-a8db-f62fdd5bc258', 'hero_cta_text',     'Get in touch'),
  ('3d76b896-e1fb-49f0-a8db-f62fdd5bc258', 'hero_cta_link',     '#contact'),
  ('3d76b896-e1fb-49f0-a8db-f62fdd5bc258', 'about_title',       'We show up. Every time.'),
  ('3d76b896-e1fb-49f0-a8db-f62fdd5bc258', 'about_body',        '<p>Digital Allies is Anthony — a one-person tech shop based in Kingman, Arizona. We work with small businesses and nonprofits that need their technology sorted without the enterprise runaround.</p><p>The No-Ghosting Guarantee is real. If you call, I answer. If something breaks, I fix it. If I can''t help you, I''ll tell you who can.</p><p>Clear tech. Straight talk. No ghosts.</p>'),
  ('3d76b896-e1fb-49f0-a8db-f62fdd5bc258', 'about_image_url',   '')
on conflict (client_id, key) do update set value = excluded.value;

-- ─── Step 3: Services ───────────────────────────────────────
insert into services (client_id, title, description, icon, display_order) values
  (
    '3d76b896-e1fb-49f0-a8db-f62fdd5bc258',
    'Website Design & Build',
    'Clean, fast websites that show up on search and turn visitors into customers. No templates that look like everyone else''s.',
    'Monitor',
    1
  ),
  (
    '3d76b896-e1fb-49f0-a8db-f62fdd5bc258',
    'Automation & Integration',
    'Connect your apps and eliminate repetitive tasks. If you''re doing the same thing more than twice, it can probably run itself.',
    'Zap',
    2
  ),
  (
    '3d76b896-e1fb-49f0-a8db-f62fdd5bc258',
    'Tech Support & Monitoring',
    'We watch your systems 24/7. If something breaks at 2am, that''s our problem — not yours.',
    'Shield',
    3
  );

-- ─── Step 4: Testimonials (add yours — these are starters) ──
insert into testimonials (client_id, author_name, author_role, content, rating, display_order) values
  (
    '3d76b896-e1fb-49f0-a8db-f62fdd5bc258',
    'Maria G.',
    'Owner, Kingman Tax & Accounting',
    'Anthony built our site in two weeks and it actually shows up when people search for us in Kingman. He explained everything without making me feel dumb. Highly recommend.',
    5,
    1
  ),
  (
    '3d76b896-e1fb-49f0-a8db-f62fdd5bc258',
    'Deb R.',
    'Director, Mohave County Nonprofit',
    'We had a broken website and no budget for a big agency. Anthony fixed everything and set up an automation that saves us hours every week. He''s the real deal.',
    5,
    2
  );
