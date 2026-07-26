# Atomic Finds — Collections Manager & Page Editor Build Plan

**Last Updated:** 2026-07-26  
**Status:** Phase 1 ready to start  
**Live Verification:** 2026-07-26 (Claude Chrome audit)

---

## Current Live State ✅

### What's Already Working

| Feature | Status | Notes |
|---------|--------|-------|
| Products seeded in Supabase | ✅ LIVE | 10 catalog items (Chairs, Lamps, Shelving) from `seed-atomic-finds-catalog.sql` |
| `/admin/products` (Showroom UI) | ✅ LIVE | Full list view with edit/delete per product; "+ Add product" button |
| Products block on pages | ✅ LIVE | Page editor block "Featured Finds" pulls live data from Supabase |
| Frontend product display | ✅ LIVE | atomicfindsatx.store shows all 10 items with images, prices, stock, seller info, category filters (ALL, CHAIRS, LAMPS, SHELVING) |
| Page builder system | ✅ LIVE | Hero, Richtext, Services, Testimonials, Products, CTA, Contact Form blocks |
| Site settings | ✅ LIVE | Brand colors, logo, hero text, contact info, social links (no design tokens UI yet) |
| User login & auth | ✅ LIVE | atomicfindsatx@gmail.com can log in and edit via cms.digitalallies.net |
| Logo URL wiring | ✅ LIVE | Dynamic logo updates in header based on settings URL |

### What's Missing

| Feature | Status | Impact |
|---------|--------|--------|
| `/admin/collections` route | ❌ MISSING | Cannot group products into curated collections; raw category tags only |
| `/admin/reviews` route | ❌ MISSING | Reviews only editable via page blocks; no dedicated management UI |
| Design tokens manager | ❌ MISSING | No centralized color palette, typography, spacing editor in settings |
| Block config options | ⚠️ LIMITED | Products block lacks featured-only toggle, item limit, sorting controls |

---

## Phase 1: Collections Manager (`/admin/collections`)

**Goal:** Let AF create, edit, and curate product collections (e.g., "Living Room Essentials", "Bedroom Collection", "Lamps & Lighting") with reordering, featured flags, and product assignment.

**Timeline:** 3–4 days (1 full build session)

### Requirements

#### Database Schema (Supabase)

```sql
-- New table: collections
CREATE TABLE collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL,
  description TEXT,
  image_url VARCHAR(2048),
  display_order INT DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  status VARCHAR(50) DEFAULT 'draft', -- 'draft' | 'published'
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(site_id, slug)
);

-- Junction table: products to collections (many-to-many)
CREATE TABLE collection_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  collection_id UUID NOT NULL REFERENCES collections(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(collection_id, product_id)
);

-- Indices for performance
CREATE INDEX idx_collections_site_id ON collections(site_id);
CREATE INDEX idx_collection_products_collection_id ON collection_products(collection_id);
CREATE INDEX idx_collection_products_product_id ON collection_products(product_id);
```

#### UI Components Needed

**1. Collections List View** (`/admin/collections`)
- Header: "Collections" + "+ New collection" button
- Table columns:
  - Collection name (clickable → edit)
  - Slug
  - Product count
  - Featured flag (toggle)
  - Status (Draft / Published)
  - Display order (reorder arrows)
  - Actions (edit, delete)
- Sorting: by display_order (drag-to-reorder)
- Empty state: "No collections yet"

**2. Collection Editor** (`/admin/collections/[id]`)
- Form fields:
  - Name (text input, required)
  - Slug (auto-generated from name, editable)
  - Description (textarea, optional)
  - Collection image (image upload or URL)
  - Featured (checkbox)
  - Status (radio: Draft / Published)
- Products assignment section:
  - Search/filter available products
  - Add products to collection (drag-and-drop or button add)
  - Reorder products within collection (drag-to-reorder)
  - Remove products from collection
- Save button (POST/PATCH to `/api/collections/[id]`)
- Delete button (with confirmation modal)

**3. New Collection Modal** (`/admin/collections/new`)
- Quick-entry form: Name, Slug, Description
- "Create" button → redirects to editor page
- "Cancel" button

#### API Endpoints Needed

