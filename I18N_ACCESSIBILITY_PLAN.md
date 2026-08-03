# i18n + Accessibility + SEO Foundation
## Atomic Finds → Reusable Template for All Future Clients

**Status:** In Progress  
**Scope:** Full English + Spanish i18n, WCAG 2.1 AA accessibility, complete SEO  
**Timeline:** This session + next 2 sessions  

---

## PHASE 1: i18n Setup (next-intl)

### Step 1.1: Install & Configure next-intl

```bash
npm install next-intl
```

### Step 1.2: Create Message Structure

```
tools/build-workflows/messages/
├── en/
│   ├── common.json          # UI labels, buttons, nav
│   ├── atomic-finds.json    # AF-specific copy
│   ├── pages.json           # Homepage, about, contact, etc
│   ├── products.json        # Product names, descriptions
│   └── seo.json             # Meta descriptions, titles
└── es/
    ├── common.json
    ├── atomic-finds.json
    ├── pages.json
    ├── products.json
    └── seo.json
```

### Step 1.3: Sample Message Files

**messages/en/common.json**
```json
{
  "nav": {
    "home": "Home",
    "shop": "Shop",
    "about": "About",
    "contact": "Contact",
    "admin": "Admin Login"
  },
  "footer": {
    "copyright": "© 2026 Atomic Finds ATX. All rights reserved.",
    "followUs": "Follow Us",
    "accessibility": "Accessibility Statement"
  },
  "language": {
    "english": "English",
    "spanish": "Español"
  }
}
```

**messages/es/common.json**
```json
{
  "nav": {
    "home": "Inicio",
    "shop": "Tienda",
    "about": "Acerca de",
    "contact": "Contacto",
    "admin": "Iniciar Sesión"
  },
  "footer": {
    "copyright": "© 2026 Atomic Finds ATX. Todos los derechos reservados.",
    "followUs": "Síguenos",
    "accessibility": "Declaración de Accesibilidad"
  },
  "language": {
    "english": "English",
    "spanish": "Español"
  }
}
```

### Step 1.4: Update next.config.js

```javascript
/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const nextConfig = {
  // existing config...
};

module.exports = withNextIntl(nextConfig);
```

### Step 1.5: Create i18n.ts Configuration

**src/i18n.ts**
```typescript
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`../../messages/${locale}/common.json`)).default,
}));
```

### Step 1.6: Update Middleware for Locale Detection

