# Language Switcher Kit

Drop-in bilingual (or multilingual) client-side language switcher. No build
step, no dependencies. This is the hardened, CMS-ready version of the system
running on digitalallies.net.

## Quick start

```html
<link rel="stylesheet" href="styles.css">

<div class="language-switcher">
  <button class="lang-btn" id="lang-en" onclick="toggleLanguage('en')">EN</button>
  <button class="lang-btn" id="lang-es" onclick="toggleLanguage('es')">ES</button>
</div>

<h1 data-en="Welcome" data-es="Bienvenido">Welcome</h1>

<script src="language-controller.js"></script>
```

That's the whole integration. See `example.html` for the full pattern,
including CMS-injected content, legal-page link swapping, and SEO tags.

## Configuring for a client

Set config before the script tag loads:

```html
<script>
  window.LANGUAGE_CONTROLLER_CONFIG = {
    languages: ['en', 'es', 'fr'],
    defaultLanguage: 'en',
    languageNames: { en: 'English', es: 'Spanish', fr: 'French' }
  };
</script>
<script src="language-controller.js"></script>
```

Adding a language requires zero controller changes — add the code to
`languages`, add a `data-{code}` attribute to your markup and a
`#lang-{code}` button.

## For the CMS platform team

See `SKILL.md` for the full baking-in checklist (Supabase bilingual field
convention, hreflang/og:locale generation, pre-deploy duplicate-HTML guard,
and the launch testing checklist), and `plan.md` for the research this kit
is based on.
