# DA Platform — 90-Day Roadmap (REVISED)
**August 16, 2026 – November 14, 2026**

Last updated: 2026-08-16 (revised after CMS audit)  
Status: Phase 1 shipped (foundation). Phase 2 completely restructured — focus is **finishing the CMS platform**, not multi-client onboarding yet.

---

## Completed: Phase 1 — Connected CMS Foundation
**June 29 – July 26, 2026 | ✅ SHIPPED**

- ✅ Next.js 15 skeleton + Vercel auto-deploy
- ✅ Supabase auth (magic links) + multi-tenant schema
- ✅ Admin dashboard (11 modules, partially connected)
- ✅ Public site renderer (for CMS-connected clients)
- ✅ Contact form → email loop (Resend)
- ✅ v1 release tagged

**Reality check:** Platform is functional but has critical gaps in:
- Admin UX/usability (INP perf, orphaned features, unclear workflows)
- CMS-to-live-site connectivity (Pages, Collections, Press Office not fully wired)
- Tenant isolation (metadata, branding not per-client in admin shell)

---

## Phase 2 — Finish the CMS Platform
**August 16 – September 30, 2026 | IN PROGRESS**

**Goal:** Make the CMS actually work end-to-end. Every admin action syncs to the live site. Atomic Finds ships as proof.

### Milestone 1: Tenant Branding & Metadata (Aug 16 – Aug 25)
**Priority: CRITICAL**

Every client who logs in should see *their* brand, not Digital Allies.

**Deliverables:**
- [x] Admin shell pulls business name/logo/colors from `clients.settings` (currently hardcoded)
- [x] `<head>` metadata dynamic per tenant (title, description, favicon request handling)
- [x] Browser tab title changes to client name on login (not "Digital Allies CMS")
- [x] Sidebar/nav colors match client brand token
- [x] Vercel routing: primary domain (`da-webwssite-build-workflows.vercel.app` or `cms.digitalallies.net`) redirects to `/admin/login` (not mock homepage)
- [x] After login, admin sees client-specific branding throughout

**Definition of done:**
- Login as any client → see their logo/name in admin shell
- Browser tab shows "Atomic Finds ATX" (or client name), not "Digital Allies"
- Primary Vercel URL shows admin login form, not mock site

**Audit finding:** Settings module stores brand data but admin shell ignores it.

---

### Milestone 2: Fix Admin UX & Broken Features (Aug 26 – Sep 5)
**Priority: HIGH**

Admin dashboard is 6.5/10. Fix the worst usability issues so it's actually usable.

**Deliverables:**
- [x] **Dashboard:** Fix INP performance issue (event handler blocking 600ms); remove orphaned "Dev Tasks" references
- [ ] **Pages module:** Fix "create" tab routing; add batch delete with confirmation
- [ ] **Collections:** Remove confusing empty state; clarify CSV import workflow (or hide if not ready)
- [ ] **Showroom (Products):** Add delete confirmation dialogs; add search/filter by name, category, price
- [ ] **Projects:** Test & fix Kanban drag-and-drop; fix incorrect count display; add visual indicator for selected project
- [ ] **Brand Theme:** Real-time preview (color changes update preview instantly, not static)
- [ ] **Settings:** Clarify publish workflow (auto-save vs. batch publish); hide/mask test data (Meta Pixel ID)
- [ ] **All modules:** Add unsaved-changes warning; form validation feedback; consistent button styling
- [ ] **Error handling:** Add toast notifications for success/error/warning messages

**Definition of done:**
Admin dashboard is 8+/10 for usability. No broken features, no confusing UX patterns, clear feedback on every action.

**Audit findings:** 10 modules analyzed; 6 have critical UX issues. Collections, Showroom, Settings are worst offenders.

---

### Milestone 3: Connect CMS to Live Site (Sep 6 – Sep 20)
**Priority: HIGH**

Right now, 60% of admin actions don't show up on the live site. Fix it.

**Deliverables:**
- [ ] **Pages module → live site:** Pages set to PUBLISHED render at `/pages/[slug]`; Featured Finds & About now accessible (not 404)
- [ ] **Collections → product filtering:** Products tagged with collections filter correctly on live site
- [ ] **Press Office/Blog:** Published articles show at `/blog/[slug]`; add Blog section to navigation
- [ ] **Contact form:** Test full end-to-end; confirm submissions hit Messages module; add success toast on submit
- [ ] **Product images:** Verify all images load; handle missing images gracefully
- [ ] **Language switching:** Verify all UI elements translate (not just page content); test route translations (e.g., "TIENDA" vs "SHOP")
- [ ] **SEO/structured data:** Verify all public pages have correct meta tags, hreflang, JSON-LD

**Definition of done:**
- Publish a page in Pages module → see it live within 30 seconds
- Tag a product with a collection → see it filter on live site
- Publish a blog post → see it appear in Blog section
- Change contact email in Settings → form targets new email

**Audit findings:** Product display works (10/10), but Pages (5/10), Collections (0/10), Blog (0/10), Contact form (6/10) disconnected.

---

