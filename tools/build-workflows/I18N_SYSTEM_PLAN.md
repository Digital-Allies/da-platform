# Bilingual Website System (i18n) — Architecture & Implementation Plan

**Status:** Architecture scoped, not yet implemented  
**Target:** Multi-site bilingual support for DA platform  
**Languages:** English + Spanish (extensible to additional languages)  
**Accessibility:** WCAG 2.1 AA compliance, language-switching UX, search-engine optimization

---

## Overview

The DA platform should support bilingual (English/Spanish) websites across all three client sites:
- **Digital Allies** (digitalallies.com)
- **Atomic Finds ATX** (atomicfindsatx.com)
- **Healthcare Training Center** (client site)

This document scopes a reusable i18n system that works with the Next.js CMS architecture (tools/build-workflows), is admin-manageable, and follows best practices for SEO, accessibility, and user experience.

---

## Architecture

### 1. Translation Source

**Decision:** Database-backed translations (not static files)

- **Why:** Admin dashboard can manage translations without code changes; clients can update copy in real-time
- **Schema:** New `translations` table in Supabase (per client, keyed by i18n namespace + key)
- **Fallback:** Static JSON bundles for critical UI strings (nav, buttons) as emergency fallback if DB is slow

**Table structure:**
```sql
CREATE TABLE translations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE NOT NULL,
  namespace text NOT NULL,       -- e.g. "homepage", "nav", "contact-form"
  key text NOT NULL,             -- e.g. "hero_title", "learn_more_cta"
  language text NOT NULL,        -- 'en', 'es'
  value text NOT NULL,           -- the translated string
  context text,                  -- optional: hints for translators (character limit, tone, usage)
  updated_at timestamptz DEFAULT now(),
  
  UNIQUE(client_id, namespace, key, language),
  INDEX ON (client_id, language, namespace)
);

-- seed: INSERT INTO translations VALUES
-- ('atomic-finds-id', 'homepage', 'hero_title', 'en', 'Atomic Finds ATX', 'Hero banner headline')
-- ('atomic-finds-id', 'homepage', 'hero_title', 'es', 'Atomic Finds ATX', 'Hero banner headline (same in Spanish)')
```

### 2. i18n Library

**Decision:** next-intl (Next.js native, minimal overhead)

- **Why:** Works seamlessly with Next.js 13+ App Router; built-in locale switching; good TypeScript support
- **Locale Detection:** URL-first (`/en/shop`, `/es/tienda`), fallback to Accept-Language header
- **Config:** `i18n.config.ts` in tools/build-workflows root

```typescript
// i18n.config.ts
export const locales = ['en', 'es'] as const;
export const defaultLocale = 'en' as const;

export const localeNames = {
  en: 'English',
  es: 'Español',
} as const;

export const localePaths = {
  en: { shop: '/shop', contact: '/contact' },
  es: { shop: '/tienda', contact: '/contactanos' },
} as const;
```

### 3. URL Structure

**Pattern:** `/[locale]/[path]`

Examples:
- `https://atomicfindsatx.com/en/shop` → English shop
- `https://atomicfindsatx.com/es/tienda` → Spanish shop
- `https://atomicfindsatx.com/` → Redirect to `/en/` (default locale)

**SEO hreflang tags:** Auto-generated per page to link alternate language versions

### 4. Content Model

**Strategy:** Shared content model, per-locale overrides

- **Pages:** Built once, rendered in all languages
- **CMS blocks:** Text blocks (hero, section copy, contact form labels) fetch translations by key
- **Products/Testimonials:** Shared data, translatable metadata (title, description, tags)

Example block render:

```typescript
// src/components/site/HeroBlock.tsx
import { useTranslations } from 'next-intl';

export default function HeroBlock({ blockData }) {
  const t = useTranslations('homepage'); // namespace
  return (
    <section>
      <h1>{t('hero_title')}</h1> {/* fetches from DB or fallback */}
      <p>{t('hero_body')}</p>
      <a href={t('hero_cta_url')}>{t('hero_cta_label')}</a>
    </section>
  );
}
```

