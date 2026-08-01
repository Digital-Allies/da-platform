-- ============================================================
-- Ensure contact_submissions table exists with proper RLS
-- (Safety check if schema wasn't fully applied)
-- ============================================================

create table if not exists contact_submissions (
  id bigint primary key generated always as identity,
  client_id uuid not null references clients(id),
  name text not null,
  email text not null,
  phone text,
  subject text,
  message text not null,
  read boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Index for efficient lookups
create index if not exists idx_contact_submissions_client
  on contact_submissions(client_id, created_at desc);

-- Enable RLS
alter table contact_submissions enable row level security;

-- Policy: Allow all inserts (public form submissions)
create policy if not exists "Submissions: allow insert"
  on contact_submissions for insert
  with check (true);

-- Policy: Allow clients to read their own submissions
create policy if not exists "Submissions: client read"
  on contact_submissions for select
  using (client_id = get_my_client_id());

-- Policy: Allow clients to update their submissions (mark as read)
create policy if not exists "Submissions: client update"
  on contact_submissions for update
  using (client_id = get_my_client_id())
  with check (client_id = get_my_client_id());
