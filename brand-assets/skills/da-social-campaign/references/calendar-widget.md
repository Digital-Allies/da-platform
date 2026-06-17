# Calendar Widget Pattern

When Anthony asks to see the content calendar, or after any schedule change, render an interactive HTML widget using `mcp__visualize__show_widget`.

## What to build

The widget is a two-section view:
1. **Meta posts** (posting-schedule.json) — grouped by week, Mon/Wed/Fri
2. **GBP posts** (gbp-article-schedule.json) — Tue/Sat

Each row shows:
- Date (e.g., "Mon Jun 9")
- Platform badge — "FB+IG" (teal) or "GBP" (blue)
- Campaign name
- Image filename (short version — just the filename, not the full path)
- Status indicator — dot: gray=pending, green=posted, orange=skipped
- Click to expand → full caption text

At the top: a status summary bar  
`"22 Meta pending · 8 GBP pending · 0 posted · All images verified ✓"`

If any image path doesn't resolve, show a warning: `"⚠ 2 images not found — check paths before posting"`

## Color scheme (campaign colors)

| Campaign | Color |
|---|---|
| Design | #2DD4BF (teal) |
| Automation | #A78BFA (purple) |
| Integrations | #F97316 (orange/coral) |
| Bilingual / ES Support | #34D399 (green) |
| Field Notes | #60A5FA (light blue) |
| GBP article posts | #3B82F6 (blue) |
| Brand Visuals | #9CA3AF (gray) |

## Widget structure (HTML pseudocode)

```html
<!-- Header: status summary -->
<div class="summary-bar">
  X Meta pending · Y GBP pending · Z posted
</div>

<!-- Warning if any images missing -->
<div class="warning" style="display:none">⚠ X images not found</div>

<!-- Toggle: Show all / Show pending only -->
<button>Show pending only</button>

<!-- Week groups -->
<div class="week-group">
  <h3>Week of Jun 9</h3>
  
  <!-- Post row -->
  <div class="post-row" onclick="toggle(this)">
    <span class="date">Mon Jun 9</span>
    <span class="badge meta">FB+IG</span>
    <span class="campaign design">Design</span>
    <span class="filename">002_In_a_minimalist_...</span>
    <span class="status pending">●</span>
  </div>
  
  <!-- Expanded: caption -->
  <div class="caption" style="display:none">
    Your website is the first impression...
    → digitalallies.net/learn/design-bureau
  </div>
</div>
```

## Data source

Read both JSON files fresh each time before building the widget:
- `/Users/cuus/Claude/projects/digital-allies/assets/Design System /social-media-marketing/posting-schedule.json`
- `/Users/cuus/Claude/projects/digital-allies/assets/Design System /social-media-marketing/gbp-article-schedule.json`

Merge the two arrays, sort by date, then group by week (Mon–Sun).

For each Meta post's image, check that the file exists at:
`base_path + image` = `/Users/cuus/Claude/projects/digital-allies/assets/Design System /social-media-marketing/services-marketing-content/` + image

For each GBP post's image, check at:
`base_path + image` = `/Users/cuus/Claude/projects/digital-allies/assets/` + image

## Loading messages (for show_widget)

Use these (they're accurate and appropriately low-key for a tool call):
- "Reading schedule files"
- "Checking image paths"  
- "Building calendar"
