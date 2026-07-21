-- ============================================================
-- Products table — for client sites with a catalog (Atomic Finds first)
-- Follows the exact client_id + RLS convention already used by
-- `services` / `testimonials` (see supabase/schema.sql).
-- Run this in: Supabase Dashboard -> SQL Editor -> New Query
-- ============================================================

create table if not exists products (
  id            uuid primary key default gen_random_uuid(),
  client_id     uuid references clients(id) on delete cascade not null,
  title         text not null,
  description   text,
  price         numeric(10,2),
  original_price numeric(10,2),                -- nullable; set only when the item has a prior/list price
  condition     text,                           -- freeform, e.g. "Used - Good"
  location      text,                           -- freeform, e.g. "Austin, TX"
  listed_label  text,                           -- freeform recency/status text, e.g. "3 days ago" or "In stock"
  attributes    jsonb not null default '{}'::jsonb,      -- flexible per-item specs, e.g. {"Number of Seats": 4}
  image_url     text,                           -- product photo; not backfilled by the seed below, see note
  external_url  text not null,                  -- where "buy/inquire" currently points (Facebook Marketplace
                                                 -- listing today; will become a checkout provider link/embed
                                                 -- once that's set up — same field, no schema change needed)
  seller_name   text,
  seller_rating text,
  display_order int default 0,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- Indexes (performance)
create index if not exists idx_products_order on products(client_id, display_order);

alter table products enable row level security;

-- Logged-in client: full CRUD on their own products (same pattern as posts/services)
create policy "Products: client full access"
  on products for all
  using (client_id = get_my_client_id())
  with check (client_id = get_my_client_id());

-- Anonymous (public site): read all products for any client
-- The frontend filters by client_id from env var, same as services/testimonials
create policy "Products: public read"
  on products for select
  using (true);

-- No shared `updated_at` trigger function exists yet in schema.sql (services/
-- testimonials don't have an updated_at column), so it's defined here.
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create or replace trigger products_set_updated_at
  before update on products
  for each row
  execute function set_updated_at();
