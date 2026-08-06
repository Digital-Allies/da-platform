# Onboarding Integration Implementation Plan

## Overview

Integrate the client onboarding checklist as a **native project template** in the CMS admin dashboard. When a new client is created, they see a pre-populated "Website Launch Checklist" project in The Workshop (Projects tab) that automatically fills with all setup tasks, progress tracking, and estimated timelines.

---

## Goals

1. **Visibility**: Clients see their build progress without needing a separate document
2. **Accountability**: Anthony can track what's done, what's in progress, what's blocked
3. **Self-Service**: Clients know what to expect and when they're ready to launch
4. **Scalability**: The template auto-populates based on client-specific data (name, slug, URLs, etc.)

---

## Architecture

### Current System (Reference)

The `ProjectsClient.tsx` component already has a template system:

```typescript
// Lines 104-125: Template selection
if (projectForm.template === 'software') {
  templateTasks = [
    { title: 'Requirements Gathering', ... },
    { title: 'Frontend UI Implementation', ... },
    ...
  ];
}
```

Three templates exist: `software`, `marketing`, `seo`.

We'll add a fourth: `website-launch`.

### New Template Structure

**Template Name:** `website-launch`

**Sections (Phases):**
1. **Phase 1: Technical Foundation** (8 tasks) — Supabase, Vercel, Domain setup
2. **Phase 2: Content & Brand** (6 tasks) — Logo, colors, hero copy, business info
3. **Phase 3: Required Pages** (8 tasks) — Terms, Privacy, Cookies, Accessibility, AI Disclosure, Sitemap, etc.
4. **Phase 4: SEO & AEO** (5 tasks) — Meta tags, structured data, JSON-LD, sitemap.xml
5. **Phase 5: Performance & Accessibility** (6 tasks) — Mobile testing, contrast ratios, page speed, WCAG audit
6. **Phase 6: Admin Setup** (5 tasks) — Client testing, password reset, editing capabilities, publishing

**Total: 38 tasks**

---

## Implementation Steps

### Step 1: Update ProjectsClient.tsx (Add Template)

**File:** `/Users/cuus/Claude/projects/da-platform/tools/build-workflows/src/app/admin/(protected)/projects/ProjectsClient.tsx`

**Location:** Lines 104-125 (inside `handleCreateProject` function)