### 5. Admin Interface

**New dashboard section:** `/admin/translations`

- **Features:**
  - Per-client, per-namespace translation editor
  - Language toggle (English ↔ Spanish)
  - Missing translation detection (shows EN keys with no ES value)
  - Bulk import/export (CSV for translator handoff)
  - Preview site in each language
  - Translation status dashboard (% complete per namespace)

**Form pattern:** Match existing `/admin/settings` pattern (Services, Testimonials modules)

```typescript
// src/app/admin/(protected)/translations/page.tsx
// Table view: namespace | key | EN | ES | actions (edit, delete, add)
// Edit form: namespace / key / language selector / text field (with char limit hints)
```

### 6. Language Switcher Component

**Placement:** Top nav (all sites) + footer (optional)

- **Desktop:** Dropdown or flag selector in nav
- **Mobile:** Inside hamburger menu (don't clutter limited space)
- **Behavior:** Preserve current page path, only change locale prefix

**Example nav switcher:**

```typescript
// src/components/site/LanguageSwitcher.tsx
import { useLocale, usePathname } from 'next-intl/client';
import Link from 'next/link';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  
  return (
    <select value={locale} onChange={(e) => {
      const newPath = pathname.replace(`/${locale}/`, `/${e.target.value}/`);
      window.location.href = newPath;
    }}>
      <option value="en">English</option>
      <option value="es">Español</option>
    </select>
  );
}
```

---

## Phase 1: MVP (Atomic Finds ATX)

### Scope
- Core i18n system (next-intl, translations table, locale routing)
- Admin dashboard for translation management
- Language switcher (nav + footer)
- Atomic Finds homepage + shop grid translated (EN/ES)

### Not included
- Product auto-translation (manual only)
- Right-to-left language support
- Complex pluralization rules
- Advanced translator workflows (approval, versioning)

### Files to create
1. `i18n.config.ts` — locale config
2. `middleware.ts` — locale detection + routing
3. `app/[locale]/layout.tsx` — root layout with locale provider
4. `app/[locale]/page.tsx`, `shop/page.tsx`, etc. — localized routes
5. `src/app/admin/(protected)/translations/page.tsx` — admin dashboard
6. `src/components/site/LanguageSwitcher.tsx` — switcher component
7. Database migration for `translations` table

### Files to update
1. `middleware.ts` — add i18n locale detection
2. `atomic-finds.css` — no changes (CSS already i18n-agnostic)
3. `AtomicFindsHomepage.tsx` — wrap in useTranslations() calls
4. Navigation components — add LanguageSwitcher
5. All section headers/CTA text — move to translations table keys

### Estimated effort
- Backend (DB + admin): 1–2 days
- Frontend (next-intl setup + components): 1 day
- Content (seeding initial EN/ES copy): 1 day
- QA + SEO verification: 1 day

---

## Phase 2: Rollout (Digital Allies, HCTC)

Once MVP is stable on Atomic Finds:
- Migrate Digital Allies to i18n system
- Migrate Healthcare Training Center to i18n system
- Establish translator workflows and style guide (EN/ES voice)
- Verify SEO (hreflang, sitemap multilang, search console setup)

---

## Language Switching UX Best Practices

1. **Locale in URL, not query string:** `/es/shop` not `/shop?lang=es` (better for caching, bookmarks, SEO)
2. **Persist selection:** Store in cookie `NEXT_LOCALE=es` (survives across site visits, but URL is source of truth)
3. **No page reload required:** SPA-style language switch when possible (only reload if data fetch needed)
4. **Preserve scroll position:** When switching languages on the same page, don't jump to top
5. **Loading state:** Show brief spinner if fetching translations from DB (most should be cached)
6. **Accessibility:** Lang attribute on `<html>` — `<html lang="en">` or `<html lang="es">`

---

## SEO Considerations

### hreflang Tags
```html
<!-- On /en/shop -->
<link rel="alternate" hreflang="en" href="https://example.com/en/shop" />
<link rel="alternate" hreflang="es" href="https://example.com/es/shop" />
<link rel="alternate" hreflang="x-default" href="https://example.com/en/shop" />
```

### Sitemap
```xml
<!-- sitemap.xml or sitemap-en.xml, sitemap-es.xml -->
<url>
  <loc>https://example.com/en/shop</loc>
  <xhtml:link rel="alternate" hreflang="es" href="https://example.com/es/shop" />
</url>
```

### Robots.txt
```
# Crawl both locales
Sitemap: https://example.com/sitemap.xml
```

### Meta Tags (auto-generated)
```typescript
// In layout.tsx or dynamic route
export const generateMetadata = ({ params: { locale } }) => ({
  title: t('meta_title'),
  description: t('meta_description'),
  alternates: {
    languages: {
      'en': 'https://example.com/en/page',
      'es': 'https://example.com/es/page',
    },
  },
});
```

---

## Accessibility (WCAG 2.1 AA)

1. **Language attribute:** Every page must have `lang="en"` or `lang="es"` on `<html>`
2. **Skip links:** Translate skip-link text dynamically (`[role="skip-link"]` + translation key)
3. **Form labels:** All form inputs translated, including `aria-label` on buttons
4. **Alt text:** Images should have i18n keys too (not every client will provide Spanish alt text; fallback to EN)
5. **Focus indicators:** Must be visible in both dark (Atomic Finds) and light themes
6. **Font support:** Ensure font stack works for accented Spanish text (é, ñ, á, ü, etc.)

---

## Translation Content Checklist

**Before launching ES:**
- [ ] Navigation menu (Shop, How It Works, Contact, etc.)
- [ ] Hero section (eyebrow, title, body, CTAs)
- [ ] Section headers & descriptions
- [ ] Product titles & descriptions
- [ ] CTA button labels
- [ ] Form labels & placeholders
- [ ] Error messages & validation text
- [ ] Footer copyright & credits
- [ ] Meta titles & descriptions (SEO)
- [ ] Open Graph tags (social sharing)

**Translation style:**
- Use formal Spanish (not slang)
- Keep brand voice consistent (warm, authentic—see sites/atomic-finds/CLAUDE.md)
- Character limits: leave 20–30% headroom for longer Spanish strings
- Tone: mirror the English tone, not word-for-word literal

---

## Testing Checklist

- [ ] Language switcher appears in nav
- [ ] Clicking lang switch updates URL `/en/` ↔ `/es/`
- [ ] All text renders in correct language
- [ ] hreflang tags present in head
- [ ] Accented characters display correctly
- [ ] Form labels, placeholders, errors translated
- [ ] Date/number formatting respects locale (e.g., 1.000,00 EUR in ES)
- [ ] Mobile language switcher in hamburger menu
- [ ] Search console reports both `/en/` and `/es/` crawled
- [ ] No console errors on language switch
- [ ] Images load correctly (no "es/assets" redirect issues)

---

## Future Considerations

- **Translator management:** Admin interface for assigning translators per language
- **Translation versioning:** Track who changed what when, rollback to previous version
- **Auto-translate:** Supabase Edge Functions + OpenAI/Google Translate API as draft generator
- **Locale-specific styling:** Fonts, spacing adjustments for right-to-left if needed (Arabic, etc.)
- **Date/time/currency formatting:** Intl.DateTimeFormat for each locale
- **Language detection:** Auto-switch based on browser Accept-Language (after first visit)

---

## Reference: Digital Allies i18n Notes

(To be filled in after reviewing the live DA site's language switching, if any exists.)

---

**Document Owner:** Digital Allies CMS Team  
**Last Updated:** 2026-07-21  
**Version:** 1.0 (MVP scope)
