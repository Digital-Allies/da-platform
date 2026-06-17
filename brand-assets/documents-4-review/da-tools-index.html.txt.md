<!DOCTYPE html>
<!--
  ╔══════════════════════════════════════════════════════════════╗
  ║  Digital Allies — Tools Portfolio / Services Showcase        ║
  ║  Layout: Feature Grid Classic                                ║
  ║  Version: 1.0 · 2026                                         ║
  ║  Drop-in compatible: Duda, WordPress, Static                 ║
  ╚══════════════════════════════════════════════════════════════╝

  DUDA NOTES:
  • Paste the entire <div class="da-tools-root"> block into a
    Duda HTML Widget. All styles are scoped to .da-tools-root.
  • If embedding in a Duda page that already loads Google Fonts,
    remove the <link> tag inside the widget to avoid duplication.

  WORDPRESS NOTES:
  • Use a Full-Width page template or a Raw HTML block.
  • All CSS is scoped; no theme styles will leak in or out.

  SWAP-IN MARKERS:
  • Search "SWAP: SCREENSHOT" to find image placeholder slots.
  • Search "SWAP: CTA" to find contact-form embed points.
  • Search "DUDA WIDGET BOUNDARY" for Duda-specific hints.
-->
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Digital Allies — Tools built for small businesses, authors, and solo operators. SEO audits, CMS, manuscript editing, brand discovery, and more.">
  <title>Tools — Digital Allies</title>

  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">

  <style>
    /* ══════════════════════════════════════════════
       RESET & BASE (scoped to .da-tools-root only)
    ══════════════════════════════════════════════ */
    .da-tools-root *,
    .da-tools-root *::before,
    .da-tools-root *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    /* ══════════════════════════════════════════════
       BRAND TOKENS
    ══════════════════════════════════════════════ */
    .da-tools-root {
      --bone:     #F9F6F0;
      --charcoal: #2D2D2D;
      --pulse:    #3A7BD5;
      --signal:   #C5301A;
      --pink:     #FADEEB;
      --grid:     #E0DDD5;

      /* Typography */
      --font-lexend: 'Lexend Deca', sans-serif;
      --font-mono:   'JetBrains Mono', monospace;

      /* Spacing */
      --max-width: 1200px;
      --page-gutter: clamp(1.25rem, 5vw, 4rem);

      /* Base */
      font-family: var(--font-lexend);
      color: var(--charcoal);
      background-color: var(--bone);
      background-image:
        linear-gradient(rgba(45,45,45,0.07) 0.5px, transparent 0.5px),
        linear-gradient(90deg, rgba(45,45,45,0.07) 0.5px, transparent 0.5px);
      background-size: 20px 20px;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      min-height: 100vh;
    }

    /* ══════════════════════════════════════════════
       FOCUS STATES — Signal Red border (accessibility)
    ══════════════════════════════════════════════ */
    .da-tools-root :focus-visible {
      outline: 2px solid var(--signal);
      outline-offset: 3px;
    }

    /* ══════════════════════════════════════════════
       PULSE DOT ANIMATION
    ══════════════════════════════════════════════ */
    .da-tools-root .pulse-dot {
      display: inline-block;
      width: 12px;
      height: 12px;
      background: var(--pulse);
      border-radius: 50%;
      border: 1px solid var(--charcoal);
      flex-shrink: 0;
      animation: da-pulse 3s ease-in-out infinite;
    }

    @keyframes da-pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50%       { opacity: 0.5; transform: scale(1.25); }
    }

    /* ══════════════════════════════════════════════
       INNER CONTAINER UTILITY
    ══════════════════════════════════════════════ */
    .da-tools-root .da-inner {
      max-width: var(--max-width);
      margin-left: auto;
      margin-right: auto;
      padding-left: var(--page-gutter);
      padding-right: var(--page-gutter);
    }

    /* ══════════════════════════════════════════════
       1. HEADER / NAV
    ══════════════════════════════════════════════ */
    .da-tools-root .da-nav {
      position: sticky;
      top: 0;
      z-index: 100;
      background-color: var(--bone);
      border-bottom: 1px solid var(--charcoal);
      padding: 1rem 0;
    }

    .da-tools-root .da-nav__inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }

    /* Logo lockup */
    .da-tools-root .da-nav__logo {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      text-decoration: none;
      color: var(--charcoal);
    }

    .da-tools-root .da-nav__wordmark {
      font-family: var(--font-lexend);
      font-weight: 600;
      font-size: 1rem;
      letter-spacing: 0.01em;
      white-space: nowrap;
    }

    /* Nav links */
    .da-tools-root .da-nav__links {
      display: flex;
      align-items: center;
      gap: 2rem;
      list-style: none;
    }

    .da-tools-root .da-nav__links a {
      font-family: var(--font-lexend);
      font-weight: 500;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: var(--charcoal);
      text-decoration: none;
      transition: color 0.2s ease;
    }

    .da-tools-root .da-nav__links a:hover,
    .da-tools-root .da-nav__links a[aria-current="page"] {
      color: var(--pulse);
    }

    .da-tools-root .da-nav__links a[aria-current="page"] {
      border-bottom: 1px solid var(--pulse);
      padding-bottom: 1px;
    }

    /* Tablet (900px): compact nav link spacing */
    @media (max-width: 900px) {
      .da-tools-root .da-nav__links {
        gap: 1.25rem;
      }
    }

    /* Mobile (600px): hide nav links */
    @media (max-width: 600px) {
      .da-tools-root .da-nav__links {
        display: none;
      }
    }

    /* ══════════════════════════════════════════════
       2. BREADCRUMB
    ══════════════════════════════════════════════ */
    .da-tools-root .da-breadcrumb {
      padding: 0.85rem 0 0;
      border-bottom: 1px solid var(--grid);
    }

    .da-tools-root .da-breadcrumb__inner {
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    .da-tools-root .da-breadcrumb nav {
      font-family: var(--font-mono);
      font-weight: 400;
      font-size: 0.75rem;
      color: var(--charcoal);
      padding-bottom: 0.85rem;
    }

    .da-tools-root .da-breadcrumb a {
      color: var(--charcoal);
      text-decoration: none;
    }

    .da-tools-root .da-breadcrumb a:hover {
      color: var(--pulse);
    }

    .da-tools-root .da-breadcrumb__sep {
      opacity: 0.45;
      font-size: 0.7rem;
    }

    .da-tools-root .da-breadcrumb__current {
      opacity: 0.65;
    }

    /* ══════════════════════════════════════════════
       3. HERO SECTION
    ══════════════════════════════════════════════ */
    .da-tools-root .da-hero {
      padding-top: 8rem;
      padding-bottom: 6rem;
      position: relative;
      overflow: hidden;
    }

    .da-tools-root .da-hero__inner {
      position: relative;
    }

    /* Eyebrow */
    .da-tools-root .da-hero__eyebrow {
      font-family: var(--font-lexend);
      font-weight: 500;
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.18em;
      color: var(--charcoal);
      margin-bottom: 1.75rem;
      opacity: 0.7;
    }

    /* Headline stack — Paula Scher approach */
    .da-tools-root .da-hero__headline {
      line-height: 0.92;
      letter-spacing: -0.02em;
    }

    .da-tools-root .da-hero__line1 {
      display: block;
      font-family: var(--font-lexend);
      font-weight: 700;
      font-size: clamp(5rem, 11vw, 11rem);
      color: var(--charcoal);
      text-transform: uppercase;
    }

    .da-tools-root .da-hero__line2 {
      display: block;
      font-family: var(--font-lexend);
      font-weight: 700;
      font-style: italic;
      font-size: clamp(4rem, 9vw, 9rem);
      color: var(--charcoal);
      /* Rhythm indent — right-pulled alignment */
      padding-left: clamp(1rem, 6vw, 6rem);
      margin-top: 0.1em;
    }

    .da-tools-root .da-hero__built {
      color: var(--pulse);
    }

    /* Symmetry break: tiny Signal Red dot */
    .da-tools-root .da-hero__signal-dot {
      position: absolute;
      width: 8px;
      height: 8px;
      background: var(--signal);
      border-radius: 50%;
      /* Positioned off-center in the hero for visual tension */
      top: 2.5rem;
      right: calc(50% - 12px);
      pointer-events: none;
    }

    @media (max-width: 900px) {
      .da-tools-root .da-hero {
        padding-top: 5rem;
        padding-bottom: 4rem;
      }
    }

    @media (max-width: 600px) {
      .da-tools-root .da-hero {
        padding-top: 4rem;
        padding-bottom: 3rem;
      }
      .da-tools-root .da-hero__line2 {
        padding-left: 0.5rem;
      }
    }

    /* ══════════════════════════════════════════════
       4. TOPOGRAPHIC DIVIDER
    ══════════════════════════════════════════════ */
    .da-tools-root .da-topo {
      width: 100%;
      overflow: hidden;
      line-height: 0;
      border-top: 1px solid var(--grid);
      border-bottom: 1px solid var(--grid);
    }

    .da-tools-root .da-topo svg {
      display: block;
      width: 100%;
      height: 120px;
    }

    /* ══════════════════════════════════════════════
       5. TOOLS GRID
    ══════════════════════════════════════════════ */
    .da-tools-root .da-grid {
      padding: 5rem 0 6rem;
    }

    .da-tools-root .da-grid__layout {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0;
      border-left: 1px solid var(--charcoal);
      border-top: 1px solid var(--charcoal);
    }

    /* 3 cols on very wide screens */
    @media (min-width: 1100px) {
      .da-tools-root .da-grid__layout {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    /* 1 col on mobile */
    @media (max-width: 600px) {
      .da-tools-root .da-grid__layout {
        grid-template-columns: 1fr;
      }
    }

    /* ── TOOL CARD ── */
    .da-tools-root .da-card {
      position: relative;
      border-right: 1px solid var(--charcoal);
      border-bottom: 1px solid var(--charcoal);
      padding: 2.5rem;
      background-color: var(--bone);
      transition: transform 0.22s ease, box-shadow 0.22s ease;
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    .da-tools-root .da-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(45, 45, 45, 0.1);
      z-index: 1;
    }

    /* Card number */
    .da-tools-root .da-card__number {
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 0.7rem;
      color: var(--charcoal);
      letter-spacing: 0.08em;
      margin-bottom: 1.1rem;
      opacity: 0.55;
    }

    /* Tool name */
    .da-tools-root .da-card__name {
      font-family: var(--font-lexend);
      font-weight: 700;
      font-size: 1.75rem;
      color: var(--charcoal);
      line-height: 1.1;
      letter-spacing: -0.01em;
      margin-bottom: 0.75rem;
    }

    /* One-line description */
    .da-tools-root .da-card__desc {
      font-family: var(--font-mono);
      font-weight: 400;
      font-size: 0.85rem;
      color: var(--charcoal);
      line-height: 1.6;
      margin-bottom: 1.4rem;
      flex-grow: 1;
    }

    /* Hairline divider */
    .da-tools-root .da-card__divider {
      width: 24px;
      height: 1px;
      background: var(--charcoal);
      margin-bottom: 1.25rem;
      opacity: 0.5;
    }

    /* WHO IT'S FOR block */
    .da-tools-root .da-card__for-label {
      font-family: var(--font-lexend);
      font-weight: 500;
      font-size: 0.6rem;
      text-transform: uppercase;
      letter-spacing: 0.14em;
      color: var(--charcoal);
      opacity: 0.5;
      margin-bottom: 0.2rem;
    }

    .da-tools-root .da-card__for-value {
      font-family: var(--font-mono);
      font-weight: 400;
      font-size: 0.75rem;
      color: var(--charcoal);
      line-height: 1.5;
      margin-bottom: 1.25rem;
    }

    /* Pricing */
    .da-tools-root .da-card__price {
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 0.78rem;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--charcoal);
      margin-bottom: 0;
    }

    /* Icon — bottom-right corner */
    .da-tools-root .da-card__icon {
      position: absolute;
      bottom: 2rem;
      right: 2rem;
      width: 32px;
      height: 32px;
      opacity: 0.85;
    }

    @media (max-width: 600px) {
      .da-tools-root .da-card {
        padding: 1.75rem 1.5rem;
      }
    }

    /* ══════════════════════════════════════════════
       6. CTA STRIP
    ══════════════════════════════════════════════ */
    .da-tools-root .da-cta {
      border-top: 1px solid var(--charcoal);
      border-bottom: 1px solid var(--charcoal);
      padding: 2rem 0;
    }

    .da-tools-root .da-cta__inner {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem 2rem;
      justify-content: space-between;
    }

    .da-tools-root .da-cta__text {
      font-family: var(--font-lexend);
      font-weight: 600;
      font-size: clamp(1rem, 2.5vw, 1.35rem);
      color: var(--charcoal);
    }

    .da-tools-root .da-cta__link-wrap {
      display: flex;
      align-items: center;
      gap: 0.55rem;
    }

    .da-tools-root .da-cta__dot {
      display: inline-block;
      width: 7px;
      height: 7px;
      background: var(--pulse);
      border-radius: 50%;
      flex-shrink: 0;
    }

    .da-tools-root .da-cta__email {
      font-family: var(--font-mono);
      font-weight: 400;
      font-size: 0.9rem;
      color: var(--charcoal);
      text-decoration: underline;
      text-underline-offset: 3px;
      text-decoration-color: rgba(45,45,45,0.35);
      transition: color 0.2s ease, text-decoration-color 0.2s ease;
    }

    .da-tools-root .da-cta__email:hover {
      color: var(--pulse);
      text-decoration-color: var(--pulse);
    }

    /* SWAP: CTA — embed contact form below this strip or replace the email link */

    /* ══════════════════════════════════════════════
       7. FOOTER
    ══════════════════════════════════════════════ */
    .da-tools-root .da-footer {
      padding: 2rem 0;
    }

    .da-tools-root .da-footer__copy {
      font-family: var(--font-mono);
      font-weight: 400;
      font-size: 0.72rem;
      color: var(--charcoal);
      opacity: 0.5;
      letter-spacing: 0.03em;
    }

  </style>
</head>
<body>

<!-- ╔══════════════════════════════════════════════╗
     ║  DUDA WIDGET BOUNDARY — START                ║
     ║  Paste everything inside .da-tools-root into ║
     ║  a Duda HTML Widget for drop-in use.         ║
     ╚══════════════════════════════════════════════╝ -->

<div class="da-tools-root">

  <!-- ════════════════════════════════
       1. HEADER / NAV
  ════════════════════════════════ -->
  <header class="da-nav" role="banner">
    <div class="da-inner da-nav__inner">

      <!-- Logo -->
      <a href="/" class="da-nav__logo" aria-label="Digital Allies — Home">
        <span class="pulse-dot" aria-hidden="true"></span>
        <span class="da-nav__wordmark">Digital Allies</span>
      </a>

      <!-- Nav links -->
      <nav aria-label="Primary navigation">
        <ul class="da-nav__links" role="list">
          <li><a href="/about">About</a></li>
          <li><a href="/tools" aria-current="page">Tools</a></li>
          <li><a href="/field-notes">Field Notes</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>

    </div>
  </header>

  <!-- ════════════════════════════════
       2. BREADCRUMB
  ════════════════════════════════ -->
  <div class="da-breadcrumb">
    <div class="da-inner da-breadcrumb__inner">
      <nav aria-label="Breadcrumb">
        <a href="/">Home</a>
        <span class="da-breadcrumb__sep" aria-hidden="true"> / </span>
        <a href="/tools">Tools</a>
        <span class="da-breadcrumb__sep" aria-hidden="true"> / </span>
        <span class="da-breadcrumb__current" aria-current="page">All</span>
      </nav>
    </div>
  </div>

  <!-- ════════════════════════════════
       3. HERO SECTION
  ════════════════════════════════ -->
  <section class="da-hero" aria-labelledby="da-hero-heading">
    <div class="da-inner da-hero__inner">

      <!-- Symmetry break dot (decorative) -->
      <span class="da-hero__signal-dot" aria-hidden="true"></span>

      <!-- Eyebrow -->
      <p class="da-hero__eyebrow" aria-hidden="true">From the Workshop · 2026</p>

      <!-- Stacked headline — Paula Scher approach -->
      <h1 class="da-hero__headline" id="da-hero-heading">
        <span class="da-hero__line1">TOOLS</span>
        <span class="da-hero__line2">I <span class="da-hero__built">built.</span></span>
      </h1>

    </div>
  </section>

  <!-- ════════════════════════════════
       4. TOPOGRAPHIC DIVIDER
       Inline SVG: 4-6 nested contour curves,
       1px charcoal stroke, one Pulse Blue peak dot
  ════════════════════════════════ -->
  <div class="da-topo" role="presentation" aria-hidden="true">
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <!-- Contour line 1 — widest / lowest -->
      <path
        d="M0,90 C80,85 160,78 240,72 C320,66 380,58 460,52 C540,46 600,40 660,46 C720,52 780,60 860,65 C940,70 1020,75 1100,80 C1150,83 1175,86 1200,88 L1200,92 C1175,90 1150,87 1100,84 C1020,79 940,74 860,69 C780,64 720,56 660,50 C600,44 540,50 460,56 C380,62 320,70 240,76 C160,82 80,89 0,94 Z"
        fill="none" stroke="#2D2D2D" stroke-width="0.8" opacity="0.25"/>

      <!-- Contour line 2 -->
      <path
        d="M0,75 C80,68 160,60 260,54 C340,49 400,42 480,36 C555,30 610,24 670,30 C730,36 790,46 870,52 C950,58 1040,64 1120,70 C1155,73 1178,76 1200,78"
        fill="none" stroke="#2D2D2D" stroke-width="0.8" opacity="0.3"/>

      <!-- Contour line 3 -->
      <path
        d="M0,58 C90,50 180,42 280,36 C360,31 420,24 500,18 C570,13 625,8 680,14 C735,20 795,32 875,39 C960,46 1055,53 1135,59 C1165,62 1185,65 1200,67"
        fill="none" stroke="#2D2D2D" stroke-width="0.8" opacity="0.35"/>

      <!-- Contour line 4 — near peak -->
      <path
        d="M160,38 C220,30 300,20 380,14 C440,9 500,4 560,2 C610,-1 650,2 690,8 C740,16 790,26 855,33 C920,40 990,46 1060,52"
        fill="none" stroke="#2D2D2D" stroke-width="0.8" opacity="0.4"/>

      <!-- Contour line 5 — innermost / highest -->
      <path
        d="M300,24 C360,16 430,8 500,3 C540,0 570,-1 600,1 C630,3 660,8 700,14 C740,20 790,28 845,34"
        fill="none" stroke="#2D2D2D" stroke-width="0.8" opacity="0.45"/>

      <!-- Contour line 6 — peak ridge -->
      <path
        d="M420,14 C460,8 500,3 540,1 C560,0 580,0 600,2 C620,4 640,8 670,12 C700,16 730,20 760,24"
        fill="none" stroke="#2D2D2D" stroke-width="1" opacity="0.5"/>

      <!-- Pulse Blue dot at the highest peak -->
      <circle cx="600" cy="2" r="3.5" fill="#3A7BD5" opacity="0.9"/>
      <!-- Tiny ring around peak dot -->
      <circle cx="600" cy="2" r="6" fill="none" stroke="#3A7BD5" stroke-width="0.8" opacity="0.4"/>
    </svg>
  </div>

  <!-- ════════════════════════════════
       5. TOOLS GRID
  ════════════════════════════════ -->
  <section class="da-grid" aria-labelledby="da-grid-heading">
    <div class="da-inner">

      <!-- Visually hidden section heading for screen readers -->
      <h2 id="da-grid-heading" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;">
        All Tools
      </h2>

      <div class="da-grid__layout" role="list">

        <!-- ── CARD 01 · AUDIT ── -->
        <!-- DUDA WIDGET BOUNDARY: Each da-card can be a repeatable widget if needed -->
        <article class="da-card" role="listitem" aria-labelledby="tool-01-name">
          <span class="da-card__number" aria-hidden="true">01</span>
          <h3 class="da-card__name" id="tool-01-name">Audit</h3>
          <p class="da-card__desc">Find the gaps in 90 seconds. URL-driven SEO audit with structured reports.</p>
          <div class="da-card__divider" aria-hidden="true"></div>
          <p class="da-card__for-label">Who it's for</p>
          <p class="da-card__for-value">Small businesses checking if their site is findable</p>
          <p class="da-card__price">Free First Scan · $45 / Follow-Up</p>
          <!-- SWAP: SCREENSHOT — replace icon below with a tool screenshot thumbnail -->
          <!-- Abstract geometric icon: crosshair / target scan -->
          <svg class="da-card__icon" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
            <circle cx="16" cy="16" r="10" fill="none" stroke="#2D2D2D" stroke-width="1"/>
            <circle cx="16" cy="16" r="5.5" fill="none" stroke="#2D2D2D" stroke-width="1"/>
            <line x1="16" y1="4" x2="16" y2="9" stroke="#2D2D2D" stroke-width="1"/>
            <line x1="16" y1="23" x2="16" y2="28" stroke="#2D2D2D" stroke-width="1"/>
            <line x1="4" y1="16" x2="9" y2="16" stroke="#2D2D2D" stroke-width="1"/>
            <line x1="23" y1="16" x2="28" y2="16" stroke="#2D2D2D" stroke-width="1"/>
            <!-- Pulse Blue dot -->
            <circle cx="16" cy="16" r="2" fill="#3A7BD5"/>
          </svg>
        </article>

        <!-- ── CARD 02 · CMS ── -->
        <article class="da-card" role="listitem" aria-labelledby="tool-02-name">
          <span class="da-card__number" aria-hidden="true">02</span>
          <h3 class="da-card__name" id="tool-02-name">CMS</h3>
          <p class="da-card__desc">A clean content dashboard built for humans. Update without breaking.</p>
          <div class="da-card__divider" aria-hidden="true"></div>
          <p class="da-card__for-label">Who it's for</p>
          <p class="da-card__for-value">Businesses who want to update their site without breaking it</p>
          <p class="da-card__price">From $50 / Mo</p>
          <!-- SWAP: SCREENSHOT -->
          <!-- Abstract geometric icon: stacked layers / dashboard -->
          <svg class="da-card__icon" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
            <rect x="3" y="5" width="26" height="6" rx="1" fill="none" stroke="#2D2D2D" stroke-width="1"/>
            <rect x="3" y="14" width="16" height="5" rx="1" fill="none" stroke="#2D2D2D" stroke-width="1"/>
            <rect x="3" y="22" width="10" height="5" rx="1" fill="none" stroke="#2D2D2D" stroke-width="1"/>
            <!-- Pulse Blue dot -->
            <circle cx="27" cy="24.5" r="2.5" fill="#3A7BD5"/>
          </svg>
        </article>

        <!-- ── CARD 03 · MANUSCRIPT ── -->
        <article class="da-card" role="listitem" aria-labelledby="tool-03-name">
          <span class="da-card__number" aria-hidden="true">03</span>
          <h3 class="da-card__name" id="tool-03-name">Manuscript</h3>
          <p class="da-card__desc">A manuscript editor that remembers everything. Built for multi-book series.</p>
          <div class="da-card__divider" aria-hidden="true"></div>
          <p class="da-card__for-label">Who it's for</p>
          <p class="da-card__for-value">Independent authors working on multi-book projects</p>
          <p class="da-card__price">From $25 / Mo</p>
          <!-- SWAP: SCREENSHOT -->
          <!-- Abstract geometric icon: open book / document with spine -->
          <svg class="da-card__icon" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
            <path d="M16,6 C16,6 10,5 4,7 L4,27 C10,25 16,26 16,26 C16,26 22,25 28,27 L28,7 C22,5 16,6 16,6 Z" fill="none" stroke="#2D2D2D" stroke-width="1"/>
            <line x1="16" y1="6" x2="16" y2="26" stroke="#2D2D2D" stroke-width="1"/>
            <line x1="7" y1="11" x2="13" y2="11" stroke="#2D2D2D" stroke-width="0.8" opacity="0.6"/>
            <line x1="7" y1="15" x2="13" y2="15" stroke="#2D2D2D" stroke-width="0.8" opacity="0.6"/>
            <line x1="7" y1="19" x2="11" y2="19" stroke="#2D2D2D" stroke-width="0.8" opacity="0.6"/>
            <!-- Pulse Blue dot -->
            <circle cx="25" cy="12" r="2" fill="#3A7BD5"/>
          </svg>
        </article>

        <!-- ── CARD 04 · DISCOVERY ── -->
        <article class="da-card" role="listitem" aria-labelledby="tool-04-name">
          <span class="da-card__number" aria-hidden="true">04</span>
          <h3 class="da-card__name" id="tool-04-name">Discovery</h3>
          <p class="da-card__desc">From brief to brand board in one session. Logos, palette, type, mockups.</p>
          <div class="da-card__divider" aria-hidden="true"></div>
          <p class="da-card__for-label">Who it's for</p>
          <p class="da-card__for-value">Owners launching or refreshing a brand</p>
          <p class="da-card__price">From $475 Flat</p>
          <!-- SWAP: SCREENSHOT -->
          <!-- Abstract geometric icon: color palette / compass -->
          <svg class="da-card__icon" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
            <polygon points="16,3 29,27 3,27" fill="none" stroke="#2D2D2D" stroke-width="1"/>
            <line x1="16" y1="3" x2="16" y2="27" stroke="#2D2D2D" stroke-width="0.8" opacity="0.4"/>
            <line x1="3" y1="27" x2="29" y2="27" stroke="#2D2D2D" stroke-width="0.8" opacity="0.4"/>
            <line x1="9.5" y1="15" x2="22.5" y2="15" stroke="#2D2D2D" stroke-width="0.8" opacity="0.4"/>
            <!-- Pulse Blue dot at apex -->
            <circle cx="16" cy="3" r="2" fill="#3A7BD5"/>
          </svg>
        </article>

        <!-- ── CARD 05 · LEDGER ── -->
        <article class="da-card" role="listitem" aria-labelledby="tool-05-name">
          <span class="da-card__number" aria-hidden="true">05</span>
          <h3 class="da-card__name" id="tool-05-name">Ledger</h3>
          <p class="da-card__desc">Tasks. Expenses. Nothing else. The ops tool you'll actually use.</p>
          <div class="da-card__divider" aria-hidden="true"></div>
          <p class="da-card__for-label">Who it's for</p>
          <p class="da-card__for-value">Solo operators and tiny teams who outgrew spreadsheets</p>
          <p class="da-card__price">From $15 / Mo</p>
          <!-- SWAP: SCREENSHOT -->
          <!-- Abstract geometric icon: ledger / grid rows -->
          <svg class="da-card__icon" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
            <rect x="3" y="3" width="26" height="26" rx="1" fill="none" stroke="#2D2D2D" stroke-width="1"/>
            <line x1="3" y1="11" x2="29" y2="11" stroke="#2D2D2D" stroke-width="0.8"/>
            <line x1="3" y1="19" x2="29" y2="19" stroke="#2D2D2D" stroke-width="0.8"/>
            <line x1="12" y1="3" x2="12" y2="29" stroke="#2D2D2D" stroke-width="0.8"/>
            <!-- Pulse Blue dot -->
            <circle cx="20.5" cy="7" r="2" fill="#3A7BD5"/>
          </svg>
        </article>

        <!-- ── CARD 06 · REFRESH ── -->
        <article class="da-card" role="listitem" aria-labelledby="tool-06-name">
          <span class="da-card__number" aria-hidden="true">06</span>
          <h3 class="da-card__name" id="tool-06-name">Refresh</h3>
          <p class="da-card__desc">Five short sessions. Walk in fuzzy. Walk out with a brand-refresh brief.</p>
          <div class="da-card__divider" aria-hidden="true"></div>
          <p class="da-card__for-label">Who it's for</p>
          <p class="da-card__for-value">Established businesses that have drifted and need to realign</p>
          <p class="da-card__price">From $325 Flat</p>
          <!-- SWAP: SCREENSHOT -->
          <!-- Abstract geometric icon: circular refresh / cycle arrows -->
          <svg class="da-card__icon" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
            <path d="M27,16 A11,11 0 1,1 22.8,7.2" fill="none" stroke="#2D2D2D" stroke-width="1"/>
            <!-- Arrowhead -->
            <polyline points="22,3 23,8 28,7" fill="none" stroke="#2D2D2D" stroke-width="1" stroke-linejoin="round"/>
            <!-- Pulse Blue dot -->
            <circle cx="16" cy="16" r="2.5" fill="#3A7BD5"/>
          </svg>
        </article>

      </div><!-- /.da-grid__layout -->
    </div><!-- /.da-inner -->
  </section>

  <!-- ════════════════════════════════
       6. CTA STRIP
  ════════════════════════════════ -->
  <!-- SWAP: CTA — embed contact form below or replace mailto with a form trigger -->
  <!-- DUDA WIDGET BOUNDARY: This strip can be its own Duda widget row -->
  <aside class="da-cta" aria-label="Contact call to action">
    <div class="da-inner da-cta__inner">
      <p class="da-cta__text">Need something custom? Let's talk.</p>
      <div class="da-cta__link-wrap">
        <span class="da-cta__dot" aria-hidden="true"></span>
        <a href="mailto:contact@digitalallies.net" class="da-cta__email">
          contact@digitalallies.net
        </a>
      </div>
    </div>
  </aside>

  <!-- ════════════════════════════════
       7. FOOTER
  ════════════════════════════════ -->
  <footer class="da-footer" role="contentinfo">
    <div class="da-inner">
      <p class="da-footer__copy">© 2026 Digital Allies · Kingman, AZ · digitalallies.net</p>
    </div>
  </footer>

</div><!-- /.da-tools-root -->

<!-- ╔══════════════════════════════════════════════╗
     ║  DUDA WIDGET BOUNDARY — END                  ║
     ╚══════════════════════════════════════════════╝ -->

</body>
</html>
