-- ============================================================
-- Admin Features & Modules Migration
-- ============================================================

-- Enable uuid-ossp if not already enabled
create extension if not exists "uuid-ossp";

-- ─── PROJECTS ────────────────────────────────────────────────────────────────
create table if not exists projects (
  id            uuid primary key default uuid_generate_v4(),
  client_id     uuid references clients(id) on delete cascade not null,
  name          text not null,
  description   text,
  status        text default 'active' check (status in ('active', 'archived', 'completed')),
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- ─── PROJECT TASKS ───────────────────────────────────────────────────────────
create table if not exists project_tasks (
  id            uuid primary key default uuid_generate_v4(),
  client_id     uuid references clients(id) on delete cascade not null,
  project_id    uuid references projects(id) on delete cascade not null,
  title         text not null,
  description   text,
  status        text default 'todo' check (status in ('todo', 'in_progress', 'review', 'done')),
  due_date      timestamptz,
  priority      text default 'medium' check (priority in ('low', 'medium', 'high')),
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- ─── RESEARCH NOTES ──────────────────────────────────────────────────────────
create table if not exists research_notes (
  id            uuid primary key default uuid_generate_v4(),
  client_id     uuid references clients(id) on delete cascade not null,
  title         text not null,
  category      text default 'Strategy',
  content       text,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- ─── DEV TASKS (Workshop) ────────────────────────────────────────────────────
create table if not exists dev_tasks (
  id            uuid primary key default uuid_generate_v4(),
  client_id     uuid references clients(id) on delete cascade not null,
  title         text not null,
  description   text,
  type          text default 'feature' check (type in ('feature', 'bug', 'milestone')),
  status        text default 'open' check (status in ('open', 'testing', 'resolved', 'closed')),
  priority      text default 'medium' check (priority in ('low', 'medium', 'high')),
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- ─── NOTIFICATIONS ───────────────────────────────────────────────────────────
create table if not exists notifications (
  id            uuid primary key default uuid_generate_v4(),
  client_id     uuid references clients(id) on delete cascade not null,
  title         text not null,
  message       text not null,
  type          text default 'activity' check (type in ('activity', 'alert')),
  read_status   boolean default false,
  created_at    timestamptz default now()
);

-- ============================================================
-- ROW-LEVEL SECURITY (RLS)
-- ============================================================
alter table projects enable row level security;
alter table project_tasks enable row level security;
alter table research_notes enable row level security;
alter table dev_tasks enable row level security;
alter table notifications enable row level security;

-- Projects policies
create policy "Projects: client full access"
  on projects for all
  using (client_id = get_my_client_id())
  with check (client_id = get_my_client_id());

-- Project Tasks policies
create policy "Project Tasks: client full access"
  on project_tasks for all
  using (client_id = get_my_client_id())
  with check (client_id = get_my_client_id());

-- Research Notes policies
create policy "Research Notes: client full access"
  on research_notes for all
  using (client_id = get_my_client_id())
  with check (client_id = get_my_client_id());

-- Dev Tasks policies
create policy "Dev Tasks: client full access"
  on dev_tasks for all
  using (client_id = get_my_client_id())
  with check (client_id = get_my_client_id());

-- Notifications policies
create policy "Notifications: client full access"
  on notifications for all
  using (client_id = get_my_client_id())
  with check (client_id = get_my_client_id());
