# Digital Allies — Complete Setup & Integration Guide

This document ties everything together: design system, CMS, website, and admin dashboard.

## Repository Structure

```
Digital-Allies/DigitalAllies (PUBLIC WEBSITE)
├── cms/
│   ├── CMS_IMPLEMENTATION_PLAN.html    # 5-week roadmap
│   ├── CMS_DASHBOARD_UI.html           # Interactive mockup
│   ├── README.md                       # CMS overview
│   └── WIRING_GUIDE.md                 # How to connect everything
├── design-system/
│   ├── styles/
│   ├── fonts/
│   ├── assets/
│   ├── components/
│   ├── templates/
│   └── ...
└── index.html, about.html, services.html, etc.
```

## Three Separate Codebases

### 1. Public Website
- **URL:** https://digitalallies.net
- **Repo:** Digital-Allies/DigitalAllies
- **Purpose:** Marketing + services showcase
- **Feeds data from:** Supabase CMS backend
- **Deployed to:** Vercel

### 2. Admin Dashboard (CMS)
- **URL:** https://da-webwssite-build-workflows.vercel.app
- **Repo:** cassellac/da-webwssite-build-workflows
- **Purpose:** Manage content (tools, services, calendar)
- **Stores data in:** Supabase
- **Deployed to:** Vercel

### 3. CMS Backend (Database)
- **Service:** Supabase
- **Purpose:** Single source of truth for all content
- **Tables:** tools, services, content_calendar, users
- **API:** REST endpoints for both website + admin

## Phase 1: Foundation (You are here)

✅ Design system consolidated (done)
✅ CMS implementation guide (done)
✅ CMS dashboard UI mockup (done)
⏳ Wiring instructions (ready)

## Phase 2: Integration (Next)

- [ ] Connect admin dashboard to Supabase
- [ ] Create database tables in Supabase
- [ ] Set up RLS (Row Level Security) policies
- [ ] Connect website to Supabase API
- [ ] Test services page pulling from CMS
- [ ] Test tool detail pages pulling from CMS
- [ ] Test calendar displaying on website

## Phase 3: Client Onboarding (After)

- [ ] Healthcare Training Center migration
- [ ] Atomic Finds greenfield build
- [ ] Both integrate with same Supabase backend

---

**Current Status:** Foundation ready. Awaiting integration work.

**Next Action:** When ready, follow `WIRING_GUIDE.md` to connect the three systems.