```
POST   /api/collections              — Create new collection
GET    /api/collections              — List all collections for site
GET    /api/collections/[id]         — Get single collection + products
PATCH  /api/collections/[id]         — Update collection metadata
DELETE /api/collections/[id]         — Delete collection

POST   /api/collections/[id]/products      — Add product to collection
DELETE /api/collections/[id]/products/[pid] — Remove product from collection
PATCH  /api/collections/[id]/products/reorder — Reorder products in collection
```

#### Frontend Integration

**New routes:**
- `/collections` — public listing page (displays all published collections + product cards)
- `/collections/[slug]` — collection detail page (featured collection image + products grid + category filters)

**Wiring:**
- Page builder: Add "Collections" block (displays featured collections or all)
- Product card: Add "collections" badge (shows which collection a product belongs to)

### Checklist

- [ ] Create Supabase schema (migrations or SQL Editor)
- [ ] Create API routes (CRUD endpoints for collections + products junction)
- [ ] Build Collections list view UI
- [ ] Build Collection editor form (with product assignment)
- [ ] Add drag-to-reorder for products within collection
- [ ] Wire to Supabase queries
- [ ] Test CRUD operations
- [ ] Create `/collections` and `/collections/[slug]` frontend routes
- [ ] Add Collections block to page editor
- [ ] Test end-to-end (create collection → assign products → display on frontend)

---

## Phase 2: Reviews/Testimonials Admin UI (`/admin/reviews`)

**Goal:** Dedicated interface for managing reviews (currently seeded, only editable via page blocks).

**Timeline:** 2 days

### Requirements

#### Database Schema (if not already modeled)

```sql
-- Reviews table (verify structure in your Supabase)
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  author_name VARCHAR(255) NOT NULL,
  author_email VARCHAR(255),
  rating INT DEFAULT 5, -- 1-5 stars
  title VARCHAR(255),
  body TEXT NOT NULL,
  is_featured BOOLEAN DEFAULT FALSE,
  is_approved BOOLEAN DEFAULT FALSE,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### UI Components Needed

**1. Reviews List View** (`/admin/reviews`)
- Header: "Reviews & Testimonials" + "+ New review" button
- Table columns:
  - Author name
  - Rating (⭐⭐⭐⭐⭐)
  - Review excerpt (first 100 chars)
  - Product linked (if any)
  - Featured flag (toggle)
  - Approved flag (toggle)
  - Display order (reorder arrows)
  - Actions (edit, delete)
- Filters: by approved status, featured flag, rating
- Sorting: by display_order (drag-to-reorder) or date created

**2. Review Editor** (`/admin/reviews/[id]`)
- Form fields:
  - Author name (text input, required)
  - Author email (email input, optional)
  - Rating (star picker, 1–5)
  - Review title (text input, optional)
  - Review body (rich text editor, required)
  - Product link (dropdown to assign review to a product, optional)
  - Featured (checkbox)
  - Approved (checkbox)
  - Display order (number input)
- Save button
- Delete button

**3. New Review Modal** (`/admin/reviews/new`)
- Quick-entry form: Author, Rating, Body
- "Create" button → redirects to editor
- "Cancel" button

#### API Endpoints Needed

```
POST   /api/reviews               — Create new review
GET    /api/reviews               — List all reviews for site
GET    /api/reviews/[id]          — Get single review
PATCH  /api/reviews/[id]          — Update review
DELETE /api/reviews/[id]          — Delete review
PATCH  /api/reviews/[id]/reorder  — Update display_order
```

#### Frontend Integration

**Wiring:**
- Testimonials block: Query reviews where `is_approved = true` and `is_featured = true` (for featured carousel)
- Product detail page: Show reviews for that product (if built)

### Checklist

- [ ] Verify reviews table schema in Supabase
- [ ] Create API routes (CRUD + reorder)
- [ ] Build Reviews list view UI
- [ ] Build Review editor form (with product link)
- [ ] Add featured/approved toggles
- [ ] Wire to Supabase queries
- [ ] Test CRUD operations
- [ ] Test Testimonials block pulls approved + featured reviews
- [ ] Verify frontend display (page blocks show live reviews)

---

## Phase 3: Design Tokens Manager (`/admin/settings` → new "Design Tokens" tab)

**Goal:** Centralized UI for AF to edit brand colors, typography scales, and spacing — without touching code.

**Timeline:** 4–5 days

### Requirements

#### Database Schema

```sql
-- Design tokens table
CREATE TABLE design_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  category VARCHAR(50) NOT NULL, -- 'color' | 'typography' | 'spacing' | 'shadows'
  name VARCHAR(255) NOT NULL,    -- e.g., 'primary', 'heading-lg', 'spacing-4'
  value VARCHAR(1024) NOT NULL,  -- e.g., '#FF6B6B', '2rem', '0 4px 12px rgba(...)'
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(site_id, category, name)
);

