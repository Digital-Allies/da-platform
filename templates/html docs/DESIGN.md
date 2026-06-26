---
name: Healthcare Training Center
colors:
  surface: '#f7f9fc'
  surface-dim: '#d8dadd'
  surface-bright: '#f7f9fc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f7'
  surface-container: '#eceef1'
  surface-container-high: '#e6e8eb'
  surface-container-highest: '#e0e3e6'
  on-surface: '#191c1e'
  on-surface-variant: '#44474f'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f4'
  outline: '#747780'
  outline-variant: '#c4c6d1'
  surface-tint: '#445d94'
  primary: '#002357'
  on-primary: '#ffffff'
  primary-container: '#1e3a6e'
  on-primary-container: '#8ca5e0'
  inverse-primary: '#aec6ff'
  secondary: '#00677d'
  on-secondary: '#ffffff'
  secondary-container: '#88e1fd'
  on-secondary-container: '#006479'
  tertiary: '#262623'
  on-tertiary: '#ffffff'
  tertiary-container: '#3c3c39'
  on-tertiary-container: '#a8a6a2'
  error: '#DC3545'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#aec6ff'
  on-primary-fixed: '#001a43'
  on-primary-fixed-variant: '#2b467a'
  secondary-fixed: '#b3ebff'
  secondary-fixed-dim: '#79d3ef'
  on-secondary-fixed: '#001f27'
  on-secondary-fixed-variant: '#004e5f'
  tertiary-fixed: '#e5e2dd'
  tertiary-fixed-dim: '#c8c6c2'
  on-tertiary-fixed: '#1c1c19'
  on-tertiary-fixed-variant: '#474743'
  background: '#f7f9fc'
  on-background: '#191c1e'
  surface-variant: '#e0e3e6'
  room-cs: '#3B7DD8'
  room-hipaa: '#2BA89A'
  room-compliance: '#2EAA6E'
  room-records: '#7B5EA7'
  room-finance: '#D4A017'
  success: '#28A745'
  warning: '#FFC107'
  info: '#17A2B8'
  border-muted: '#D0D8E8'
  ink-primary: '#16243D'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.01em
  headline-h1:
    fontFamily: Montserrat
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.01em
  headline-h2:
    fontFamily: Montserrat
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
  headline-h3:
    fontFamily: Montserrat
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 26px
  headline-h4:
    fontFamily: Montserrat
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 22px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-base:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.06em
  ui-text:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  accent-serif:
    fontFamily: Playfair Display
    fontSize: 19px
    fontWeight: '600'
    lineHeight: 28px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  space-1: 4px
  space-2: 8px
  space-3: 12px
  space-4: 16px
  space-5: 24px
  space-6: 32px
  space-7: 48px
  space-8: 64px
  space-9: 96px
  content-max: 1280px
---

## Brand & Style

The design system is a high-fidelity, spatial educational portal built on a "virtual building" metaphor. The brand personality balances **Credentialed Authority** (evoking expertise, security, and medical rigor) with **Patient-Centered Warmth** (evoking empathy and accessibility). It is designed to empower healthcare professionals by creating an immersive, human-first environment that avoids the sterile coldness of traditional clinical software.

The visual style is a sophisticated blend of **Corporate Modern** and **Tactile Minimalism**. It utilizes isometric "room" illustrations to represent training tracks, creating a storefront-inspired lobby that serves as the primary navigation hub. Key emotional drivers include a sense of progression ("Step Inside. Step Up."), professional trust, and contextual focus.

## Colors

The palette is anchored by **Credentialed Navy**, representing authority and trust, and **Action Teal**, used for interactive elements and primary CTAs. The background defaults to a **Cool Clinical Gray** to provide a clean canvas, while a **Warm Compassion Cream** is available as a tertiary surface to inject organic comfort into administrative layouts.

