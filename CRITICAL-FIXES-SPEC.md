# Critical Fixes — Technical Spec
**For Phase 2 Milestone 1 (Aug 16–25)**

These three fixes unblock everything else. They're blocking the platform from being usable by real clients.

---

## Fix 1: Primary Vercel URL Routing → Admin Login

**Current state:**
- `https://da-webwssite-build-workflows.vercel.app` (or `cms.digitalallies.net`) shows a mock homepage
- Visitors see generic "My Business" / "Welcome" content
- Confusing: Is this the admin? A client site? A marketing page?

**Target state:**
- Primary URL (`cms.digitalallies.net` or the Vercel URL) redirects to `/admin/login`
- Non-authenticated visitors see only the login form
- After login, users land on their `/admin/dashboard` (scoped to their client_id)

**Implementation:**

### Option A: Middleware redirect (Recommended)
**File:** `tools/build-workflows/src/middleware.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Root path: redirect to admin login
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // If trying to access (site) group routes while logged out, also redirect to login
  // (admin group is already protected)
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match root
    '/((?!_next|api|public).*)',
  ],
};
```

### Option B: Root route handler
**File:** `tools/build-workflows/src/app/page.tsx`

```typescript
import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/admin/login');
}
```

**Why Option A is better:** Middleware catches the redirect before rendering, saves resources, cleaner UX.

**Testing checklist:**
- [ ] Visit `https://cms.digitalallies.net` → redirects to `/admin/login`
- [ ] Visit `https://da-webwssite-build-workflows.vercel.app` → redirects to `/admin/login`
- [ ] Logged-in user visits `/` → still redirects (or lands on dashboard — confirm desired behavior)
- [ ] Vercel deploy preview works the same way

**Acceptance criteria:**
- Root URL shows login form only
- No mock homepage visible
- Login works and lands on correct dashboard

---

## Fix 2: Per-Client Metadata & Browser Branding

**Current state:**
- `<title>Digital Allies CMS</title>` hardcoded (same for all clients)
- `<meta name="og:title">` = "Digital Allies"
- Browser tab always shows "Digital Allies" regardless of who's logged in
- Confusing when client bookmarks the admin

**Target state:**
- Browser tab title = Client's business name (e.g., "Atomic Finds ATX CMS")
- `<meta name="og:title">` = Client name
- `<meta name="og:description">` = Client tagline
- Favicon stays the same (DA logo acceptable as platform branding)
- Admin shell colors/logo change to match client brand

**Implementation:**

### 1. Fetch client data server-side (already exists, but need to use it)

**File:** `tools/build-workflows/src/app/(admin)/layout.tsx`

Current state: Probably pulls `NEXT_PUBLIC_CLIENT_ID` from env var, queries Supabase for settings.

```typescript
import { getClientSettings } from '@/lib/data'; // Already exists
import { Metadata } from 'next';

type LayoutProps = {
  children: React.ReactNode;
};

// Dynamic metadata generation
export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await getClientSettings();
    
    return {
      title: `${settings?.site_name || 'Digital Allies'} Admin`,
      description: `${settings?.site_tagline || 'CMS Admin'}`,
      openGraph: {
        title: `${settings?.site_name || 'Digital Allies'}`,
        description: settings?.site_tagline || 'CMS Admin',
      },
    };
  } catch (error) {
    return {
      title: 'Digital Allies CMS',
      description: 'CMS Admin',
    };
  }
}

export default function AdminLayout({ children }: LayoutProps) {
  // Component renders shell (already does this)
  return (
    <>
      {/* children */}
    </>
  );
}
```

### 2. Update admin shell to use client branding

**File:** `tools/build-workflows/src/components/AdminShell.tsx` (or wherever the nav/header lives)

```typescript
import { getClientSettings } from '@/lib/data';

export async function AdminShell() {
  const settings = await getClientSettings();
  
  const businessName = settings?.site_name || 'Digital Allies';
  const logoUrl = settings?.logo_url; // If stored in settings
  const primaryColor = settings?.primary_color || '#1a1a1a'; // charcoal fallback

  return (
    <nav style={{ borderBottomColor: primaryColor }}>
      {logoUrl && <img src={logoUrl} alt={businessName} />}
      <h1>{businessName}</h1>
      {/* rest of nav */}
    </nav>
  );
}
```

### 3. Ensure settings table has required fields

**Current schema check:**
Run this in Supabase SQL Editor to verify fields exist:

```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'settings';
```

**Required fields (add if missing):**
- `site_name` (VARCHAR) — e.g., "Atomic Finds ATX"
- `site_tagline` (VARCHAR) — e.g., "Curated home furnishings"
- `logo_url` (VARCHAR, nullable) — path to client's logo
- `primary_color` (VARCHAR, nullable) — hex code

**Seed for Atomic Finds (when setting up):**
```sql
INSERT INTO settings (client_id, site_name, site_tagline, primary_color)
VALUES (
  '443936d5-f92e-480b-b206-c65cfb52bdfc',  -- AF client ID
  'Atomic Finds ATX',
  'Curated home furnishings for modern living',
  '#C89B3C'  -- warm gold from AF brand
)
ON CONFLICT(client_id) DO UPDATE SET
  site_name = EXCLUDED.site_name,
  site_tagline = EXCLUDED.site_tagline,
  primary_color = EXCLUDED.primary_color;
```

