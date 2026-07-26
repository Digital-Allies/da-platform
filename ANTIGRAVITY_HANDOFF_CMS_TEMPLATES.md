# Antigravity Handoff: CMS Admin Templates Implementation

**Prepared by:** Claude Code  
**Date:** 2026-07-26  
**Status:** Ready for implementation  
**Budget Context:** Claude Code credits depleted; Antigravity to continue with full build

---

## What Just Happened

Two high-fidelity admin dashboard templates were designed and documented:

1. **Pages Editor** — Admin interface for creating/editing website pages with a block-based layout system
2. **Collections Manager** — Admin interface for organizing product/content collections

Both are `.dc.html` design components (prototypes) stored in `/packages/20260722-da-design-system/templates/`. These are **reference designs**, not production code — your job is to implement them as real Next.js components in `tools/build-workflows/`.

---

## Critical Context (Read First)

### Project Architecture
- **One platform, three faces:** Admin dashboard (shared DA-branded UI), Brand tokens (per-client), Website (per-client themed)
- **Repo:** `Digital-Allies/da-platform` (monorepo) — single source of truth
- **Real CMS engine:** `tools/build-workflows/` (Next.js 15 + Supabase + Server Actions)
- **Design system:** `packages/20260722-da-design-system/` (snapshot folder) + Claude Design project
- **Client isolation:** `client_id` + Supabase RLS per row
- **Deployment:** One Vercel project per client (`NEXT_PUBLIC_CLIENT_ID` env var per deployment)

### Key Docs (Read These)
1. **`STATUS.md`** (this repo root) — shared running status for all agents; read before every session, update after large steps
2. **`CLAUDE.md`** (this repo root) — project instructions, workspace conventions
3. **`ARCHITECTURE.md`** (`tools/build-workflows/`) — full system design, multi-tenancy model, route structure
4. **`BUILD-SCHEDULE.md`** (this repo root) — priority order for work (Pages before Collections)
5. **`PAGE_EDITOR_SPEC.md`** (`packages/20260722-da-design-system/`) — Next.js implementation guide for Pages (already written; follow this pattern for Collections)
6. **`CMS_ADMIN_TEMPLATES.md`** (`packages/20260722-da-design-system/templates/`) — full reference for both templates, data models, integration checklist

### Current Live State
- ✅ 7 CMS modules live (Dashboard, Pages, Press Office, Projects, Research, Workshop, Settings)
- ✅ Atomic Finds site deployed with real product data + reviews
- ✅ Pages module exists but **uses placeholder preview** (hand-rolled HTML string, not real components)
- ⏳ Collections module doesn't exist yet
- 🔲 Pages editor needs real `BlockRenderer` + live preview component
- 🔲 Collections editor needs full CRUD + sorting

---

## Your Task: Phase 1 (Pages Editor Implementation)

Build the Pages admin interface so clients can actually create/edit pages with real components.

### 1. Database Schema (Supabase SQL)

**Check current state:**
```bash
# In repo: look for migrations related to pages/blocks
find tools/build-workflows/supabase/migrations -name "*pages*" -o -name "*blocks*"
```

**If migrations don't exist, create them:**

```sql
-- pages table (may already exist)
create table public.pages (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients(id) on delete cascade,
  title text not null,
  slug text not null,
  meta_description text,
  blocks jsonb not null default '[]'::jsonb,
  status text check (status in ('draft', 'published')) default 'draft',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique (client_id, slug)
);

-- RLS: clients can only see/edit their own pages
alter table public.pages enable row level security;
create policy "clients_pages_select" on public.pages for select using (
  client_id = (select client_id from public.authenticated_user_client())
);
create policy "clients_pages_insert" on public.pages for insert with check (
  client_id = (select client_id from public.authenticated_user_client())
);
create policy "clients_pages_update" on public.pages for update using (
  client_id = (select client_id from public.authenticated_user_client())
) with check (
  client_id = (select client_id from public.authenticated_user_client())
);
create policy "clients_pages_delete" on public.pages for delete using (
  client_id = (select client_id from public.authenticated_user_client())
);
```

