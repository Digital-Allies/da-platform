# Brand Voice & Marketing Integration Guide

## What You Now Have

Three new assets in the Digital Allies Design System:

1. **Brand Voice & Marketing Hub** (`preview/brand-voice-marketing.html`)
   - Primary voice guidelines + tone coordinates
   - Secondary voice (marketing) + when to use
   - Target audience personas
   - Content calendar structure & categories
   - All 30 asset prompts (Pamali library)
   - CMS integration instructions

2. **ContentCalendar.jsx Component** (`ui_kits/website/ContentCalendar.jsx`)
   - Reusable React component for displaying live calendar data
   - Sortable by day, category, or status
   - Filterable by category
   - CMS-hookable via props
   - Ready to mount in your connected CMS or any Design Component

3. **CSV Data Files** (already uploaded)
   - `da-master-social-copy.csv` — 30-day calendar with copy
   - `pamali-asset-prompts.csv` — visual briefs for each day
   - Both ready to import into your CMS

---

## Quick Start: Connect to Your CMS

### Step 1: Set Up the CMS Collection

In your connected CMS, create a new **Collection** called `ContentCalendar` with these fields:

```
- day (Number) — 1–30
- week (Number) — 1–4
- category (Text) — "Local data" | "Machine translation" | "Trust and culture" | "Digital Allies standard"
- topic (Text) — e.g., "Mohave County market"
- hook (Long Text) — Social post opening line
- caption (Long Text) — Full caption/copy
- cta (Text) — Call-to-action, e.g., "Ask for a bilingual audit"
- promptRef (Text) — Reference to asset prompt, e.g., "Day 1 · Bilingual storefront"
- status (Select) — "draft" | "approved" | "scheduled" | "posted" | "archived"
- scheduledDate (Date) — When to publish
```

### Step 2: Import the CSV Data

1. Open `uploads/da-master-social-copy.csv`
2. In your CMS, use the **bulk import** feature to create 30 initial entries
3. Map CSV columns to your CMS fields
4. Verify all 30 rows imported correctly

### Step 3: Create an API Endpoint

Your CMS should expose an API endpoint:

```
GET /api/marketing/calendar
GET /api/marketing/calendar?status=scheduled
GET /api/marketing/calendar?category=Local%20data
```

Response format:
```json
{
  "calendar": [
    {
      "day": 1,
      "week": 1,
      "category": "Local data",
      "topic": "Mohave County market",
      "hook": "Mohave County has a real bilingual market.",
      "caption": "...",
      "cta": "Ask for a bilingual audit.",
      "promptRef": "Day 1 · Bilingual storefront",
      "status": "scheduled",
      "scheduledDate": "2026-06-18"
    },
    // ...29 more
  ]
}
```

### Step 4: Mount the Component in Your Marketing Page

In your connected CMS project (or a Design Component), use:

```html
<x-import 
  component="ContentCalendar" 
  from="../../design-system/ui_kits/website/ContentCalendar.jsx" 
  data="{{ cms.calendar }}" 
  hint-size="100%,800px">
</x-import>
```

Or in React:

```jsx
import { ContentCalendar } from './ContentCalendar.jsx';

export function MarketingDashboard({ calendarData }) {
  return (
    <div>
      <h1>30-Day Content Calendar</h1>
      <ContentCalendar 
        data={calendarData}
        showStatus={true}
        showPromptRef={true}
        sortBy="day"
        onEntryClick={(entry) => openEditModal(entry)}
      />
    </div>
  );
}
```

### Step 5: Test Live Updates

1. Open your marketing page in the browser
2. In the CMS, update one entry (e.g., change "draft" → "approved")
3. **Without refreshing**, the component should update (if using live API polling)
4. Or refresh the page to see the change

---

## Where to Find Everything

| Asset | Location | Purpose |
|-------|----------|---------|
| Voice & Marketing Hub | `preview/brand-voice-marketing.html` | Read-only reference for all brand voice rules, audience, calendar structure |
| ContentCalendar Component | `ui_kits/website/ContentCalendar.jsx` | Reusable React component for CMS integration |
| Social Copy (CSV) | `uploads/da-master-social-copy.csv` | 30-day calendar with hooks, captions, CTAs — import to CMS |
| Asset Prompts (CSV) | `uploads/pamali-asset-prompts.csv` | Visual briefs for all 30 days — share with Pamali or your designer |
| Primary Voice (Canonical) | `README.md` (lines 1–200) | Official brand voice guide — the source of truth |
| Jargon Jar | `README.md` (lines 150–180) | Corporate speak → DA translation table |

