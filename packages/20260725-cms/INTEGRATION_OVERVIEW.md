# Digital Allies — Complete Setup & Integration Guide

This document ties everything together: design system, CMS, website, and admin dashboard.

> **The CMS is one interface:** the Connected CMS Dashboard at `dashboard.html`. It must do three jobs — website page editing (a section-based page builder), global design-system editing (brand tokens), and blog/article publishing. Full scope: `../CMS_IMPLEMENTATION_PLAN.html`.

## Repository Structure

```
Digital-Allies/DigitalAllies (PUBLIC WEBSITE)
├── cms/
│   ├── dashboard.html                  # THE CMS — canonical admin dashboard
│   ├── app.js, style.css               # dashboard logic + styles
│   ├── README.md                       # CMS overview
│   ├── INTEGRATION_OVERVIEW.md         # this file
│   ├── WIRING_GUIDE.md                 # how to connect everything
│   └── _archive/                       # superseded prototypes (reference only)
├── CMS_IMPLEMENTATION_PLAN.html        # CMS spec + build plan (scope)
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
✅ CMS specification written — scope + build plan (done)
✅ Canonical CMS dashboard prototype — `dashboard.html` (done)
⏳ Backend wiring — page builder, token editor, publishing (next)

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