**Testing checklist:**
- [ ] Login as Atomic Finds → browser tab shows "Atomic Finds ATX Admin"
- [ ] Browser bookmark shows "Atomic Finds ATX Admin" (not "Digital Allies")
- [ ] Admin shell colors/logo match AF brand
- [ ] Inspect page source → `<meta name="og:title">` = "Atomic Finds ATX"
- [ ] Switch to another client → metadata changes
- [ ] Favicon stays DA logo (consistent platform branding)

**Acceptance criteria:**
- Client sees their own business name in all places
- No confusion with other clients or Digital Allies branding
- Settings module controls all of this (no hardcoding)

---

## Fix 3: Verify CMS-to-Site Sync Latency

**Current state:**
- Unclear if changes are live immediately or delayed
- Some modules sync (Products), some don't (Collections, Blog)
- Clients have no way to know if their edit "stuck"

**Target state:**
- Publish in admin → live site updated within 30 seconds (or match ISR revalidate time)
- Visual feedback (toast) when publish succeeds
- Clear indication of what's live vs. draft

**Implementation:**

### 1. Add on-publish callback in admin modules

**Pattern (example for Pages module):**

```typescript
async function savePage(page: PageData) {
  try {
    // Call store function
    const result = await storePage(page);
    
    // Show success toast
    toast.success('Page published! Check the live site in 30 seconds.');
    
    // Optionally: trigger revalidation on frontend
    if (page.status === 'published') {
      await fetch('/api/revalidate', {
        method: 'POST',
        body: JSON.stringify({ 
          slug: page.slug,
          type: 'page'
        }),
      });
    }
    
    return result;
  } catch (error) {
    toast.error(`Failed to save: ${error.message}`);
  }
}
```

### 2. Create revalidation endpoint (optional but recommended for instant updates)

**File:** `tools/build-workflows/src/app/api/revalidate/route.ts`

```typescript
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Verify this is coming from your own domain (security)
  const origin = request.headers.get('origin');
  if (origin !== process.env.NEXT_PUBLIC_SITE_URL) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { slug, type } = await request.json();
  
  try {
    if (type === 'page') {
      revalidatePath(`/pages/${slug}`);
      revalidatePath('/');  // Also revalidate homepage if needed
    } else if (type === 'article') {
      revalidatePath(`/blog/${slug}`);
      revalidatePath('/blog');
    }
    
    return NextResponse.json({ revalidated: true });
  } catch (error) {
    return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 });
  }
}
```

### 3. Document what syncs and what doesn't

**Create:** `tools/build-workflows/SYNC-REFERENCE.md`

```markdown
# CMS-to-Site Sync Reference

| Module | Syncs To | Latency | Status |
|--------|----------|---------|--------|
| Showroom (Products) | Live product grid | Real-time | ✅ Works |
| Pages | `/pages/[slug]` | 30s (ISR) | ✅ Works |
| Collections | Product filters | 30s (ISR) | ✅ Should work |
| Press Office (Blog) | `/blog/[slug]` | 30s (ISR) | 🚧 In progress |
| Settings | Metadata, business info | Real-time | ✅ Works |
| Brand Theme | Live site colors | Real-time (via CSS vars) | ✅ Works |

**What "Real-time" means:** Changes appear instantly because they're fetched server-side per request (no ISR revalidation needed).

**What "30s" means:** Changes appear after Next.js ISR revalidates the cached page. Can be instant via API revalidation endpoint.
```

**Testing checklist:**
- [ ] Publish a product in Showroom → see it live immediately
- [ ] Create a new page → see it appear on site after 30s (or instant with revalidation endpoint)
- [ ] Change admin to draft → verify page disappears from live site
- [ ] Edit article → see changes on blog after 30s
- [ ] Toast notification appears on save (success/error)

**Acceptance criteria:**
- All changes sync within 30 seconds
- User gets visual feedback when publish completes
- Client manual is clear about sync timing
- Atomic Finds launch proves this works

---

## Rollout Plan

**Week of Aug 16–20:**
- [ ] Fix 1: Implement middleware redirect to `/admin/login`
- [ ] Fix 2: Set up dynamic metadata + admin shell branding
- [ ] Fix 3: Document sync behavior + add revalidation endpoint

**Week of Aug 21–25:**
- [ ] Deploy to `cms.digitalallies.net` (primary URL now shows login, not mock)
- [ ] Test with real client (Atomic Finds) login
- [ ] Verify metadata changes per client

**Testing before Atomic Finds launch (by Sep 1):**
- [ ] All three fixes verified working
- [ ] Admin UX feels cohesive (client sees their brand, not DA brand)
- [ ] CMS publishes show up on live site reliably

---

## Success Metrics

- ✅ Primary URL redirects to login (not mock homepage)
- ✅ Client sees their business name in browser tab
- ✅ Admin shell shows client brand colors/logo
- ✅ Publish → live within 30 seconds
- ✅ Atomic Finds can manage their site with confidence

These three fixes are the foundation for everything else in Phase 2.