-- Default tokens seed
-- Primary colors: primary, secondary, accent, success, warning, error
-- Neutral colors: text-primary, text-secondary, bg-light, bg-dark
-- Typography: font-display, font-body, font-mono; size-xs through size-4xl; weight-light through weight-black
-- Spacing: spacing-1 through spacing-12 (4px, 8px, 12px, 16px, 20px, 24px, 28px, 32px, 36px, 40px, 44px, 48px)
-- Shadows: shadow-sm, shadow-md, shadow-lg
```

#### UI Components Needed

**1. Tokens Manager** (`/admin/settings/design-tokens`)
- Tabbed interface:
  - **Colors** tab
    - Display all color tokens in a grid (swatch + name + value)
    - Edit color: click swatch → color picker modal (or hex input)
    - Add color: "+ New color" button
    - Delete color: trash icon (with confirmation)
  - **Typography** tab
    - Font families (display, body, mono)
    - Font sizes (list of size tokens with preview text)
    - Font weights (light, regular, semibold, bold, black)
    - Line heights (1.2x, 1.5x, 1.8x)
    - Edit/add/delete same as colors
  - **Spacing** tab
    - Spacing scale (4px → 48px in 4px increments)
    - Visual scale preview (boxes showing each increment)
    - Edit/add/delete
  - **Shadows** tab
    - Shadow presets (sm, md, lg, xl)
    - Visual preview of each shadow
    - Edit/add/delete

**2. Token Editor Modal**
- Modal with:
  - Token name (text input, required)
  - Token value (input varies by type: color picker for colors, text for typography/spacing)
  - Description (textarea, optional)
  - "Save" button
  - "Delete" button (if editing)

#### API Endpoints Needed

```
GET    /api/design-tokens                    — List all tokens for site (by category)
POST   /api/design-tokens                    — Create new token
PATCH  /api/design-tokens/[id]               — Update token
DELETE /api/design-tokens/[id]               — Delete token
POST   /api/design-tokens/export             — Export as CSS or JSON
```

#### Frontend Integration

**Export to frontend:**
- Generate a CSS file with all tokens as custom properties:
  ```css
  :root {
    --color-primary: #FF6B6B;
    --color-secondary: #4ECDC4;
    --font-display: 'Lexend Deca', sans-serif;
    --size-lg: 1.5rem;
    --spacing-4: 1rem;
    --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  ```
- Option 1: Store generated CSS in Supabase (fetch on page load)
- Option 2: Generate at build time from tokens table

**Wiring:**
- Page editor: Add "Design Tokens" block (displays color palette + typography samples)
- Admin settings: Link to tokens manager
- Frontend stylesheet: Inject generated tokens CSS into `<head>`

### Checklist

- [ ] Create Supabase schema (design_tokens table)
- [ ] Create seed data (default AF brand tokens)
- [ ] Create API routes (CRUD + export)
- [ ] Build Tokens Manager UI (tabs for colors, typography, spacing, shadows)
- [ ] Add color picker component (or integrate a lib like `react-color`)
- [ ] Add token preview (visual swatches, type samples, spacing scale)
- [ ] Wire to Supabase queries
- [ ] Test CRUD operations
- [ ] Implement CSS export (generate `:root` custom properties)
- [ ] Test frontend injection (styles apply to site)
- [ ] Document token naming conventions (e.g., `--color-*`, `--size-*`, `--spacing-*`)

---

## Phase 4: Block Editor Enhancements

**Goal:** Add configuration options to the Products block (and other blocks) for filtering, limiting, and sorting.

**Timeline:** 2–3 days

### Requirements

#### Products Block Enhancements

Current behavior: Shows all products, always.

Add to block editor:

1. **Featured-only toggle** — Show only products where `is_featured = true`
2. **Item limit** — Display 6, 8, 12, or custom number (defaults to all)
3. **Sorting** — By display_order, price (low→high, high→low), newest first
4. **Category filter** — Pre-filter to specific category or show all
5. **Show as** — Carousel or grid (layout variant)

Store these settings in the `blocks` table as `block_config` JSON:

```json
{
  "featured_only": false,
  "limit": 12,
  "sort_by": "display_order",
  "category_filter": null,
  "layout": "grid"
}
```

#### UI Changes

**Block editor form (on `/admin/pages` when editing Products block):**
- Checkbox: "Featured products only"
- Select: "Limit results to" (dropdown: 6, 8, 12, 24, All)
- Select: "Sort by" (display_order, price low→high, price high→low, newest)
- Select: "Category" (All, Chairs, Lamps, Shelving, or custom)
- Select: "Layout" (Grid, Carousel)

#### API Changes

**Update `/api/blocks/` endpoints:**
- Store `block_config` JSON on create/update
- Pass config to frontend when rendering block
- Frontend queries products with filters applied

#### Frontend Changes

**Update Products block render logic:**
- Read `block_config` from page data
- Query products with filters:
  ```sql
  SELECT * FROM products
  WHERE site_id = $1
    AND (is_featured = true OR block_config->featured_only = false)
    AND category = $2 OR block_config->category_filter = null
  ORDER BY ... (based on sort_by)
  LIMIT block_config->limit
  ```

### Checklist

- [ ] Update `blocks` schema to include `block_config` JSON column (if not already present)
- [ ] Update block editor form to include Products block config fields
- [ ] Update API to store/retrieve `block_config`
- [ ] Update frontend Products block render to apply filters
- [ ] Test each filter option (featured-only, limit, sort, category)
- [ ] Test on live site (changes reflect immediately)

---

## Bonus: Collections Block

Once Phase 1 is done, add a Collections block to the page editor:

- Display featured collections (cards with collection image, name, product count)
- Link to collection detail pages
- Similar config to Products block (limit, featured-only, sort)

---

## Implementation Order (Recommended)

1. **Phase 1 (Days 1–4):** Collections Manager — creates the data model for curated groupings
2. **Phase 2 (Days 5–6):** Reviews/Testimonials — standalone, non-blocking
3. **Phase 3 (Days 7–11):** Design Tokens Manager — foundational for future theming
4. **Phase 4 (Days 12–14):** Block Editor Enhancements — polishes UX
5. **Bonus (Days 15+):** Collections block on pages, product detail page, search/filtering

---

## Testing Checklist (All Phases)

- [ ] Create data in admin UI
- [ ] Verify data appears in Supabase
- [ ] Verify data displays on live frontend
- [ ] Update data in admin UI
- [ ] Verify changes reflect on frontend (no cache issues)
- [ ] Delete data in admin UI
- [ ] Verify deletion removes data from frontend
- [ ] Test edge cases (empty states, special characters in names, long text, etc.)
- [ ] Test on mobile (responsive admin UI)
- [ ] Test simultaneous edits (if multiple users could edit same site)

---

## Notes

- All API endpoints should require auth (user must be logged into AF dashboard)
- All data should be scoped to `site_id` (AF's site, not other users' sites)
- Use optimistic UI updates where possible (instant feedback, then confirm with server)
- Consider caching on frontend (to reduce Supabase queries for product lists, reviews, etc.)
- Drag-to-reorder should use `display_order` integer column (allows 0, 1, 2, ... or custom gaps)

---

## Next Steps

1. **Review this plan** with Anthony — any changes or priorities?
2. **Start Phase 1** in next Claude Code session — Supabase schema + API routes + Collections UI
3. **Keep STATUS.md and BUILD-SCHEDULE.md updated** as each phase completes
4. **Sync back to this file** after each phase with "Live verification" date + notes

