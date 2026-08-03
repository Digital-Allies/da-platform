-- ============================================================
-- Storage RLS Policies for Client Assets Bucket
-- Enables public read + authenticated user uploads
-- Run in: Supabase Dashboard → SQL Editor → paste → Run
-- ============================================================

-- Policy 1: Allow public read (anyone can view uploaded assets)
create policy "Public read access"
  on storage.objects for select
  using (bucket_id = 'client-assets');

-- Policy 2: Allow authenticated users to upload to their client folder
create policy "Authenticated users upload to their folder"
  on storage.objects for insert
  with check (
    bucket_id = 'client-assets'
    and auth.role() = 'authenticated'
  );

-- Policy 3: Allow users to delete their own uploads
create policy "Authenticated users delete"
  on storage.objects for delete
  using (
    bucket_id = 'client-assets'
    and auth.role() = 'authenticated'
  );
