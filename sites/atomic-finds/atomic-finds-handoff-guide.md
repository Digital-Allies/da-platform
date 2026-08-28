# Atomic Finds CMS Handoff — Complete Todo List

**Generated:** 2026-08-01  
**Status:** Pre-handoff audit in progress  
**Target:** Jennyfer self-service CMS (Duda-level functionality)

---

## 🚨 CRITICAL — Blocks Form Submission

### 1. [FIXED] Contact Form Returns "Server Error"
- **Status:** ✅ RESOLVED
- **What was done:**
  - Added `SUPABASE_SERVICE_ROLE_KEY` to `atomic-finds-atx` Vercel project
  - Added `SUPABASE_URL` to `atomic-finds-atx` Vercel project
  - Updated `/api/contact/route.ts` to check for missing CLIENT_ID
- **Verification:** Contact form tested, email received successfully at acinktown@gmail.com
- **Files changed:**
  - `tools/build-workflows/src/app/api/contact/route.ts` (lines 14, 17-22)
  - Vercel env vars for `atomic-finds-atx` project

---

### 2. [REGRESSION] Assets Uploading as Base64 (Back to Old Behavior)
- **Status:** ⚠️ NOT FIXED — Issue has returned
- **Root cause:** Unknown, needs investigation
- **Previous attempt:**
  - Changed bucket name in MediaUploader.tsx line 22 from `'client-assets'` to `'Client Assets'`
  - Removed silent base64 fallback, added error alerts
  - User confirmed logo was uploading correctly at session midpoint
  - **Now:** Settings files are back to base64 format
- **What to check:**
  1. Is bucket name still correct in MediaUploader.tsx?
  2. Are storage RLS policies still in place? (check Supabase dashboard)
  3. Is `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` set in all projects?
  4. Check browser console for specific error when uploading
  5. Check Supabase logs for RLS policy rejections
- **Next steps:**
  - Reproduce upload error and capture exact error message
  - Review `src/components/admin/MediaUploader.tsx` for regression
  - Verify `/[client_id]/` folder structure is still being created

---

## 🔧 Storage Bucket Organization

### 3. Rename Client Assets Folder Structure
- **Current state:** 
  - Bucket: "Client Assets"
  - Subdirectory: `443936d5-f92e-480b-b206-c65cfb52bdfc/` (client UUID)
  - Files upload here correctly when working
- **User request:** Rename to `atomic-finds/` for clarity, delete old UUID folder
- **Action:**
  1. In Supabase Storage, create new folder: `atomic-finds/`
  2. Move/copy all files from `443936d5-f92e-480b-b206-c65cfb52bdfc/` to `atomic-finds/`
  3. Update MediaUploader.tsx to use `atomic-finds/` as the subfolder
  4. Test uploads work with new path
  5. Delete old UUID folder once verified
- **File to update:** `src/components/admin/MediaUploader.tsx` (lines ~57-74 where subfolder is set)

---

## ⚠️ HIGH PRIORITY — Blocks Testing/Deployment

### 4. [TODO] Add Published Pages to Navigation
- **Status:** ❌ NOT STARTED
- **Issue:** Navigation hardcoded; Jennyfer can create pages but they don't appear in nav menu
- **Blocks:** Can't test pages before publishing; pages are invisible to users
- **Files to modify:**
  - `src/components/site/Navigation.tsx` (needs to query pages table)
  - Need to implement `getPublishedPages()` function in `src/lib/data.ts` if not exists
- **Implementation:**
  1. Fetch published pages: `const pages = await getPublishedPages()`
  2. Render as nav links alongside existing hardcoded links
  3. Test that newly published pages appear in nav immediately
- **Example:** After Jennyfer publishes "About" page at `/about`, it should appear in the nav menu

---

