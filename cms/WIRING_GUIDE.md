# CMS Integration Guide — Wiring Your Website to the Backend

This guide explains how to connect your public website (digitalallies.net) to the CMS backend (Supabase) and admin dashboard.

## Architecture Overview

```
┌─────────────────────────────────────────┐
│      Public Website                     │
│     (digitalallies.net)                 │
│   - Services page                       │
│   - Tool detail pages                   │
│   - Content fed from CMS                │
└──────────────┬──────────────────────────┘
               │ API calls to Supabase
               │
┌──────────────▼──────────────────────────┐
│      CMS Backend                        │
│      (Supabase)                         │
│   - Tools collection                    │
│   - Services collection                 │
│   - Content calendar                    │
│   - User data                           │
└──────────────┬──────────────────────────┘
               │ Managed by
┌──────────────▼──────────────────────────┐
│      Admin Dashboard                    │
│   (Vercel / da-webwssite-build...)      │
│   - Edit tools                          │
│   - Manage calendar                     │
│   - User permissions                    │
└─────────────────────────────────────────┘
```

## Environment Setup

### 1. Website (.env)
```
VITE_CMS_API_URL=https://your-supabase-project.supabase.co
VITE_CMS_ANON_KEY=your-anon-public-key
```

### 2. Admin Dashboard (.env)
```
REACT_APP_SUPABASE_URL=https://your-supabase-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-public-key
REACT_APP_SUPABASE_SERVICE_KEY=your-service-key-for-admin
```

## Connecting Services Page

When user visits `/services` on the public website:

```javascript
// Fetch tools from Supabase
const fetchTools = async () => {
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .eq('published', true);
  
  return data;
};

// Pass to design system template
<ServicesIndex tools={data} />
```

## Connecting Tool Detail Pages

When user visits `/tools/brand-discovery`:

```javascript
// Fetch single tool
const { data } = await supabase
  .from('tools')
  .select('*')
  .eq('slug', 'brand-discovery')
  .single();

// Pass to design system template
<ToolDetail tool={data} />
```

## Connecting Content Calendar

When admin edits calendar in dashboard:

```javascript
// Update calendar entry
const { error } = await supabase
  .from('content_calendar')
  .update({ status: 'scheduled', scheduled_date: '2026-06-20' })
  .eq('id', entryId);

// Website auto-fetches latest on next page load
```

## Data Flow

1. **Admin edits content** in dashboard
2. **Data saved to Supabase**
3. **Website API calls fetch latest data**
4. **Page re-renders with new content**

## Next Steps (In Order)

- [ ] Set up Supabase project (if not done)
- [ ] Create database tables (tools, services, calendar, users)
- [ ] Set up RLS (Row Level Security) policies
- [ ] Connect admin dashboard to Supabase
- [ ] Connect website to Supabase
- [ ] Test end-to-end (edit in admin → see change on website)
- [ ] Deploy both to production

---

**Ready to wire up?** Follow this guide once you have Supabase credentials.