A distinctive feature of this design system is the **Training Room Accent Identity System**. Each training track is assigned a specific functional color (e.g., Emerald for Compliance, Indigo for Medical Records). When a user enters a specific training "room," the interface dynamically recolors interactive elements, progress tracks, and banners to match that room's identity, providing a strong sense of place.

## Typography

The typography strategy uses three distinct font families to balance structure and readability:
- **Montserrat** is the display face, providing a geometric and authoritative structure for all headings and UI titles.
- **Inter** is the primary workhorse for body copy and UI labels, chosen for its high legibility in clinical and data-heavy contexts.
- **Playfair Display** (accent-serif) is reserved for formal elements such as clinical certificates, badges, or patient-voice testimonials to add an elegant, traditional touch.

Line heights are tightly controlled at 1.2 for headings to maintain a compact, structured look, while body copy utilizes a generous 1.6 ratio to ensure comfort during long reading sessions.

## Layout & Spacing

This design system employs a **fixed grid** approach for core content to ensure optimal reading spans, restricted to a maximum width of 1280px. The spacing logic follows a strict 8px base grid to maintain a consistent rhythmic pulse throughout the application.

- **The Lobby:** A 3-column fluid grid for desktop, collapsing to 2-columns on tablets and 1-column on mobile.
- **Training Rooms:** A 2-column layout with a primary content rail and a 300px sticky sidebar for course metadata.
- **Lesson Player:** A 3-column layout featuring a navigation rail (232px), the core lesson view (1fr), and a notes sidebar (296px).

Mobile adaptations include a transition to a single-column reflow and the introduction of a 52px sticky bottom navigation bar to accommodate touch targets for clinical environments.

## Elevation & Depth

The design uses depth to reinforce the **"Storefront" metaphor**. Interactive cards and training rooms exist as physical layers on the clinical canvas.

- **Tonal Layering:** The primary page background is sunken, while interactive containers and cards use pure white surfaces to signify they can be engaged with.
- **Ambient Shadows:** Standard cards use a subtle `shadow-sm` (8% opacity). Upon hover, cards escalate to `shadow-md` with a faint navy tint to simulate physical lift.
- **Isometric Perspective:** The most distinctive depth interaction is the **Perspective Pop-Out**. When a storefront is selected, the background dims and the chosen track "pops" forward using a CSS perspective transform (`perspective(900px) rotateY(-8deg) rotateX(3deg)`), creating a high-fidelity 3D effect that signals entry into a focused training module.

## Shapes

The shape language is consistently **Rounded**, using an 8px base radius (`radius-md`) to ensure the interface feels approachable and modern rather than clinical or sharp. Larger components like Training Room Cards and Hero Panels utilize `radius-lg` (16px) or `radius-xl` (24px) to emphasize their role as primary containers within the spatial environment. Avatars, status pills, and progress tracks use fully rounded ("pill") edges.

## Components

- **Buttons:** All buttons use 8px rounding. Primary buttons use Credentialed Navy. Track-specific buttons adapt their color to the active room track. Hover states utilize a subtle brightness filter change.
- **Isometric Hotspots:** These are invisible interactive boundaries over artwork. On hover, they trigger a "glow ring" effect using the track's accent color and reveal a floating pill label above the storefront awning.
- **Room Cards:** Feature a 104px tall header band in the track's accent color. They include a status badge (room number or completion checkmark) and use 16px corner radii.
- **Lesson Player:** Strictly follows a 16:9 aspect ratio. It features a large, centralized play button that scales 6% on hover and uses high-contrast overlays for closed captions.
- **Quiz Assessment:** Options are presented as large selectable cards (80px height) with 8px rounding. Selected states are indicated by a 2px track-colored border and a subtle tint fill.
- **Progress Bars:** Tracks use the `border-muted` color, while the fill is dynamically set to the active room's accent color. All bars are pill-shaped.
- **Inputs & Textareas:** Use clinical gray backgrounds with thin borders, transitioning to a teal focus ring with a soft glow upon selection.