### Milestone 4: Atomic Finds Launch Sprint (Sep 21 – Sep 30)
**Priority: CRITICAL**

First real external client. Proof that the platform works end-to-end.

**Deliverables:**
- [ ] Atomic Finds Vercel project created & deployed
- [ ] Design finalized and components exported from Figma
- [ ] Product grid + detail modals (responsive, accessible)
- [ ] Review management (render, filter, moderate in admin)
- [ ] Search + filtering (category, price, rating)
- [ ] SEO pass (meta tags, structured data, sitemap)
- [ ] Lighthouse audit (90+)
- [ ] Launch checklist (a11y, i18n, legal pages)
- [ ] Go live: atomicfindsatx.com points to Vercel deployment
- [ ] Client (Jennyfer) logs in, edits product, sees changes live

**Definition of done:**
- atomicfindsatx.com live
- Products sync from CMS to live site in real-time
- Client can manage inventory + publish updates herself

**Why this phase:** Atomic Finds is the test case. If it works, the platform works. Every issue found here fixes the platform for the next 10 clients.

---

## Phase 3 — Multi-Client Onboarding + Scaling
**October 1 – October 31, 2026**

Once the platform is solid and Atomic Finds proves it, scale to multiple clients.

### Milestone 5: Client Onboarding Flow (Oct 1 – Oct 15)
**Goal:** Non-technical clients can self-serve.

**Deliverables:**
- [ ] Onboarding intake form (brand + domain collection)
- [ ] Automated Supabase row creation (clients table + settings seed)
- [ ] Vercel project creation (manual steps documented clearly)
- [ ] ENV var setup script (reduce paste errors)
- [ ] Email confirmation → client gets login link + quick-start guide

**Definition of done:**
New client signs up → receives login + live staging URL same day → can edit a page → sees changes live.

---

### Milestone 6: Billing + Plan Tiers (Oct 16 – Oct 31)
**Goal:** Three clear tiers with feature gates.

**Deliverables:**
- [ ] Stripe integration (product setup, webhook handler)
- [ ] Billing portal linked from admin
- [ ] RLS policy updates (can() helper enforces tier limits)
- [ ] Feature gates: storage limits, client count, API access

**Definition of done:**
Client upgrades tier in Stripe → can() immediately reflects new limits → features unlock/lock.

---

## Phase 4 — Polish & Documentation
**November 1 – November 14, 2026**

### Milestone 7: Client + Developer Docs (Nov 1 – Nov 7)
- Client onboarding guide (video + written)
- Admin module walkthroughs
- Developer API docs
- Troubleshooting guide

### Milestone 8: Post-Launch Polish (Nov 8 – Nov 14)
- Bug fixes from Atomic Finds + live usage
- Performance tuning
- Security audit
- Backup + disaster recovery testing

---

## What Changed from Original Roadmap

| Original Phase 2 | Revised Phase 2 |
|---|---|
| Multi-Client Onboarding (Aug 16–30) | Tenant Branding & Metadata (Aug 16–25) |
| Billing (Sep 1–15) | Admin UX Fixes (Aug 26–Sep 5) |
| White-Label Admin (Sep 16–30) | CMS-to-Site Connectivity (Sep 6–20) |
| — | **Atomic Finds Launch (Sep 21–30)** |

**Rationale:** The audit revealed the platform isn't ready for multi-client onboarding. Admin UX is broken, CMS-to-site connectivity is partial, and tenant branding is hardcoded. Fix these first, then prove it works with Atomic Finds. Multi-client scaling comes *after* proof, not before.

---

## Critical Fixes Required (Before Phase 2 Can Close)

1. **Primary Vercel URL behavior**
   - Current: Shows mock homepage (confusing)
   - Target: Redirects to `/admin/login` or shows login form
   - Reason: Nobody should see a mock site; admin should be the only entry point

2. **Tenant metadata isolation**
   - Current: Browser tab always says "Digital Allies CMS"; settings not pulled into metadata
   - Target: `<meta name="og:title">` = client name; browser tab = client name; only favicon stays the same
   - Reason: Client bookmarks the admin → sees "Atomic Finds ATX" in browser bar, not confusion

3. **CMS-to-site sync latency**
   - Current: Some modules sync, some don't; unclear if changes are live or delayed
   - Target: Publish in admin → live within 30 seconds (or < ISR revalidate time)
   - Reason: Client needs confidence that edits stick

---

## Running Checkpoints

**Weekly sync (Mondays 9am AZ):**
- Review milestone progress
- Unblock issues
- Adjust scope if needed

**Milestone completion (end of each week):**
- Deploy to Vercel
- Audit against acceptance criteria
- Flag any scope creep

---

## Stack (Unchanged)

- Next.js 15, Supabase, Tailwind, Resend, Vercel, Stripe (when added)

---

## How to Use This Revised Roadmap

1. `claude tasks import CMS-90-DAY-ROADMAP-REVISED.md`
2. Weekly review against this document
3. Any item not in a milestone = deferred to Phase 5 (scope creep protection)
4. Atomic Finds is the north star. If it launches successfully, the platform is proof-ready.

This is the corrected master truth.