**src/middleware.ts** (create if doesn't exist)
```typescript
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'es'],

  // Used when no locale matches
  defaultLocale: 'en'
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(es|en)/:path*']
};
```

---

## PHASE 2: Language Switcher Component

**src/components/site/LanguageSwitcher.tsx**
```typescript
'use client';

import { useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  const getLocalePath = (newLocale: string) => {
    // Remove current locale from path
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    // Add new locale
    return `/${newLocale}${pathWithoutLocale || '/'}`;
  };

  return (
    <div 
      className="language-switcher"
      role="region"
      aria-label="Language selection"
    >
      <Link 
        href={getLocalePath('en')}
        aria-current={locale === 'en' ? 'page' : undefined}
        className={locale === 'en' ? 'active' : ''}
      >
        English
      </Link>
      <span className="separator" aria-hidden="true">|</span>
      <Link 
        href={getLocalePath('es')}
        aria-current={locale === 'es' ? 'page' : undefined}
        className={locale === 'es' ? 'active' : ''}
      >
        Español
      </Link>
    </div>
  );
}
```

---

## PHASE 2: Accessibility Audit Checklist

### Visual Accessibility
- [ ] **Contrast Ratios**
  - [ ] Body text: 4.5:1 (WCAG AA)
  - [ ] Large text (18px+): 3:1 (WCAG AA)
  - [ ] UI components: 3:1 minimum
  - Test with: https://webaim.org/resources/contrastchecker/

- [ ] **Font Sizes**
  - [ ] Minimum 16px for body text
  - [ ] Headings scale appropriately (h1 > h2 > h3)
  - [ ] No text smaller than 12px except labels

- [ ] **Color Blindness**
  - [ ] Don't rely on color alone for information
  - [ ] Use patterns/icons alongside colors
  - Test with: https://www.color-blindness.com/coblis-color-blindness-simulator/

- [ ] **Responsive & Zoom**
  - [ ] Text reflows at 200% zoom
  - [ ] Touch targets ≥ 44x44px
  - [ ] No horizontal scroll at any viewport

### Navigation & Interaction
- [ ] **Keyboard Navigation**
  - [ ] All interactive elements reachable via Tab
  - [ ] Visible focus indicators (not just `:focus`)
  - [ ] Tab order is logical (left→right, top→bottom)
  - [ ] No keyboard traps

- [ ] **Screen Reader**
  - [ ] All images have descriptive alt text
  - [ ] Form labels properly associated (`<label for>`)
  - [ ] Semantic HTML (nav, main, article, aside)
  - [ ] ARIA landmarks for page structure
  - Test with: NVDA (Windows), JAWS, VoiceOver (Mac)

- [ ] **Forms**
  - [ ] Error messages associated with fields
  - [ ] Required fields marked (and announced)
  - [ ] Instructions provided before input

### Structure & Semantics
- [ ] **Semantic HTML**
  - [ ] `<nav>` for navigation
  - [ ] `<main>` for primary content
  - [ ] `<article>` for independent content
  - [ ] `<button>` for buttons (not `<div>`)
  - [ ] `<a>` for links (not `<span>`)

- [ ] **Heading Hierarchy**
  - [ ] Only ONE `<h1>` per page
  - [ ] Headings in order (h1 → h2 → h3, no skips)
  - [ ] Headings describe content

### Content
- [ ] **Language Declaration**
  - [ ] `<html lang="en">` on root
  - [ ] Language changes marked (`<span lang="es">`)

- [ ] **Text Alternatives**
  - [ ] Images: descriptive alt text
  - [ ] Icons: `aria-label` or `role="img" aria-label`
  - [ ] Videos: captions + transcript

---

## PHASE 3: SEO Foundation

### 3.1: Dynamic Meta Tags

**src/app/[locale]/layout.tsx** (update)
```typescript
import { getTranslations, getLocale } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('seo');
  const locale = await getLocale();

  return {
    title: t('home.title'),
    description: t('home.description'),
    alternates: {
      languages: {
        en: 'https://atomicfindsatx.store/en',
        es: 'https://atomicfindsatx.store/es',
      },
    },
    openGraph: {
      title: t('home.og_title'),
      description: t('home.og_description'),
      image: 'https://atomicfindsatx.store/og-image.jpg',
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'es_ES',
    },
  };
}
```

### 3.2: Structured Data (Schema.org)

**src/components/schema/OrganizationSchema.tsx**
```typescript
export function OrganizationSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: 'Atomic Finds ATX',
          description: 'Vintage furniture and collectibles from Austin, TX',
          image: 'https://atomicfindsatx.store/logo.png',
          url: 'https://atomicfindsatx.store',
          telephone: '+1-512-XXX-XXXX',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Austin, TX',
            addressLocality: 'Austin',
            addressRegion: 'TX',
            addressCountry: 'US',
          },
          sameAs: [
            'https://instagram.com/atomicfindsatx',
            'https://facebook.com/atomicfindsatx',
          ],
        }),
      }}
    />
  );
}
```

### 3.3: robots.txt

**public/robots.txt**
```
User-agent: *
Allow: /

Disallow: /admin
Disallow: /api
Disallow: /*.json$

Sitemap: https://atomicfindsatx.store/sitemap.xml
```

### 3.4: Sitemap Generator

**src/app/sitemap.ts**
```typescript
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://atomicfindsatx.store',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: {
          es: 'https://atomicfindsatx.store/es',
        },
      },
    },
    {
      url: 'https://atomicfindsatx.store/shop',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://atomicfindsatx.store/about',
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: 'https://atomicfindsatx.store/contact',
      lastModified: new Date(),
      priority: 0.7,
    },
  ];
}
```

---

## PHASE 4: Accessibility Statement Page

**src/app/[locale]/accessibility/page.tsx**
```typescript
import { useTranslations } from 'next-intl';

export default function AccessibilityPage() {
  const t = useTranslations('pages');

  return (
    <main className="container py-12">
      <article>
        <h1>{t('accessibility.title')}</h1>
        
        <section>
          <h2>Commitment to Accessibility</h2>
          <p>
            Atomic Finds ATX is committed to making our website accessible to everyone.
            We continuously work to improve accessibility in accordance with WCAG 2.1 Level AA standards.
          </p>
        </section>

        <section>
          <h2>Accessibility Features</h2>
          <ul>
            <li>Keyboard navigation support</li>
            <li>High contrast mode compatible</li>
            <li>Screen reader friendly</li>
            <li>Descriptive image alt text</li>
            <li>Proper heading hierarchy</li>
            <li>Multilingual support (English & Spanish)</li>
          </ul>
        </section>

        <section>
          <h2>Known Issues</h2>
          <p>We are continuously working to fix any accessibility issues. Report any issues to:</p>
          <a href="mailto:accessibility@atomicfindsatx.store">
            accessibility@atomicfindsatx.store
          </a>
        </section>
      </article>
    </main>
  );
}
```

---

## PHASE 5: Reusable Template for Future Clients

### File Structure (Copy-Paste for New Clients)

```
/messages              ← Copy entire folder for new client
├── en/
│   ├── common.json    ← Update: client-specific UI
│   ├── client-name.json ← NEW: client branding
│   ├── pages.json     ← Update: client copy
│   ├── products.json  ← NEW: client products
│   └── seo.json       ← Update: client SEO
└── es/
    └── (same structure)

/src/components/schema/    ← Copy for new client
├── OrganizationSchema.tsx ← Update: client info
└── ProductSchema.tsx      ← NEW: client products

/public/robots.txt        ← Update: client domain
```

### Checklist for New Clients

- [ ] Copy `/messages` folder
- [ ] Update all `.json` files with client content
- [ ] Update `OrganizationSchema.tsx` with client info
- [ ] Update `robots.txt` with client domain
- [ ] Run WCAG audit (use checklist above)
- [ ] Add `/accessibility` page
- [ ] Test in EN + ES
- [ ] Test keyboard navigation
- [ ] Test screen reader
- [ ] Deploy

---

## Implementation Order

**Session 1 (Now):**
- [ ] Install next-intl
- [ ] Create message structure (common.json for EN + ES)
- [ ] Set up routing/middleware
- [ ] Add LanguageSwitcher component to header + footer

**Session 2 (Next):**
- [ ] Run WCAG audit on Atomic Finds
- [ ] Fix contrast ratios
- [ ] Update semantic HTML
- [ ] Test keyboard navigation
- [ ] Test screen reader (VoiceOver Mac, NVDA Windows)

**Session 3:**
- [ ] Add meta tags
- [ ] Implement schema.org
- [ ] Create sitemap.ts
- [ ] Add robots.txt
- [ ] Create /accessibility page
- [ ] Redeploy + verify

**Documentation:**
- [ ] Document all translations needed
- [ ] Create template for new clients
- [ ] Build onboarding guide

---

## Success Criteria

✅ **i18n:**
- [ ] Toggle between English ↔ Spanish on all pages
- [ ] All UI text, product descriptions, copy translatable

✅ **Accessibility:**
- [ ] WCAG 2.1 AA compliant
- [ ] Keyboard navigation works fully
- [ ] Screen reader testing passes
- [ ] Passes axe DevTools scan

✅ **SEO:**
- [ ] Meta tags render correctly
- [ ] Schema.org structured data valid (schema.org/validator)
- [ ] Sitemap generates + submittable to Google
- [ ] Open Graph previews working on social

✅ **Reusable:**
- [ ] Template ready for next client
- [ ] Checklist documented
- [ ] New client can launch in 1 session