**Why JSONB blocks?** Easier than a separate `blocks` table + no N+1 queries. Schema:
```typescript
interface Block {
  id: string; // nanoid or uuid
  type: 'hero' | 'products' | 'testimonials' | 'contact_form' | 'richtext' | 'cta';
  content: Record<string, any>; // block-type-specific data
  order: number; // 0, 1, 2, ...
}
```

### 2. Data Layer Functions (`src/lib/data.ts`)

Add these (or update if they exist):

```typescript
// Fetch a single page
export async function getPage(clientId: string, slug: string) {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .eq('client_id', clientId)
    .eq('slug', slug)
    .single();
  if (error) throw error;
  return data;
}

// List all pages for a client
export async function listPages(clientId: string) {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('pages')
    .select('id, title, slug, status, updated_at')
    .eq('client_id', clientId)
    .order('updated_at', { ascending: false });
  if (error) throw error;
  return data;
}

// Update a page (upsert blocks + metadata)
export async function updatePage(clientId: string, pageId: string, updates: {
  title?: string;
  slug?: string;
  meta_description?: string;
  blocks?: Block[];
  status?: 'draft' | 'published';
}) {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from('pages')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', pageId)
    .eq('client_id', clientId)
    .select();
  if (error) throw error;
  return data;
}
```

### 3. UI Components (React)

**Location:** `tools/build-workflows/src/app/admin/(protected)/pages/`

#### 3a. Page List (`page.tsx`)
- Fetch pages via `listPages(clientId)`
- Display table/grid with title, slug, status, last edited
- "New Page" button → redirect to `/admin/pages/new`
- Click row → `/admin/pages/[id]`

#### 3b. Page Editor (`[id]/page.tsx`)
Main component combining:
- **Left Sidebar** (from template): page metadata form, block list with drag-drop
- **Right Preview** (from template): live desktop/mobile viewport

**Key Sub-components:**

```typescript
// PagesClient.tsx (client component, handles all interactivity)
'use client';

import { useState } from 'react';
import { useDragDrop } from '@dnd-kit/core'; // or react-beautiful-dnd
import PageMetadataForm from './PageMetadataForm';
import BlockList from './BlockList';
import PagePreview from './PagePreview';
import { updatePage } from '@/lib/actions/pages'; // Server action

export default function PagesClient({ page: initialPage, clientId }) {
  const [page, setPage] = useState(initialPage);
  const [saving, setSaving] = useState(false);

  const handleBlocksReorder = (newBlocks) => {
    setPage({ ...page, blocks: newBlocks });
  };

  const handleBlockAdd = (type) => {
    const newBlock = {
      id: nanoid(),
      type,
      content: {},
      order: page.blocks.length,
    };
    setPage({ ...page, blocks: [...page.blocks, newBlock] });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updatePage(clientId, page.id, page);
      // Success toast
    } catch (error) {
      // Error toast
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="cms-page-editor">
      <div className="editor-sidebar">
        <PageMetadataForm page={page} onChange={setPage} />
        <BlockList
          blocks={page.blocks}
          onReorder={handleBlocksReorder}
          onAdd={handleBlockAdd}
          onDelete={(blockId) => setPage({
            ...page,
            blocks: page.blocks.filter(b => b.id !== blockId)
          })}
        />
        <div className="editor-actions">
          <button onClick={() => {}} className="btn-secondary">Cancel</button>
          <button onClick={handleSave} disabled={saving} className="btn-primary">
            {saving ? 'Saving...' : 'Publish'}
          </button>
        </div>
      </div>

      <div className="editor-preview">
        <PagePreview blocks={page.blocks} />
      </div>
    </div>
  );
}
```

#### 3c. Block List Component (`BlockList.tsx`)
- Render each block in `page.blocks` as a draggable item
- Each item shows: type, title (from content), reorder/edit/duplicate/delete buttons
- Drag-drop library: **dnd-kit** (recommended; simpler than react-beautiful-dnd)

