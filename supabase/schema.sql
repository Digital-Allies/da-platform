-- ============================================================
-- Digital Allies Client Site Platform — Supabase Schema
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- ─── CLIENTS ─────────────────────────────────────────────────────────────────
-- One row per client. auth_user_id links to Supabase Auth.
create table if not exists clients (
  id            uuid primary key default uuid_generate_v4(),
  auth_user_id  uuid references auth.users(id) on delete cascade,
  business_name text not null,
  created_at    timestamptz default now()
);

-- ─── POSTS ───────────────────────────────────────────────────────────────────
create table if not exists posts (
  id            uuid primary key default uuid_generate_v4(),
  client_id     uuid references clients(id) on delete cascade not null,
  title         text not null,
  slug          text not null,
  excerpt       text,
  content       text,                          -- HTML from Tiptap
  featured_image_url text,
  status        text default 'draft' check (status in ('draft', 'published')),
  published_at  timestamptz,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now(),
  unique(client_id, slug)
);

-- ─── SERVICES ────────────────────────────────────────────────────────────────
create table if not exists services (
  id            uuid primary key default uuid_generate_v4(),
  client_id     uuid references clients(id) on delete cascade not null,
  title         text not null,
  description   text,
  price         text,                          -- optional, freeform (e.g. "$99/mo" or "Call for pricing")
  icon          text,                          -- Lucide icon name string
  display_order int default 0,
  created_at    timestamptz default now()
);

-- ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
create table if not exists testimonials (
  id            uuid primary key default uuid_generate_v4(),
  client_id     uuid references clients(id) on delete cascade not null,
  author_name   text not null,
  author_role   text,
  content       text not null,
  rating        int default 5 check (rating between 1 and 5),
  image_url     text,
  display_order int default 0,
  created_at    timestamptz default now()
);

-- ─── TEAM MEMBERS ────────────────────────────────────────────────────────────
create table if not exists team_members (
  id            uuid primary key default uuid_generate_v4(),
  client_id     uuid references clients(id) on delete cascade not null,
  name          text not null,
  role          text,
  bio           text,
  image_url     text,
  display_order int default 0,
  created_at    timestamptz default now()
);

-- ─── GALLERY ─────────────────────────────────────────────────────────────────
create table if not exists gallery_items (
  id            uuid primary key default uuid_generate_v4(),
  client_id     uuid references clients(id) on delete cascade not null,
  title         text,
  image_url     text not null,
  category      text,
  display_order int default 0,
  created_at    timestamptz default now()
);

-- ─── SETTINGS ────────────────────────────────────────────────────────────────
-- Key-value store for per-client site configuration.
-- Keys: site_title, site_description, phone, email, address,
--       brand_color, logo_url, tagline, instagram_url, facebook_url,
--       linkedin_url, business_hours, hero_title, hero_subtitle, hero_cta_text,
--       hero_cta_link, about_title, about_body, about_image_url
create table if not exists settings (
  id            uuid primary key default uuid_generate_v4(),
  client_id     uuid references clients(id) on delete cascade not null,
  key           text not null,
  value         text,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now(),
  unique(client_id, key)
);

-- ─── CONTACT SUBMISSIONS ─────────────────────────────────────────────────────
-- Stores form submissions. Resend handles the email notification.
create table if not exists contact_submissions (
  id            uuid primary key default uuid_generate_v4(),
  client_id     uuid references clients(id) on delete cascade not null,
  name          text not null,
  email         text not null,
  phone         text,
  subject       text,
  message       text not null,
  read          boolean default false,
  created_at    timestamptz default now()
);

-- ============================================================
-- INDEXES (performance)
-- ============================================================
create index if not exists idx_posts_client_status   on posts(client_id, status);
create index if not exists idx_posts_slug             on posts(client_id, slug);
create index if not exists idx_services_order         on services(client_id, display_order);
create index if not exists idx_testimonials_order     on testimonials(client_id, display_order);
create index if not exists idx_team_order             on team_members(client_id, display_order);
create index if not exists idx_gallery_order          on gallery_items(client_id, display_order);
create index if not exists idx_settings_key           on settings(client_id, key);
create index if not exists idx_submissions_client     on contact_submissions(client_id, created_at desc);

-- ============================================================
-- ROW-LEVEL SECURITY (RLS)
-- Clients can only see/edit their own data.
-- Public can read published content for their site (via client_id env var).
-- ============================================================

alter table clients             enable row level security;
alter table posts               enable row level security;
alter table services            enable row level security;
alter table testimonials        enable row level security;
alter table team_members        enable row level security;
alter table gallery_items       enable row level security;
alter table settings            enable row level security;
alter table contact_submissions enable row level security;

-- ─── Helper: get the client_id for the logged-in user ─────────────────────
create or replace function get_my_client_id()
returns uuid
language sql
security definer
as $$
  select id from clients where auth_user_id = auth.uid() limit 1;
