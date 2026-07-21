-- ============================================================
-- Reviews — customer reviews (Atomic Finds ATX first)
-- Schema per the Claude Design system's own reviews-catalog.json
-- (source: real Facebook Marketplace reviews), adapted to the
-- client_id + RLS convention used by every other table here.
-- Run this in: Supabase Dashboard -> SQL Editor -> New Query
-- (safe to re-run)
-- ============================================================

create table if not exists reviews (
  id                  uuid primary key default gen_random_uuid(),
  client_id           uuid references clients(id) on delete cascade not null,
  reviewer_name       text not null,
  review_date         date,
  rating_type         text not null default 'written', -- 'written' | 'rating_only'
  text                text,
  seller_response      text,
  source              text not null default 'other',   -- freeform: 'facebook', 'google', 'yelp', 'instagram', 'other'... — editable per client, not a fixed enum
  notable_tags        text[] not null default '{}',
  featured_on_homepage boolean not null default false,
  sort_order          int not null default 0,
  created_at          timestamptz default now(),
  updated_at          timestamptz default now()
);

do $$ begin
  alter table reviews add constraint reviews_rating_type_check
    check (rating_type in ('written','rating_only'));
exception when duplicate_object then null; end $$;

create index if not exists idx_reviews_client_featured_order
  on reviews(client_id, featured_on_homepage, sort_order);

alter table reviews enable row level security;

create policy "Reviews: client full access"
  on reviews for all
  using (client_id = get_my_client_id())
  with check (client_id = get_my_client_id());

create policy "Reviews: public read"
  on reviews for select
  using (true);

create or replace trigger reviews_set_updated_at
  before update on reviews
  for each row
  execute function set_updated_at();