### 5. [TODO] Add Social Media Icons to Contact Form
- **Status:** ❌ NOT STARTED
- **Issue:** Contact form shows "facebook_url" text instead of icons
- **Blocks:** Social links non-functional; looks broken
- **File to modify:** `tools/build-workflows/sites/atomic-finds/components/AtomicContactForm.tsx`
- **Implementation:**
  1. Import icon components (check what's available in design-system)
  2. Replace text display with icon rendering
  3. Ensure links are clickable (facebook_url, instagram_url from settings)
- **Reference:** Check if icon components exist in `packages/design-system/src/components/`

---

## 📊 MEDIUM PRIORITY — UX Polish

### 6. [TODO] Wire Settings Data to Display Components
- **Status:** ❌ NOT STARTED
- **Issue:** Settings exist in DB but don't display on live site
- **Data to wire:**
  - `phone` → Navigation or footer (currently only in contact section)
  - `address` → Footer
  - `business_hours` → Footer or contact section
- **Files to modify:**
  - `src/components/site/Navigation.tsx`
  - `src/components/site/Footer.tsx`
  - `tools/build-workflows/sites/atomic-finds/components/AtomicContactForm.tsx`
- **Current status:** Settings are fetched in page.tsx (line 25) but not used everywhere
- **Test:** After Jennyfer updates phone number in `/admin/settings`, it should appear on live site within 60s (ISR)

---

### 7. [TODO] Favicon Upload & Display
- **Status:** ⚠️ PARTIALLY FIXED
- **What was done:** Added favicon to `generateMetadata()` in layout.tsx
- **Next step:** Jennyfer uploads favicon via `/admin/settings` → `favicon_url` field
- **Test:** Once uploaded, favicon should appear in browser tab
- **File:** `src/app/layout.tsx` (lines 7-19, metadata generation)

---

### 8. [TODO] About Image Upload & Display
- **Status:** ⚠️ PARTIALLY FIXED
- **What was done:** TwoColumn component already wired to display `about_image_url` (page.tsx:83)
- **Next step:** Jennyfer uploads image via `/admin/settings` → `about_image_url` field
- **Test:** Image should appear on homepage "About" section (left side, with border)
- **Files:** Already implemented, no code changes needed
  - Upload via: `src/app/admin/(protected)/settings/page.tsx`
  - Display via: `src/components/site/TwoColumn.tsx` (lines 30-41)

---

### 9. [DEFERRED] Connected Data Bindings for Page Blocks
- **Status:** ❌ NOT STARTED — Complex feature, likely next sprint
- **Issue:** Page blocks can't pull live data from collections/products
- **Desired UX:** Jennyfer selects "collections" data source in page editor → block renders live data
- **Current state:** Blocks are static (hero, richtext, contact, products grid)
- **Scope:** Large feature requiring:
  - New UI in page editor for "Connect to Data"
  - Data source selection (products, collections table)
  - Dynamic block rendering based on selection
  - Filtering/sorting options in editor
- **Reference:** `src/components/site/BlockRenderer.tsx` (current static implementation)
- **Estimate:** 2-3 days of work, defer to next sprint

---

## 🏗️ ARCHITECTURAL ISSUES

### 10. [ATTEMPTED, REVERTED] CMS Backend Exposing Public-Facing Site
- **Status:** ⚠️ NEEDS PROPER SOLUTION
- **Issue:** `tools/build-workflows/` serves full public homepage (wrong)
- **What happened:**
  - Attempted to add redirect to `NEXT_PUBLIC_SITE_URL` in page.tsx
  - Caused redirect loop on atomic-finds-atx (redirects to itself)
  - Reverted to original behavior
- **Root cause:** Same code runs on both CMS backend (`cms.digitalallies.net`) and public site (`atomicfindsatx.store`)
  - Both are different Vercel projects but same codebase
  - Redirect breaks public site
- **Real solution needed:**
  1. Check hostname/domain before redirecting
  2. Only redirect if running on CMS backend domain
  3. Allow public sites to serve normal homepage
- **Example logic:**
  ```typescript
  const hostname = headers().get('host')
  if (hostname?.includes('cms') && process.env.NEXT_PUBLIC_SITE_URL) {
    redirect(process.env.NEXT_PUBLIC_SITE_URL)
  }
  ```
- **Status:** Deferred, needs careful implementation to not break public sites

---

## ✅ VERIFIED & WORKING

- ✅ **Three seed files correct:** settings, design_tokens, pages
- ✅ **Storage RLS policies in place:** Public read, authenticated upload/delete
- ✅ **Contact_submissions table created:** Schema and RLS policies working
- ✅ **Vercel environment variables:** All three public site projects have necessary vars
- ✅ **Logo upload & display:** Confirmed working end-to-end
- ✅ **Contact form email delivery:** Resend API integrated and working
- ✅ **Supabase connections:** Server-side client initialization now succeeds

---

## 📋 FILES CHANGED THIS SESSION

| File | Changes | Status |
|------|---------|--------|
| `src/app/layout.tsx` | Added favicon to metadata | ✅ |
| `src/app/api/contact/route.ts` | Added CLIENT_ID validation | ✅ |
| `src/app/page.tsx` | Attempted redirect, reverted | ⏮️ Reverted |
| `src/components/admin/MediaUploader.tsx` | Changed bucket name, added error handling | ⚠️ Regression |
| Vercel env vars (atomic-finds-atx) | Added SUPABASE_* keys | ✅ |
| Supabase migrations | Created storage RLS & contact_submissions | ✅ |

---

## 🎯 Before Handing Off to Jennyfer

**Jennyfer needs to be able to:**
1. ✅ Submit contact form and receive email (DONE)
2. ⚠️ Upload logo, favicon, product images (in progress, base64 regression)
3. ❌ Create pages and see them in navigation menu (NOT DONE)
4. ❌ See phone number, address, hours on footer (NOT DONE)
5. ✅ View published content on live site (works, ISR refresh in 60s)
6. ❌ Share links to published pages (blocked by #3)

**Estimated remaining work:** 2-3 days (excluding deferred features)

---

## 🔗 Related Documentation

- `STATUS.md` — Project state and recent PRs
- `CMS-COMPLETION-CHECKLIST.md` — Earlier checklist (partially outdated)
- `DA-PLATFORM-MASTER-CONTEXT.md` — Architecture decisions
- CLAUDE.md — Directory structure and non-negotiables
