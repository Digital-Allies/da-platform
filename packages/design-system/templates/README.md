# Digital Allies CMS Templates

Two ready-made page templates for your connected CMS project. Both are Design Components (`.dc.html`) that integrate seamlessly with the Digital Allies design system.

---

## 1. Services Index (`services-index/ServicesIndex.dc.html`)

**Purpose:** Hero section + featured tools grid + "View all tools" link

**Props (pass via JSON from your CMS):**
- `pageTitle` — Main heading (e.g., "Choose Your Tool")
- `pageSubtitle` — Subheading (e.g., "Four distinct operations...")
- `featuredSectionTitle` — Grid section title (e.g., "Featured")
- `featuredSectionSubtitle` — Grid description
- `featuredTools` — Array of tool objects:
  ```json
  [{
    "icon": "📊",
    "name": "Brand Discovery",
    "description": "From brief to brand board...",
    "features": ["Logo variations", "Color palette", ...],
    "pricing": "From $475",
    "detailPageUrl": "/tools/brand-discovery"
  }]
  ```
- `allToolsUrl` — Link to full tools directory
- `footerCopy` — Call-to-action at bottom

---

## 2. Tool Detail Page (`tool-detail/ToolDetail.dc.html`)

**Purpose:** Complete product page: hero + problem/solution/features/pricing/FAQ + sidebar nav + prev/next

**Props (pass via JSON from your CMS):**

### Hero & Basics
- `heroEyebrow` — "TOOL · 01 / 06" style label
- `toolName` — Tool title
- `toolTagline` — Short description

### Content Sections
- `problemStatement` — What pain point does it solve?
- `solutionStatement` — How does it solve it?
- `solutionImage` — (Optional) Image filename placeholder
- `features` — Array of feature objects:
  ```json
  [{
    "icon": "📝",
    "name": "Logo Variations",
    "description": "Multiple marks and lockups"
  }]
  ```

### Pricing & Comparison
- `pricingDisplay` — "From $475 flat" or similar
- `pricingDetails` — Array of pricing rows:
  ```json
  [{
    "label": "Delivery",
    "value": "1 day"
  }]
  ```
- `showComparison` — Boolean (true to show competitor table)
- `comparisonRows` — Array of comparison rows (only if showComparison = true):
  ```json
  [{
    "feature": "Setup time",
    "da": "< 1 hour",
    "compA": "2 days",
    "compB": "3 days"
  }]
  ```

### Integrations
- `showIntegrations` — Boolean (true to show integrations)
- `integrationsDescription` — Intro text
- `integrations` — Array of tool names: `["Figma", "Adobe XD", ...]`

### Case Study / Use Case
- `caseStudy` — (Optional) Object or null:
  ```json
  {
    "title": "Community Theater Brand Refresh",
    "description": "For the 2026 season...",
    "result": "+24% increase in ticket sales"
  }
  ```

### FAQ
- `faqs` — Array of Q&A pairs:
  ```json
  [{
    "question": "How long does it take?",
    "answer": "One full day, typically 9am–5pm."
  }]
  ```

### CTA & Navigation
- `ctaCopy` — CTA text (e.g., "Let's build something...")
- `ctaLabel` — Button label (e.g., "Book a session")
- `ctaUrl` — Link target
- `prevTool` — (Optional) Previous tool nav:
  ```json
  { "name": "SEO Audit", "url": "/tools/seo-audit" }
  ```
- `nextTool` — (Optional) Next tool nav (same structure)
- `allTools` — Array of all tools for sidebar:
  ```json
  [{
    "name": "Brand Discovery",
    "url": "/tools/brand-discovery",
    "isActive": true
  }]
  ```

---

## Using with Your CMS

### Consuming Project Setup
1. **Copy the template folder** into your consuming project's root (or wherever you want it)
2. **Update `ds-base.js`** — Change the `base` line to point to this design system:
   - If design system is at project root: `const base = '../..'` (two levels up)
   - If design system is in `_ds/` folder: `const base = '../../_ds/design-system-name'`
3. **Pass JSON data** from your CMS to the template props
4. **Open the `.dc.html` file** in the browser — it renders live with your data

### Example CMS Query
```json
{
  "pageTitle": "Our Services",
  "pageSubtitle": "Four distinct operations. One point of contact.",
  "featuredTools": [
    {
      "icon": "📊",
      "name": "SEO / Audit",
      "description": "Find the gaps in 90 seconds.",
      "features": ["Meta tags & titles", "Core Web Vitals", "Schema markup"],
      "pricing": "From $45/scan",
      "detailPageUrl": "/services/seo-audit"
    }
  ],
  "allToolsUrl": "/services"
}
```

---

## Customization Tips

### Layout Variants
Both templates support two variants:
- **Services Index:** Standard grid vs. carousel (pass `variant: 'carousel'` in props)
- **Tool Detail:** Image-left vs. image-right on solution section (modify `solutionImagePosition` prop)

### Styling
All styling is inline to preserve the design-system brand. To adjust colors/spacing/fonts:
1. Edit the `<style>` block in each template
2. Or create CSS overrides in a consuming project's stylesheet
3. Inline styles take precedence over class-based styles in the design system

### Typography & Brand
- All text uses **Lexend Deca** (headings) and **JetBrains Mono** (body)
- Colors follow the DA 95/5 rule: **Bone White** (#F9F6F0) + **Charcoal** (#2D2D2D) + **Pulse Blue** (#3A7BD5) + **Signal Red** (#C5301A)
- Spacing follows the **20px Technical Lace grid**

---

## Browser Compatibility

Both templates work in all modern browsers (Chrome, Firefox, Safari, Edge). The `<sc-for>`, `<sc-if>`, and `<dc-import>` tags are handled by the design-component runtime.

---

## Questions?

Reference the full design system README at the project root for voice, brand rules, and the complete token list.