**Changes:**
```typescript
} else if (projectForm.template === 'website-launch') {
  templateTasks = [
    // PHASE 1: Technical Foundation
    {
      title: 'Create Supabase clients row',
      description: 'Insert row into public.clients table with client_id UUID',
      priority: 'high',
      status: 'todo'
    },
    {
      title: 'Seed Supabase settings table',
      description: 'Run seed-<client-slug>-settings.sql to populate business info',
      priority: 'high',
      status: 'todo'
    },
    {
      title: 'Seed design tokens',
      description: 'Run seed-<client-slug>-design-tokens.sql with brand colors & fonts',
      priority: 'high',
      status: 'todo'
    },
    {
      title: 'Create Vercel project',
      description: 'Create new Vercel project, set root to tools/build-workflows, connect GitHub',
      priority: 'high',
      status: 'todo'
    },
    {
      title: 'Set Vercel env vars',
      description: 'Configure all required env vars (NEXT_PUBLIC_CLIENT_ID, Supabase keys, etc.)',
      priority: 'high',
      status: 'todo'
    },
    {
      title: 'Add custom domain in Vercel',
      description: 'Configure domain nameservers and SSL',
      priority: 'high',
      status: 'todo'
    },
    {
      title: 'Update Supabase Auth URL config',
      description: 'Add new domain to Auth > URL Configuration',
      priority: 'high',
      status: 'todo'
    },
    {
      title: 'Verify production deploy is green',
      description: 'Check Vercel deployment status - no errors',
      priority: 'high',
      status: 'todo'
    },
    
    // PHASE 2: Content & Brand
    {
      title: 'Verify site title shows correctly',
      description: 'Not "My Business" - actual business name from settings',
      priority: 'high',
      status: 'todo'
    },
    {
      title: 'Upload logo',
      description: 'Add business logo to settings',
      priority: 'high',
      status: 'todo'
    },
    {
      title: 'Set favicon',
      description: 'Configure site favicon in settings',
      priority: 'medium',
      status: 'todo'
    },
    {
      title: 'Enter hero headline & copy',
      description: 'Fill in homepage headline and tagline',
      priority: 'high',
      status: 'todo'
    },
    {
      title: 'Write about page content',
      description: 'Add business story and values',
      priority: 'high',
      status: 'todo'
    },
    {
      title: 'Enter contact info',
      description: 'Add phone, email, address, business hours',
      priority: 'high',
      status: 'todo'
    },
    {
      title: 'Add social media links',
      description: 'Link Instagram, Facebook, Twitter, etc.',
      priority: 'medium',
      status: 'todo'
    },
    {
      title: 'Publish at least 1 product/service',
      description: 'Add and publish sample content to homepage',
      priority: 'high',
      status: 'todo'
    },

    // PHASE 3: Required Pages
    {
      title: 'Create /terms page',
      description: 'Terms of Service page with legal language',
      priority: 'high',
      status: 'todo'
    },
    {
      title: 'Create /privacy page',
      description: 'Privacy Policy page',
      priority: 'high',
      status: 'todo'
    },
    {
      title: 'Create /cookies page',
      description: 'Cookie Policy page',
      priority: 'high',
      status: 'todo'
    },
    {
      title: 'Create /accessibility page',
      description: 'Accessibility Statement page',
      priority: 'high',
      status: 'todo'
    },
    {
      title: 'Create /use-of-ai page',
      description: 'AI Disclosure & Usage page',
      priority: 'high',
      status: 'todo'
    },
    {
      title: 'Create sitemap page',
      description: '/sitemap page listing all pages',
      priority: 'medium',
      status: 'todo'
    },
    {
      title: 'Verify sitemap.xml exists',
      description: 'GET /sitemap.xml returns valid XML',
      priority: 'high',
      status: 'todo'
    },
    {
      title: 'Verify 404 page renders',
      description: 'Visit non-existent URL - confirm 404 page',
      priority: 'medium',
      status: 'todo'
    },

    // PHASE 4: SEO & AEO
    {
      title: 'Verify <title> tag',
      description: 'Homepage title shows business name, not "My Business"',
      priority: 'high',
      status: 'todo'
    },
    {
      title: 'Add meta descriptions',
      description: 'Set homepage and key page meta descriptions',
      priority: 'high',
      status: 'todo'
    },
    {
      title: 'Verify Open Graph tags',
      description: 'Test social share preview (og:image, og:title, etc.)',
      priority: 'medium',
      status: 'todo'
    },
    {
      title: 'Check JSON-LD schema',
      description: 'Verify LocalBusiness schema on homepage',
      priority: 'high',
      status: 'todo'
    },
    {
      title: 'Verify robots.txt & sitemap.xml',
      description: 'Both files exist and are correct',
      priority: 'high',
      status: 'todo'
    },

    // PHASE 5: Performance & Accessibility
    {
      title: 'Test mobile layout (375px)',
      description: 'Verify responsive design at smallest breakpoint',
      priority: 'high',
      status: 'todo'
    },
    {
      title: 'Test tablet layout (768px)',
      description: 'Verify responsive design at tablet breakpoint',
      priority: 'high',
      status: 'todo'
    },
    {
      title: 'Verify no console errors',
      description: 'Check browser console - zero errors on page load',
      priority: 'high',
      status: 'todo'
    },
    {
      title: 'Check all image alt text',
      description: 'Every image has descriptive alt text',
      priority: 'high',
      status: 'todo'
    },
    {
      title: 'Test contact form submission',
      description: 'Submit test email - verify delivery',
      priority: 'high',
      status: 'todo'
    },
    {
      title: 'Run Lighthouse audit',
      description: 'Performance ≥80, Accessibility ≥90, check WCAG violations',
      priority: 'high',
      status: 'todo'
    },

    // PHASE 6: Admin Setup & Handoff
    {
      title: 'Client can log in to CMS',
      description: 'Test login with client email - can access dashboard',
      priority: 'high',
      status: 'todo'
    },
    {
      title: 'Dashboard shows client business name',
      description: 'Not "Digital Allies" - actual client name',
      priority: 'high',
      status: 'todo'
    },
    {
      title: 'Client can navigate all tabs',
      description: 'All relevant admin sections are accessible',
      priority: 'medium',
      status: 'todo'
    },
    {
      title: 'Client can edit & publish content',
      description: 'Test editing a product/page and seeing changes live',
      priority: 'high',
      status: 'todo'
    },
    {
      title: 'Password reset flow works',
      description: 'Test magic link login and password reset',
      priority: 'medium',
      status: 'todo'
    },
  ];
}
```

### Step 2: Update Project Template Selection UI

**File:** Same `ProjectsClient.tsx` - locate the template selection form

**Current Code (approx. line 200+):**
```jsx
<select value={projectForm.template} onChange={(e) => setProjectForm({...projectForm, template: e.target.value})}>
  <option value="">No Template</option>
  <option value="software">Software Development</option>
  <option value="marketing">Marketing Campaign</option>
  <option value="seo">SEO Project</option>
</select>
```

**Updated Code:**
```jsx
<select value={projectForm.template} onChange={(e) => setProjectForm({...projectForm, template: e.target.value})}>
  <option value="">No Template</option>
  <option value="website-launch">🚀 Website Launch Checklist (New)</option>
  <option value="software">Software Development</option>
  <option value="marketing">Marketing Campaign</option>
  <option value="seo">SEO Project</option>
</select>
```