---

## Keeping It Up to Date

### Monthly Calendar Refresh
1. Edit entries directly in your CMS interface (no files to touch)
2. Swap topics, copy, or prompts as needed
3. Updates are live immediately
4. Archive old entries after posting (set `status: "archived"`)

### Voice Rule Updates
- **Primary voice changes** → Edit `README.md` only
- **Secondary voice changes** → Edit the "Secondary Voice" section in `preview/brand-voice-marketing.html`
- Both are readable by anyone; changes don't require rebuilding the design system

### Adding New Categories
If you want to add a 5th week category (beyond the current 4-week cycle):
1. Add new option to `category` field in CMS
2. Update the category descriptions in `preview/brand-voice-marketing.html`
3. ContentCalendar.jsx automatically picks up new categories via the filter dropdown

---

## Using Asset Prompts with Pamali

The `pamali-asset-prompts.csv` file contains 30 art direction briefs. To use with Pamali:

1. **Export the CSV** from the design system
2. **Connect Pamali** to your CMS or upload the CSV to Pamali's batch-generation interface
3. **Map columns**: Pamali reads the `prompt` column and generates images
4. **Store outputs** in your CMS's asset library
5. **Link back**: Add asset URLs to the `ContentCalendar` entries so social posts auto-populate with imagery

Example prompt (Day 1):
```
"Minimal Southwest editorial photo concept: a local storefront window, warm desert light, subtle bilingual signage in English and Spanish, empty space for headline, calm modern composition, not photorealistic, not corporate, brand-aligned clean lines and muted tones."
```

---

## CMS Implementation Checklist

- [ ] Create `ContentCalendar` collection in CMS
- [ ] Add all 8 fields (day, week, category, topic, hook, caption, cta, promptRef, status, scheduledDate)
- [ ] Import `da-master-social-copy.csv` (30 rows)
- [ ] Set up `/api/marketing/calendar` endpoint
- [ ] Create marketing dashboard page in CMS
- [ ] Mount `ContentCalendar.jsx` component
- [ ] Test: edit one entry in CMS, verify it updates in the component
- [ ] Connect social scheduler (Buffer, Later, Hootsuite) to API endpoint
- [ ] Set up Pamali batch generation for asset prompts
- [ ] Establish weekly review cycle (every Monday, plan next week's posts)

---

## Questions?

### "Can I reorder the calendar days?"
Yes. Edit `day` and `week` fields in the CMS. ContentCalendar.jsx will sort by your new values.

### "Can I use different categories?"
Yes. Update the `category` field to match your strategy (e.g., "Product Spotlight", "Customer Story", "Local Tip"). The component auto-discovers categories from the data.

### "Can I sync this to social media directly?"
Yes, if your CMS supports webhooks. Set up an action: when status changes to "posted", webhook sends the entry to your social scheduler's API. Or use Zapier/IFTTT to bridge.

### "Do I have to use both voice guides?"
No. Use primary voice for all site copy, docs, and customer-facing materials. Use secondary voice **only** for social/promotional content. Keep them separate so the brand stays consistent.

### "Can I edit the Voice & Marketing Hub?"
Yes, but it's read-only in the design system. If you need to update voice rules, edit `README.md` (primary) or create a new version of `preview/brand-voice-marketing.html` (secondary). Never delete the original — it's the canonical reference.

---

## Next Steps (When You're Ready)

1. **Get Barcelona live** with the CMS integration (you mentioned this is coming soon — exciting!)
2. **Wire up Pamali** for batch asset generation (the prompts CSV is ready to go)
3. **Connect to social schedulers** (Buffer/Later can read from your CMS API)
4. **Establish a content calendar review cycle** (every Friday, plan the next week's posts)
5. **Iterate the secondary voice** based on what performs best (track metrics in your social scheduler, adjust tone based on engagement)

---

**Created:** June 18, 2026  
**Design System:** Digital Allies (v1.0)  
**Author:** Claude (Design Collaborator)
