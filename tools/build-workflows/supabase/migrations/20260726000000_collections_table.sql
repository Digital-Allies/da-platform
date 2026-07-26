-- ============================================================
-- Collections — product & content collections table
-- Idempotent schema migration matching multi-tenant client_id + RLS
-- Run in Supabase SQL Editor
-- ============================================================

create table if not exists collections (
  id           uuid primary key default gen_random_uuid(),
  client_id    uuid references clients(id) on delete cascade not null,
  title        text not null,
  slug         text not null,
  description  text,
  item_ids     text[] not null default '{}',
  is_featured  boolean not null default false,
  status       text not null default 'draft', -- 'draft' | 'published'
  created_at   timestamptz default now(),
  updated_at   timestamptz default now()
);

do $$ begin
  alter table collections add constraint collections_status_check
    check (status in ('draft','published'));
exception when duplicate_object then null; end $$;

create index if not exists idx_collections_client_status
  on collections(client_id, status, created_at desc);

alter table collections enable row level security;

create policy "Collections: client full access"
  on collections for all
  using (client_id = get_my_client_id())
  with check (client_id = get_my_client_id());

create policy "Collections: public read"
  on collections for select
  using (status = 'published');

create or replace trigger collections_set_updated_at
  before update on collections
  for each row
  execute function set_updated_at();