### Step 3: Add Auto-Population Feature (Future Enhancement)

**Objective:** When creating a website-launch project, pre-populate task details with client-specific URLs, emails, and information.

**Implementation Strategy:**

1. **Pass client context to template:**
```typescript
// In handleCreateProject, before creating project:
const clientData = {
  name: projectForm.clientName,  // Allow input, default to existing settings
  slug: projectForm.clientSlug,
  url: projectForm.clientUrl,
  email: projectForm.clientEmail
};

// When building templateTasks, use client data:
templateTasks = templateTasks.map(task => ({
  ...task,
  description: task.description
    .replace('{CLIENT_NAME}', clientData.name)
    .replace('{CLIENT_URL}', clientData.url)
    .replace('{CLIENT_EMAIL}', clientData.email)
}));
```

2. **Example task with interpolation:**
```typescript
{
  title: 'Create Vercel project',
  description: `Create new Vercel project for ${clientData.name} (${clientData.url}), set root to tools/build-workflows`,
  priority: 'high',
  status: 'todo'
}
```

3. **UI enhancement:** Add input fields for client details when creating website-launch project:
```jsx
{projectForm.template === 'website-launch' && (
  <>
    <input
      type="text"
      placeholder="Client Name"
      value={projectForm.clientName || ''}
      onChange={(e) => setProjectForm({...projectForm, clientName: e.target.value})}
    />
    <input
      type="text"
      placeholder="Domain URL"
      value={projectForm.clientUrl || ''}
      onChange={(e) => setProjectForm({...projectForm, clientUrl: e.target.value})}
    />
  </>
)}
```

### Step 4: Dashboard Enhancement (Phase 2)

Add a **"Website Launch Progress"** card to the main admin dashboard that shows:
- Total tasks: 38
- Complete: X
- In Progress: Y
- Blocked: Z
- Progress bar (visual)
- Link to full project

---

## Benefits

### For Clients
- **Transparency:** See exactly what's being built and when
- **Self-Education:** Understand each build phase without asking
- **Independence:** Know what settings they can edit before launch

### For Anthony
- **Tracking:** One place to see all client launch progress
- **Accountability:** Client can see exactly what's done
- **Handoff Checklist:** Ensures nothing is missed before launch
- **Scalability:** Automate the setup process for future clients

### For Team Collaboration
- **Shared Visibility:** If another team member joins, they see current progress
- **Clear Ownership:** Drag-drop to move tasks between columns
- **Due Dates:** Set realistic timelines for each phase

---

## Timeline

| Phase | Task | Effort | Owner | Status |
|-------|------|--------|-------|--------|
| 1 | Add template to ProjectsClient.tsx | 30 min | Claude Code | Ready |
| 2 | Update UI dropdown | 15 min | Claude Code | Ready |
| 3 | Test template (manual QA) | 30 min | Anthony | TBD |
| 4 | Auto-population feature | 1-2 hours | Claude Code | Phase 2 |
| 5 | Dashboard progress card | 1-2 hours | Claude Code | Phase 2 |
| 6 | Documentation update | 30 min | Anthony | Phase 2 |

---

## Example Workflow: When Atomic Finds Launches

1. **Anthony creates project:** Clicks "New Project" → "Website Launch Checklist" template
2. **38 tasks auto-populate** with all phases
3. **As build progresses:** Anthony drags tasks across columns (To Do → In Progress → Done)
4. **Jennyfer logs in:** Sees "Website Launch" project with progress tracking
5. **Jennyfer knows:** "Oh, we're in Phase 3. My pages are still being built."
6. **Dashboard shows:** "38 tasks | 12 complete | 8 in progress | 0 blocked"
7. **Launch ready:** When all tasks hit "Done", Anthony knows it's time for handoff

---

## File Locations

| File | Purpose | Status |
|------|---------|--------|
| `/src/app/admin/(protected)/projects/ProjectsClient.tsx` | Main template logic | Needs update |
| `/src/app/admin/(protected)/projects/page.tsx` | Dashboard page | Reference only |
| `/public/onboarding/binder-atomic-finds-interactive.html` | Training doc (separate) | Done ✅ |
| `/public/onboarding/SKILL-EXPANDED.md` | Skill documentation | Done ✅ |

---

## Next Steps

1. **Phase 1 (This week):** Add template to ProjectsClient.tsx → test with Atomic Finds
2. **Phase 2 (Next week):** Auto-population + dashboard card
3. **Phase 3 (Future):** Integrate with onboarding email (link to project dashboard instead of static binder)

---

## Questions for Anthony

1. Should Anthony see ALL tasks by default, or only the current phase?
2. Should completed tasks auto-move when their corresponding work is actually done (e.g., Supabase seeds run)?
3. Should clients see The Workshop projects, or keep it Anthony-only?