$$;

-- ─── CLIENTS policies ─────────────────────────────────────────────────────
create policy "Clients: read own row"
  on clients for select
  using (auth_user_id = auth.uid());

create policy "Clients: update own row"
  on clients for update
  using (auth_user_id = auth.uid());

-- ─── POSTS policies ───────────────────────────────────────────────────────
-- Logged-in client: full CRUD on their own posts
create policy "Posts: client full access"
  on posts for all
  using (client_id = get_my_client_id())
  with check (client_id = get_my_client_id());

-- Anonymous (public site): read published posts for any client
-- The frontend filters by client_id from env var
create policy "Posts: public read published"
  on posts for select
  using (status = 'published');

-- ─── SERVICES policies ────────────────────────────────────────────────────
create policy "Services: client full access"
  on services for all
  using (client_id = get_my_client_id())
  with check (client_id = get_my_client_id());

create policy "Services: public read"
  on services for select
  using (true);

-- ─── TESTIMONIALS policies ────────────────────────────────────────────────
create policy "Testimonials: client full access"
  on testimonials for all
  using (client_id = get_my_client_id())
  with check (client_id = get_my_client_id());

create policy "Testimonials: public read"
  on testimonials for select
  using (true);

-- ─── TEAM MEMBERS policies ────────────────────────────────────────────────
create policy "Team: client full access"
  on team_members for all
  using (client_id = get_my_client_id())
  with check (client_id = get_my_client_id());

create policy "Team: public read"
  on team_members for select
  using (true);

-- ─── GALLERY policies ─────────────────────────────────────────────────────
create policy "Gallery: client full access"
  on gallery_items for all
  using (client_id = get_my_client_id())
  with check (client_id = get_my_client_id());

create policy "Gallery: public read"
  on gallery_items for select
  using (true);

-- ─── SETTINGS policies ────────────────────────────────────────────────────
create policy "Settings: client full access"
  on settings for all
  using (client_id = get_my_client_id())
  with check (client_id = get_my_client_id());

create policy "Settings: public read"
  on settings for select
  using (true);

-- ─── CONTACT SUBMISSIONS policies ─────────────────────────────────────────
-- Anyone can insert (contact form). Only the client can read.
create policy "Submissions: public insert"
  on contact_submissions for insert
  with check (true);

create policy "Submissions: client read"
  on contact_submissions for select
  using (client_id = get_my_client_id());

create policy "Submissions: client update (mark read)"
  on contact_submissions for update
  using (client_id = get_my_client_id());

-- ============================================================
-- STORAGE BUCKETS
-- Run separately in Supabase Dashboard → Storage
-- ============================================================
-- insert into storage.buckets (id, name, public) values ('site-assets', 'site-assets', true);
--
-- Storage RLS (add in Dashboard → Storage → site-assets → Policies):
-- Allow authenticated users to upload to their own folder: storage.foldername(name)[1] = get_my_client_id()::text
-- Allow public to read all files in site-assets

-- ============================================================
-- SEED: Initial settings keys for a new client
-- Replace 'CLIENT_UUID_HERE' with the actual client UUID after creating their row
-- ============================================================
/*
insert into settings (client_id, key, value) values
  ('CLIENT_UUID_HERE', 'site_title', 'My Business'),
  ('CLIENT_UUID_HERE', 'site_description', 'We do great things for great people.'),
  ('CLIENT_UUID_HERE', 'tagline', 'Quality. Service. Results.'),
  ('CLIENT_UUID_HERE', 'phone', '(928) 555-1234'),
  ('CLIENT_UUID_HERE', 'email', 'hello@mybusiness.com'),
  ('CLIENT_UUID_HERE', 'address', '123 Main St, Kingman, AZ 86401'),
  ('CLIENT_UUID_HERE', 'brand_color', '#1A6B8A'),
  ('CLIENT_UUID_HERE', 'logo_url', ''),
  ('CLIENT_UUID_HERE', 'instagram_url', ''),
  ('CLIENT_UUID_HERE', 'facebook_url', ''),
  ('CLIENT_UUID_HERE', 'linkedin_url', ''),
  ('CLIENT_UUID_HERE', 'hero_title', 'Welcome to My Business'),
  ('CLIENT_UUID_HERE', 'hero_subtitle', 'Serving Kingman and the Tri-State area since 2010.'),
  ('CLIENT_UUID_HERE', 'hero_cta_text', 'Get in touch'),
  ('CLIENT_UUID_HERE', 'hero_cta_link', '#contact'),
  ('CLIENT_UUID_HERE', 'about_title', 'About Us'),
  ('CLIENT_UUID_HERE', 'about_body', 'Tell your story here.'),
  ('CLIENT_UUID_HERE', 'about_image_url', ''),
  ('CLIENT_UUID_HERE', 'business_hours', 'Mon–Fri: 9am–5pm');
*/
