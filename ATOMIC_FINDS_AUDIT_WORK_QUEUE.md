# Atomic Finds CMS Audit — Work Queue

**Date:** 2026-08-08  
**Status:** In Progress  
**Approach:** Batch edits with template notes for DA CMS replication

---

## ✅ COMPLETED

### Work Stream 1: Onboarding Tab v2
- **Commit:** `bf1554d` (2026-08-07 11:52, auto-synced by MM23)
- **Changes:** 13 collapsible sections with AF brand voice, Curator system, CSV guide, Journal content, SEO focus
- **Template Notes:** Included in OnboardingClient.tsx comments (lines ~305-340)
- **Generalizable:** Section structure, expand/collapse pattern, footer resource links
- **AF-Specific:** Brand colors (#F5C842), Curators (Daisy/Milo/Tatiana/Malibu), collections, copy tone

---

## 🚧 IN PROGRESS / PARTIAL

### Work Stream 2: Settings Refactoring ✅ STRUCTURE COMPLETE
**Commit:** `28c1919` (2026-08-08)  
**Status:** 6-tab structure implemented, types updated, compiles successfully  
**Files Changed:** 
- `tools/build-workflows/src/app/admin/(protected)/settings/page.tsx` (+581 lines)
- `tools/build-workflows/src/lib/types.ts` (added meta_pixel_id, custom_code_head/body)

**Completed Goals:**
- ✅ Reorganized into 6 clear tabs: Site Info, Contact, Analytics, Advanced, Connected Data, Theme
- ✅ Added Advanced Config tab (GA4, Meta Pixel, custom head/body code)
- ✅ Simplified Connected Data UI (reusable variables, not confusing key/value)
- ✅ Removed page-specific fields (hero_*, about_* will move to page editor in future)
- ✅ Unsaved changes indicator shows which tabs need attention
- ✅ "Publish All Settings" button structure (global publish logic not yet wired)

**Pending (Follow-up):**
- Global "Preview Site with Settings" button → UI scaffolded, modal logic needed
- Global publish logic → database sync logic needed
- Custom code injection into page render → head/body code not yet wired to site
- Move hero/about fields from settings → to page editor

**AF-Specific Implementation:**
- Color scheme: #F5C842 (Celestial), #1E1E1E (Charcoal) in labels/helpers
- Meta Pixel ID field added (was missing, critical for AF ad tracking)
- Custom code sections for CSS glow effects, tracking scripts
- Connected data examples for Curator system variables

**Template Notes:** Included in Settings component (lines ~6-40)

---

## 📋 WORK QUEUE (Prioritized)

### A. Product Image Paths (P1 - Blocking)
**Issue:** Test collection CSV import has broken image_url values  
**Impact:** Products don't display photos  
**Root Cause:** image_url format incorrect or pointing to wrong path  
**Expected Format:** `/atomic-finds/products/product-name.png`  
**Fix Approach:**
1. Query Supabase products table for AF client (broken paths)
2. Identify pattern (what format are they in?)
3. Create migration or bulk update
4. Verify images load on storefront

**Template Notes:** Issue exists for all clients using CSV import; fix should be generalizable

---

### B. Settings Global Preview + Publish (P1 - Workflow Blocker)
**Issue:** No way to see all settings changes together before publishing  
**Impact:** Must edit multiple tabs, guess if they work together  
**Current:** Each section has inline preview  
**Needed:**
- Global preview panel showing full site with all pending settings changes
- "Publish All Settings" button (instead of per-section publish)
- Toast/confirmation showing what changed

**Scope:** Settings refactoring (Work Stream 2) will include this

---

### B. Page Editor Layering (P1 - BLOCKING)
**Issue:** Custom HTML/code blocks don't support layers — nothing can go on top  
**Symptoms:**
- Add custom HTML with particle animation background
- Try to add text/images/buttons on top → can't layer them
- Looks "weird" because animated background sits alone
- No way to compose blocks with custom code as background

**Impact:** Blocks all page creation that uses custom animations or backgrounds  

**Fix Approach:**
1. Add z-index/stacking order to block system
2. Show visual layer order (draggable reordering of blocks)
3. Custom code blocks can set as "background" (lowest z-index)
4. Text, image, button blocks layer on top
5. Transparent/semi-transparent blocks work over backgrounds

**AF-Specific:** Celestial Scroll Hero and constellation canvas need background layer with text/CTAs on top  
**Template Notes:** Block layering is generalizable across all clients

---

### C. Page Generator Formatting (P2 - Visual)
**Issue:** Generated pages (via Pages editor) look different from home page  
**Symptoms:**
- No global header/footer on generated pages (including Privacy/Legal)
- Logo size inconsistent (large on test page, normal on home)
- Button styles different across pages
- Privacy/Legal pages formatted differently from each other

**Root Causes (Hypothesis):**
- Generated pages use different layout component than home
- Logo sizing from settings not normalized
- Button styles from design tokens not applied universally
- Header/footer not included in page template

**Fix Approach:**
1. Compare home layout vs generated page layout
2. Ensure all pages use same header/footer wrapper
3. Normalize logo sizing via CSS variable
4. Audit button styles across all components
5. Verify privacy/legal pages use same template

**AF-Specific:** Logo should use Atomic Finds mark, respect #F5C842 color  
**Template Notes:** Layout inconsistency likely affects all clients; fix should be generalizable

---

### D. Blog / Press Office Fixes (P2 - Feature)
**Issues:**
1. New blog posts don't auto-generate `/blog/[slug]` pages
2. No preview option before publishing
3. No content templates (free-form HTML instead of structured blocks)

**Fix Approach:**
1. Check if blog post routes are wired up dynamically
2. Add preview modal to PostsClient
3. Create content block templates (heading, image, text, etc.)

**AF-Specific:** Blog called "The Journal" in AF copy, should include restoration stories, care guides  
**Template Notes:** Blog architecture is generalizable; content templates should be client-specific

---

## 📊 SUMMARY

| Work Stream | Status | Impact | Est. Commits |
|---|---|---|---|
| 1. Onboarding Tab v2 | ✅ Done | High | 1 (auto-synced) |
| 2. Settings Refactoring | 🚧 Next | Critical | 2–3 |
| 3. Product Taxonomy | 📋 Queue | High | 2–3 |
| 4. Copy Framework | 📋 Queue | High | 1–2 |
| **Blockers:** | | | |
| A. Product Image Paths | 🚨 P1 | Blocks display | 1 |
| B. Settings Global Preview | 🚨 P1 | Blocks workflow | Included in #2 |
| C. Page Formatting | 🔴 P2 | Visual | 1–2 |
| D. Blog/Press Fixes | 🔴 P2 | Feature | 2 |

---

## 🎯 NEXT STEPS

1. **Start Settings Refactoring** (includes global preview/publish)
2. **Investigate product image paths** (run SQL query, identify format issue)
3. **Audit page layout components** (identify formatting root causes)
4. **Keep template notes** for DA CMS equivalent changes

---

**Template Pattern:** Every change documents what's AF-specific vs generalizable, so DA CMS template can adopt the same fixes without rework.
