# Atomic Finds ATX CMS Completion Checklist

**Status:** Post-seed testing found 6 issues blocking full Jennyfer handoff.

**Priority:** Critical (blocks form) → High (blocks testing) → Medium (UX polish)

---

## 🚨 CRITICAL — Blocks Handoff

### 1. Contact Form Returns "Server Error"

**Issue:** Form submits but shows error alert.

**Root Cause:** `contact_submissions` table may not exist or RLS policies misconfigured.

**Fix:**
- Run migration: `supabase/migrations/20260801000001_ensure_contact_submissions.sql`
- Or manually in Supabase SQL Editor:
  ```sql
  create table if not exists contact_submissions (
    id bigint primary key generated always as identity,
    client_id uuid not null references clients(id),
    name text not null,
    email text not null,
    phone text,
    subject text,
    message text not null,
    read boolean default false,
    created_at timestamp with time zone default now()
  );
  
  alter table contact_submissions enable row level security;
  
  create policy if not exists "allow insert"
    on contact_submissions for insert with check (true);
  ```

**Status:** ⏳ Awaiting your SQL execution

---

### 2. Asset Display Inconsistent (Logo ✅ → Favicon ❌ → About Photo ❌)

**Issue:** Logo displays correctly but favicon and about_image_url don't render.

**Root Cause:** Likely asset path issue or CSS display problem.

**Next Steps:**
1. Check `/admin/settings` → verify "About Featured Photo" uploaded successfully
2. Check live site → inspect element on broken images
3. If path is wrong, update in settings or check how paths are rendered

**Investigation Needed:** You need to check why logo works but others don't.

---

## ⚠️ HIGH PRIORITY — Blocks Testing

### 3. Pages Don't Appear in Navigation

**Issue:** Jennyfer can create pages but they're invisible until... nowhere visible.

**Root Cause:** Navigation component hardcoded. No link to published pages.

**Fix Required:** Add page navigation links

- File: `src/components/site/Navigation.tsx`
- Add query to fetch published pages
- Render them as nav links

**Example:**
```tsx
const pages = await getPublishedPages(); // need to implement this function
// Add to nav menu
pages.forEach(page => <link href={`/${page.slug}`}>{page.title}</link>)
```

**Status:** Code not yet written

---

### 4. Social Media Links Show as Text, Not Icons

**Issue:** Contact form Facebook/Instagram fields show "facebook_url" text instead of icons.

**Root Cause:** AtomicContactForm is Atomic Finds-specific and needs social icon rendering.

**Fix:**
- Add icons to contact form social links (if they're displayed)
- Or: Move social to footer/nav where they currently work

**Status:** Code review needed

---

## 📊 MEDIUM PRIORITY — UX Polish

### 5. Settings Data Not Displaying on Site

**Issue:** Phone number in settings not showing on live site.

**Root Cause:** Settings queries exist but not all are wired to display components.

**What needs wiring:**
- `phone` → Navigation component (if "Call us:" format)
- `address` → Footer
- `business_hours` → Footer or contact section

**Example:** Currently unused in `page.tsx`:
```tsx
const settings = await getSiteSettings()
// Has: phone, address, business_hours
// But components don't use them
```

**Status:** Component updates needed

---

### 6. Pages Need "Connected Data" Bindings

**Issue:** Page blocks can't pull live data from catalog/collections.

**Current State:**
- `BlockRenderer.tsx` handles static blocks (hero, richtext, contact)
- `ProductGrid` component exists but requires manual integration
- Collections data exists but isn't accessible to page editor

**What's Needed:**
- "Connect to Data" UI in `/admin/pages` for page blocks
- Allow selecting `products` collection or `collections` table
- Blocks render live data (like Duda's data bindings)

**Example desired flow:**
1. Jennyfer creates "products" block in page editor
2. Clicks "Connect to Data"
3. Selects "Collections" table
4. Block filters by selected collection on live site

**Status:** Feature design needed

---

## ✅ ALREADY FIXED

- ✅ Asset upload bucket name (`Client Assets`)
- ✅ Admin page preview route (`/admin/preview/[slug]`)
- ✅ Storage RLS policies (pending your SQL run)
- ✅ Better error messages on upload failures

---

## 📋 ACTION PLAN FOR YOU

**Immediate (today):**
1. Run contact_submissions migration in Supabase SQL Editor
2. Test contact form — should work
3. Check asset display on live site → investigate why favicon/about-photo don't work
4. Check if "About Featured Photo" saved correctly

**This week:**
5. Add published pages to Navigation (code change)
6. Wire phone/address/hours to site display (code change)
7. Add social icons to contact form if needed

**Next sprint:**
8. Design + implement "Connected Data" bindings for page blocks
9. Allow Jennyfer to curate pages with live collection data

---

## 🎯 End Goal

After all fixes, Jennyfer can:
- ✅ Upload logo, favicon, photos → display on site
- ✅ Create pages → see them in nav → test before publishing
- ✅ Create featured products collections → display on homepage via data binding
- ✅ Submit contact form → you receive email + admin notification
- ✅ Edit settings (phone, hours) → display on site
- ✅ Build pages with live data (no hardcoding)

---

## 💾 Migrations to Run

All in `supabase/migrations/`:
- `20260801000000_storage_client_assets_policies.sql` — Storage RLS (already provided)
- `20260801000001_ensure_contact_submissions.sql` — Contact form table (just created above)

Run both via:
```bash
supabase migration up
```

Or manually in Supabase SQL Editor.

---

**Next steps:** Let me know when migrations are run, then we can diagnose the asset display issue.
