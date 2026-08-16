# DA Platform — 90-Day Roadmap
**August 16, 2026 – November 14, 2026**

Last updated: 2026-08-16  
Status: All Phase 1 (30-day CMS foundation) complete. Phase 2 starting now.

---

## Completed: Phase 1 — Connected CMS Foundation
**June 29 – July 26, 2026 | ✅ SHIPPED**

- ✅ Next.js 15 skeleton + Vercel auto-deploy
- ✅ Supabase auth (magic links) + multi-tenant schema
- ✅ Admin dashboard (Pages, Articles, Settings, Command Center)
- ✅ Public site renderer reading real CMS data
- ✅ Contact form → email loop (Resend)
- ✅ DNS cutover (digitalallies.net live)
- ✅ Launch QA + v1 release tagged

---

## Phase 2 — Multi-Client Onboarding + Billing
**August 16 – September 30, 2026 | IN PROGRESS**

### Milestone 1: Client Onboarding Flow (Aug 16 – Aug 30)
**Goal:** Non-technical clients can sign up, create a site, go live in one afternoon.

**Deliverables:**
- [ ] Onboarding intake form (brand + domain collection)
- [ ] Automated Supabase row creation (clients table + settings seed)
- [ ] Vercel project creation automation (via API or documented manual steps)
- [ ] ENV var setup script (reduce paste errors)
- [ ] Seed files pre-populated from intake
- [ ] Email confirmation → client gets login link + quick-start guide

**Definition of done:**
New client signs up → receives login + live staging URL same day → can edit a page → sees changes live.

---

### Milestone 2: Billing + Plan Tiers (Sep 1 – Sep 15)
**Goal:** Three clear tiers (Starter / Studio / Agency) with feature gates.

**Deliverables:**
- [ ] Stripe integration (product setup, webhook handler)
- [ ] Billing portal linked from admin
- [ ] RLS policy updates (can() helper enforces tier limits)
- [ ] Feature gates: storage limits, client count, API access
- [ ] Invoice emails on renewal
- [ ] Tier downgrade safeguards (warn before losing features)

**Definition of done:**
Admin can upgrade tier in Stripe → can() immediately reflects new limits → features unlock/lock.

---

### Milestone 3: White-Label Admin Setup (Sep 16 – Sep 30)
**Goal:** Admin shell matches each client's brand, not DA's.

**Deliverables:**
- [ ] Admin logo/name/colors per client (from intake → stored)
- [ ] Branded email templates (onboarding, receipts, alerts)
- [ ] Client-branded documentation (setup, support, API docs)
- [ ] Support portal skeleton (FAQ, contact, live chat stub)

**Definition of done:**
Client logs in → sees their logo + colors, not "Digital Allies" branding.

---

## Phase 3 — First Live Clients
**October 1 – October 31, 2026**

### Milestone 4: Atomic Finds Launch (Oct 1 – Oct 20)
**Goal:** First real external client site lives and generates revenue.

**Deliverables:**
- [ ] Design finalized (Figma → exported components)
- [ ] Product grid + detail modals (responsive, accessible)
- [ ] Review management (render, filter, moderate)
- [ ] Search + filtering (category, price range, rating)
- [ ] SEO pass (meta tags, structured data, sitemap)
- [ ] Performance audit (Lighthouse 90+)
- [ ] Launch checklist (a11y, i18n, legal pages)

**Definition of done:**
atomicfindsatx.com goes live → customers see products + reviews → Jennyfer sees orders + admin panel.

---

### Milestone 5: Digital Allies Marketing Rebuild (Oct 21 – Oct 31)
**Goal:** DA's own site runs on the CMS it sells.

**Deliverables:**
- [ ] Port digitalallies.net from static HTML to CMS-powered
- [ ] Services + testimonials fully editable in admin
- [ ] Blog (articles module) live
- [ ] Case studies section (custom blocks or article type)
- [ ] Contact form → inbound leads in Command Center
- [ ] Analytics integration (Vercel Web Analytics)

**Definition of done:**
digitalallies.net routes through CMS → all content editable → blog posts go live in admin.

---

## Phase 4 — Platform Maturity
**November 1 – November 14, 2026**

### Milestone 6: Developer + Client Docs (Nov 1 – Nov 7)
**Goal:** Clients and developers can self-serve.

**Deliverables:**
- [ ] Client onboarding guide (video + written)
- [ ] Admin module walkthroughs (Pages, Articles, Settings, etc.)
- [ ] Developer API docs (for custom integrations)
- [ ] Troubleshooting guide (common issues + fixes)
- [ ] YouTube walkthrough (5–10 min per major feature)

**Definition of done:**
New client can read the guide and launch a page without asking questions.

---

### Milestone 7: Post-Launch Polish (Nov 8 – Nov 14)
**Goal:** Fix bugs found in live usage; optimize for next wave.

**Deliverables:**
- [ ] Bug triage + priority fixes (from AF + DA launches)
- [ ] Performance tuning (DB queries, image optimization)
- [ ] UX improvements (based on real user feedback)
- [ ] Security audit (penetration test or pro review)
- [ ] Backup + disaster recovery testing

**Definition of done:**
Platform stable + documented + ready for next 5 clients.

---

## Running Automations & Checkpoints

**Weekly sync (every Monday 9am AZ):**
- Review completed milestones
- Flag blockers
- Adjust timeline if needed

**Bi-weekly delivery (1st & 3rd Wed 2pm AZ):**
- Ship milestone deliverables
- Deploy to Vercel
- Update client comms

**End-of-phase review (Fri before phase ends):**
- Retrospective (what worked, what didn't)
- Prep next phase kickoff

---

## Skill Inventory (Actively Used)

| Skill | Purpose |
|-------|---------|
| `deploy-to-vercel` | Ship milestones live |
| `stripe-projects` | Billing integration |
| `da-legal-compliance-checklist` | Pre-launch QA |
| `digital-allies-brand` | Client comms + docs |
| `frontend-design` | Component work |
| `figma-use` | Design handoff + implementation |

---

## Stack (Unchanged from Phase 1)

- **Framework:** Next.js 15 (App Router, TypeScript)
- **Data + Auth:** Supabase (Postgres, RLS)
- **Styling:** Tailwind CSS + design tokens
- **Email:** Resend
- **Hosting:** Vercel (one deployment per client)
- **Payments:** Stripe (billing)

---

## How to Use This Roadmap

1. **Claude Code integration:** `claude tasks import CMS-90-DAY-ROADMAP.md`
2. **Weekly review:** Check boxes as milestones close
3. **Blocked items:** Flag here, discuss in weekly sync
4. **Scope creep:** Anything not in a milestone gets deferred to Phase 5

This is the master truth. Keep it in sync with your actual progress and update it weekly.
