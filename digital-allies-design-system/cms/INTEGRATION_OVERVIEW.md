# CMS Integration Overview

## The Three-Part Architecture

Your final setup will have three components all talking to each other:

### 1. Public Website (digitalallies.net)
- Displays services, tools, content
- **Fetches data from** Supabase API
- Will eventually live in Vercel (same project as admin)
- Uses the design system for styling

### 2. Admin Dashboard (CMS Interface)
- Create/edit/delete tools, services, content calendar
- **Writes data to** Supabase
- Lives in Vercel (same project as website)
- Uses the design system for admin UI

### 3. Supabase Backend (Database)
- Single source of truth for all content
- Tables: `tools`, `services`, `content_calendar`, `users`
- Both website and admin talk to it via REST API
- Handles authentication, permissions, data storage

## Data Flow

```
Admin edits tool name
        │
        ▼
Submits to Supabase
        │
        ▼
Website API call fetches latest
        │
        ▼
Website page re-renders with new name
```

## Single Vercel Project (Final State)

```
vercel.com/your-project
├── /website/              ← Public site
│   ├── services.html      ← Fetches from Supabase
│   ├── tools/[slug].html  ← Fetches from Supabase
│   └── ...
├── /admin/                ← Admin dashboard
│   ├── dashboard.jsx      ← Writes to Supabase
│   ├── tools-manager.jsx
│   └── ...
└── design-system/         ← Shared by both
    ├── styles/
    ├── components/
    └── ...
```

## Environment Variables

### Website (.env)
```
VITE_CMS_API_URL=https://your-project.supabase.co
VITE_CMS_ANON_KEY=your-anon-key
```

### Admin Dashboard (.env)
```
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_KEY=your-admin-key
```

## Current Status

- ✅ Design system in place
- ✅ CMS documentation ready
- ⏳ Admin dashboard code (awaiting integration phase)
- ⏳ Website integration (awaiting integration phase)
- ⏳ Supabase setup (awaiting integration phase)

## Next: Integration Phase

When ready, follow `WIRING_GUIDE.md` to:
1. Set up Supabase
2. Connect admin to Supabase
3. Connect website to Supabase
4. Test end-to-end

---

**Questions?** Check `WIRING_GUIDE.md` for step-by-step instructions.
