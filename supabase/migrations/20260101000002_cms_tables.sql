-- ============================================================
-- CMS Collections Migration
-- ============================================================

-- ─── TOOLS ───────────────────────────────────────────────────────────────────
create table if not exists tools (
  id            uuid primary key default uuid_generate_v4(),
  client_id     uuid references clients(id) on delete cascade not null,
  name          text not null,
  slug          text not null,
  description   text,
  features      jsonb,
  pricing       text,
  status        text default 'draft' check (status in ('draft', 'published')),
  created_at    timestamptz default now(),
  updated_at    timestamptz default now(),
  unique(client_id, slug)
);

-- ─── PAGES ───────────────────────────────────────────────────────────────────
create table if not exists pages (
  id            uuid primary key default uuid_generate_v4(),
  client_id     uuid references clients(id) on delete cascade not null,
  title         text not null,
  slug          text not null,
  meta          jsonb,
  blocks        jsonb, -- Array of block objects (type + data)
  status        text default 'draft' check (status in ('draft', 'published')),
  created_at    timestamptz default now(),
  updated_at    timestamptz default now(),
  unique(client_id, slug)
);

-- ─── ARTICLES ────────────────────────────────────────────────────────────────
create table if not exists articles (
  id            uuid primary key default uuid_generate_v4(),
  client_id     uuid references clients(id) on delete cascade not null,
  title         text not null,
  slug          text not null,
  type          text, -- Blog Post, Press Release, Case Study
  excerpt       text,
  body          text,
  tags          text[],
  hero_image    text,
  status        text default 'draft' check (status in ('draft', 'review', 'published', 'scheduled')),
  scheduled_date timestamptz,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now(),
  unique(client_id, slug)
);

-- ─── CONTENT CALENDAR ────────────────────────────────────────────────────────
create table if not exists content_calendar (
  id            uuid primary key default uuid_generate_v4(),
  client_id     uuid references clients(id) on delete cascade not null,
  day           int check (day between 1 and 30),
  week          int,
  category      text,
  topic         text,
  hook          text,
  caption       text,
  cta           text,
  status        text default 'draft' check (status in ('draft', 'approved', 'scheduled', 'posted')),
  scheduled_date date,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
create table if not exists design_tokens (
  id            uuid primary key default uuid_generate_v4(),
  client_id     uuid references clients(id) on delete cascade not null,
  colors        jsonb,
  fonts         jsonb,
  type_scale    jsonb,
  spacing       jsonb,
  logo          text,
  favicon       text,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now(),
  unique(client_id)
);

-- ============================================================
-- INDEXES
-- ============================================================
create index if not exists idx_tools_slug on tools(client_id, slug);
create index if not exists idx_pages_slug on pages(client_id, slug);
create index if not exists idx_articles_slug on articles(client_id, slug);

-- ============================================================
-- ROW-LEVEL SECURITY (RLS)
-- ============================================================
alter table tools enable row level security;
alter table pages enable row level security;
alter table articles enable row level security;
alter table content_calendar enable row level security;
alter table design_tokens enable row level security;

-- Tools
create policy "Tools: client full access"
  on tools for all
  using (client_id = get_my_client_id())
  with check (client_id = get_my_client_id());

create policy "Tools: public read"
  on tools for select
  using (status = 'published');

-- Pages
create policy "Pages: client full access"
  on pages for all
  using (client_id = get_my_client_id())
  with check (client_id = get_my_client_id());

create policy "Pages: public read"
  on pages for select
  using (status = 'published');

-- Articles
create policy "Articles: client full access"
  on articles for all
  using (client_id = get_my_client_id())
  with check (client_id = get_my_client_id());

create policy "Articles: public read"
  on articles for select
  using (status = 'published');

-- Content Calendar
create policy "Calendar: client full access"
  on content_calendar for all
  using (client_id = get_my_client_id())
  with check (client_id = get_my_client_id());

-- Design Tokens
create policy "Design Tokens: client full access"
  on design_tokens for all
  using (client_id = get_my_client_id())
  with check (client_id = get_my_client_id());

create policy "Design Tokens: public read"
  on design_tokens for select
  using (true);
