# Atomic Finds CMS Audit — Work Queue

**Date:** 2026-08-08  
**Status:** In Progress  
**Approach:** Batch edits with template notes for DA CMS replication  
**Key Principle:** Client-friendly UX, not designer-technical. Interactive UI, not dropdowns/lists.

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

### Work Stream 2.1: Connected Data & Theme UX Redesign 🚨 CRITICAL
**Status:** Redesign Planned (User Feedback: Current approach too technical for non-technical clients)  
**User Feedback:** [Aug 9] Current Connected Data and Theme editors too complex. Duda pattern is simpler, more interactive, client-friendly.

#### Problem: Current Approach
- Connected Data: "variable name" + "value" pattern scares non-technical users (like Jenny)
- Theme: Dropdown menus for colors + separate preview panel = clunky, not interactive
- Missing features: No custom color additions, no Google Fonts, no font uploads, no glow sliders
- Jargon: "Brand token" is designer-speak, non-technical users won't understand

#### A. Connected Data Redesign (Duda Pattern)
**Goal:** Simple, labeled text blocks. No code-like terminology. Right-click integration in page editor.

**UX Changes:**
1. Rename "Custom Variables" → "Content Blocks" (or "Data Blocks")
2. Simple interface: label field + text area (like "Business Name" or "About Us")
3. No "variable_name" or complex naming — users freely name their blocks
4. In page editor: right-click text/block → "Connect to Content Block" → select from saved list
5. Selected content auto-inserts into text, heading, button blocks
6. No separate "how to use" instructions — flow is obvious in-editor

**Files to Update:** `tools/build-workflows/src/app/admin/(protected)/settings/page.tsx` (ConnectedData tab)

**Template Notes:** Generalizable for DA CMS — same pattern applies to all clients

#### B. Theme Editor Redesign (Interactive, Customizable)
**Goal:** Interactive UI, not dropdowns. Client can customize without fear. All changes update brand tokens.

**UX Changes:**

**Colors:**
- Replace dropdown with color picker (hex/RGB/color wheel)
- Show all 4 default colors as interactive boxes (click to edit)
- "Add Color +" button to add unlimited custom colors
- Each color updates a brand token automatically (--tok-primary, --tok-secondary, etc.)

**Typography:**
- Support Google Fonts dropdown (integrate GF API)
- "Upload Custom Font" button (for OTF/TTF files)
- Show live preview of each font selection (in actual UI)
- Select from uploaded + Google Fonts simultaneously
- All font choices update brand tokens (--tok-heading-font, --tok-body-font, etc.)

**Buttons/Glow:**
- Live preview of button styles directly in settings (not separate list)
- Users interact with actual button UI to see changes in real-time
- Glow effect: slider (0-100) instead of dropdown
- See preview of glow strength as slider moves
- All changes update brand tokens instantly

**Language:**
- Remove "brand token" → use plain English labels: "Primary Color", "Heading Font", "Glow Strength"
- Users should feel empowered to change anything, anytime

**Files to Update:** `tools/build-workflows/src/app/admin/(protected)/settings/page.tsx` (Theme tab)

**Template Notes:** Generalizable for DA CMS — same interactive pattern, customize tokens per client

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

## 🎯 NEXT STEPS (Revised per User Feedback Aug 9)

1. **PRIORITY: Connected Data UX Redesign** (Duda pattern — simpler, client-friendly)
   - Replace "variable name" terminology
   - Add right-click "Connect to Data" in page editor
   - No jargon, simple labeled text blocks

2. **PRIORITY: Theme Editor Redesign** (Interactive, customizable, sliders not dropdowns)
   - Color picker instead of dropdown
   - Google Fonts + custom font upload
   - Glow as slider, live previews
   - Plain English labels (remove "brand token" jargon)

3. **Then: Product Image Paths** (CSV import image_url fix)

4. **Then: Page Editor Layering** (z-index + draggable layer order)

5. **Keep template notes** for DA CMS equivalent changes

---

**Key Philosophy:** CMS should be **client-friendly, not designer-technical**. Interactive UI, not list-based selections. Customizable without fear.  
**Template Pattern:** Every change documents what's AF-specific vs generalizable, so DA CMS template can adopt the same fixes without rework.