#### 3d. Page Preview Component (`PagePreview.tsx`)
- Render blocks using the **same `BlockRenderer`** component the public site uses
- Props: `blocks`, `viewportMode` ('desktop' | 'mobile')
- This ensures admin preview = live site output (no surprises)

#### 3e. Block Type Forms (e.g., `blocks/HeroBlockForm.tsx`)
- One component per block type (HeroBlockForm, ProductsBlockForm, etc.)
- Maps to block `type` + `content`
- Example:

```typescript
export default function HeroBlockForm({ block, onChange }) {
  return (
    <>
      <input
        type="text"
        placeholder="Heading"
        value={block.content.heading || ''}
        onChange={(e) => onChange({
          ...block,
          content: { ...block.content, heading: e.target.value }
        })}
      />
      <textarea
        placeholder="Subheading"
        value={block.content.subheading || ''}
        onChange={(e) => onChange({
          ...block,
          content: { ...block.content, subheading: e.target.value }
        })}
      />
      {/* ... more fields */}
    </>
  );
}
```

### 4. Styling

- Copy the CSS from the template (`CmsPages.dc.html`)
- Apply to Next.js components (either Tailwind classes OR scoped CSS modules)
- Use CSS variables for tokens (`--primary`, `--text-primary`, etc. already imported in `globals.css`)
- Ensure dark mode works (CMS admin should support it per design system audit)

### 5. Testing Checklist

- [ ] Create a new page, add blocks, drag-reorder them
- [ ] Live preview updates as you edit
- [ ] Save works (check Supabase via SQL editor)
- [ ] Publish button changes page status to 'published'
- [ ] Load an existing page — all data preserved
- [ ] Delete a block, save — block gone from Supabase
- [ ] Duplicate a block — new block created with same content, different ID
- [ ] Mobile viewport preview works (shrink browser / use DevTools)
- [ ] RLS enforced: log in as User A, load their pages; log in as User B, see only their pages

---

## Phase 2: Collections Manager (After Pages Ships)

Once Pages is live and tested, follow the exact same pattern for Collections:

1. **Supabase Schema:** `collections` + `collection_items` (junction table)
2. **Data Layer:** `listCollections()`, `getCollection()`, `updateCollection()`
3. **UI:** Collection list, collection editor (metadata + items grid), add/reorder items
4. **Preview:** (Optional) Grid preview of collection items
5. **Spec:** Write `COLLECTIONS_SPEC.md` following `PAGE_EDITOR_SPEC.md` structure

---

## File Structure

After implementation, your repo structure should look like:

```
tools/build-workflows/
├── src/
│   ├── app/
│   │   └── admin/
│   │       └── (protected)/
│   │           ├── pages/
│   │           │   ├── layout.tsx
│   │           │   ├── page.tsx (list)
│   │           │   ├── [id]/
│   │           │   │   ├── layout.tsx
│   │           │   │   └── page.tsx (editor)
│   │           │   ├── components/
│   │           │   │   ├── PagesClient.tsx
│   │           │   │   ├── PageMetadataForm.tsx
│   │           │   │   ├── BlockList.tsx
│   │           │   │   ├── PagePreview.tsx
│   │           │   │   └── blocks/
│   │           │   │       ├── HeroBlockForm.tsx
│   │           │   │       ├── ProductsBlockForm.tsx
│   │           │   │       ├── TestimonialsBlockForm.tsx
│   │           │   │       ├── ContactFormBlockForm.tsx
│   │           │   │       └── RichtextBlockForm.tsx
│   │           │   └── page.module.css (or use Tailwind)
│   │           └── collections/
│   │               └── (similar structure)
│   └── lib/
│       ├── actions/
│       │   ├── pages.ts (updatePage, createPage, deletePage)
│       │   └── collections.ts (updateCollection, etc.)
│       └── data.ts (getPage, listPages, getCollection, etc.)
└── supabase/
    └── migrations/
        ├── 20260726000000_pages_blocks.sql
        └── 20260726000001_collections_items.sql
```

---

## Integration with Live CMS

### Admin Routes
- `/admin/pages` — page list
- `/admin/pages/new` — create new page
- `/admin/pages/[id]` — edit page
- `/admin/collections` — collection list (phase 2)
- `/admin/collections/[id]` — edit collection (phase 2)

