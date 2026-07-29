-- ============================================================
-- Security fixes for Supabase advisor warnings
-- Supabase SQL Editor → New Query → Paste → Run
-- ============================================================

-- ─── Fix 1: Add search_path to get_my_client_id ─────────────
-- Prevents search_path injection attacks
create or replace function get_my_client_id()
returns uuid
language sql
security definer
set search_path = ''   -- <-- this is the fix
as $$
  select id from public.clients where auth_user_id = auth.uid() limit 1;
$$;

-- ─── Fix 2: Revoke anon execute on get_my_client_id ─────────
-- Anonymous users (public site visitors) have no business calling this.
-- It only returns data for authenticated (admin) users anyway.
--
-- NOTE (2026-07-29): `revoke ... from anon` alone does NOT block anon —
-- Postgres grants EXECUTE on new functions to the PUBLIC pseudo-role by
-- default, and anon implicitly inherits PUBLIC's privileges. Verified
-- live: after this file's first run, anon could still call the function
-- via the PUBLIC grant. Must also revoke from PUBLIC directly (does not
-- affect `authenticated`/`service_role`, which hold their own explicit
-- grants). See migrations/20260729000000_security_fixes_public_grant.sql
-- for the standalone fix if this file was already run before this note.
revoke execute on function public.get_my_client_id() from anon;
revoke execute on function public.get_my_client_id() from public;

-- ─── NOT A FIX NEEDED: contact_submissions INSERT policy ─────
-- The "always true" INSERT policy on contact_submissions is intentional.
-- Your contact form is public — anyone should be able to submit it.
-- Supabase flags it as a warning, but it's the correct design.
-- No action needed.

-- ─── NOT A FIX NEEDED: rls_auto_enable ──────────────────────
-- This is a Supabase system function, not yours. Safe to ignore.

-- ─── Fix 3: Leaked password protection ──────────────────────
-- This is a dashboard setting, not SQL.
-- Go to: Supabase → Authentication → Providers → Email
-- Scroll to "Password strength" → enable "Leaked password protection"
