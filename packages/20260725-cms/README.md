# Digital Allies CMS — Documentation

**The CMS is one thing: the Connected CMS Dashboard at `dashboard.html`**
(served by `app.js` + `style.css`). Send developers and collaborators here.
Earlier prototypes live in `_archive/` for reference only.

## What the CMS must include

Three core jobs (full detail in the spec):

1. **Website page editing** — build pages by stacking sections from a
   component library (hero, departments, field notes, rich text, CTA, …);
   reorder, edit inline, draft/publish.
2. **Global design-system editing** — edit the brand tokens the whole site
   reads (colors, type, spacing) from one place; change once, update every page.
3. **Blog & article publishing** — The Press Office: write, schedule, and
   publish posts, press releases, and case studies.

Plus the content calendar, projects, research, the dev workshop, and settings.

## Anthony's task tracker

**`anthony-tasks.html`** — visual check-off list of every open task that
needs Anthony specifically (Supabase/Vercel/registrar clicks, calls needing
his judgment), grouped by urgency, synced from `da-platform/STATUS.md` +
`BUILD-SCHEDULE.md`. Checkbox state persists locally per device. Tell Claude
what changed in a session and the list gets updated to match.

## Documentation files

- **`../CMS_IMPLEMENTATION_PLAN.html`** — the specification: what the CMS must
  include + the phased build plan, schema, and API endpoints. **Start here.**
- **`INTEGRATION_OVERVIEW.md`** — the big picture: public site, admin dashboard, database.
- **`WIRING_GUIDE.md`** — how to connect website → dashboard → Supabase.

## Build status

`dashboard.html` + `app.js` are a working front-end prototype with in-memory
sample data — the shell, navigation, and basic create/edit/delete are real and
clickable. The page builder, the section library, the full design-token editor,
and live publishing are specified in the plan and get built against a backend.

## What's here

```
cms/
├── dashboard.html              # THE CMS — canonical admin dashboard
├── app.js, style.css           # dashboard logic + styles
├── README.md                   # this file
├── INTEGRATION_OVERVIEW.md     # architecture
├── WIRING_GUIDE.md             # how to connect everything
├── index.html                  # CMS landing (links here)
└── _archive/                   # superseded prototypes (reference only)
```