### Navigation
- Link in `AdminNav.tsx` if not already there
- Reuse existing admin layout + theme

### Multi-Tenant Routing
- Extract `clientId` from authenticated user (see `src/lib/auth-helpers.ts`)
- All data queries filtered by `clientId`
- Vercel env var `NEXT_PUBLIC_CLIENT_ID` used to seed initial filter (for single-deployment-per-client model)

---

## Known Issues & Decisions

### Open Decisions (Ask Anthony Before Deciding)
1. **Subscription Gating:** Should code editor be Pro/Agency only, or always available?
2. **Drag-Drop Library:** Recommend dnd-kit (smaller bundle). Acceptable alternatives: react-beautiful-dnd, @hello-pangea/dnd
3. **Template Picker:** Should new pages offer pre-built templates (Blank / Home / Blog / Case Study / Service Detail)?
4. **Rich Text Editing:** For Richtext blocks, use Tiptap (recommended, same as Press Office) or something lighter?

### Known Gaps
- Collections Manager not yet designed (phase 2 — use same pattern as Pages)
- Multi-tenant preview switcher (shown in design) is NOT needed in real build (admin is single-tenant per deployment)
- Subscription gating (Starter/Pro/Agency) scoped but not yet implemented anywhere; gate on `clients.plan` when adding code editor

### Technical Debt (Low Priority)
- No E2E tests for the admin pages yet (can add later)
- No undo/redo history (nice-to-have for future)
- Optimistic updates on publish (could speed up UX)

---

## Quick Start Commands

```bash
# Install dependencies (already done, but for reference)
cd tools/build-workflows
npm install dnd-kit @dnd-kit/utilities @dnd-kit/sortable

# Run dev server
npm run dev  # http://localhost:3000

# Type-check
npx tsc --noEmit

# Run tests (if any)
npm test

# Deploy to Vercel (after PR merge)
# (Vercel auto-deploys on git push to main)
```

---

## Success Criteria

When Pages editor is ready for Anthony to test:

✅ Page list loads all pages for authenticated client  
✅ Can create new page (title, slug auto-generated)  
✅ Can add/remove/reorder blocks via UI  
✅ Live preview updates as user edits  
✅ Save button persists all changes to Supabase  
✅ Publish button sets page status to 'published'  
✅ Switching viewports (desktop/mobile) works  
✅ Page reload preserves all unsaved changes (optimistic update)  
✅ Type-checking passes (`npx tsc --noEmit`)  
✅ No console errors in browser DevTools  
✅ RLS policies enforced (User A can't see User B's pages)  

---

## Where to Ask Questions

1. **Architecture/multi-tenant routing** → Read `ARCHITECTURE.md`
2. **Database schema/Supabase** → Read `SETUP.md` or `tools/build-workflows/supabase/README.md`
3. **Design tokens/styling** → See `packages/design-system/colors_and_type.css`
4. **Live implementation reference** → Check existing `/admin/products` (Showroom) for pattern
5. **Project decisions** → Check `STATUS.md` decisions section or ask Anthony

---

## Next Steps (In Order)

1. **Read** `ARCHITECTURE.md` + `PAGE_EDITOR_SPEC.md` (30 min)
2. **Create** Supabase migrations if they don't exist (15 min)
3. **Build** data layer functions in `src/lib/` (30 min)
4. **Build** React components for page list + editor (3-4 hours)
5. **Style** using template CSS + design tokens (1 hour)
6. **Test** manually in browser + Supabase (1 hour)
7. **Deploy** to Vercel, test live (30 min)
8. **Update** STATUS.md with completion notes + any discoveries
9. **Prepare** for Collections (phase 2) — write COLLECTIONS_SPEC.md first

---

## Budget Note

You have full Antigravity allocation for this work. Don't rush quality for speed. Testing thoroughly on Pages before starting Collections is **more important** than shipping both fast. Anthony trusts the setup — deliver a solid, well-tested Pages editor and the Collections build will follow the same proven pattern.

Good luck! 🚀
