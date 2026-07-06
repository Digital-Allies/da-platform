# Marketing Site — UI Kit

A high-fidelity recreation of the **public marketing site** — the front door before
login. Open `index.html`; it scrolls as a full landing page with working in-page anchors.

## Sections (top → bottom)
- **SiteNav** — sticky blurred nav, logo, links, Log In + Start Free Trial.
- **Hero** — "Step Inside. Step Up." headline on navy, dual CTAs, proof stats.
- **TracksRow** — the 5 training rooms as a card row (color-coded by room).
- **StorySection** — the founder's "Built by a lawyer. Designed for people." story
  with a pull-quote panel.
- **AudienceSplit** — two paths: For Organizations / For Individuals.
- **FeatureGrid** — six platform features on a navy band.
- **Pricing** — Individual vs Organization plans (org highlighted).
- **SiteFooter** — brand, nav columns, legal line.

## Files
- `sections.jsx` — all section components (exported to `window`).
- `kit.css` — marketing styling on top of the root `colors_and_type.css` tokens.

## Notes
- Icons are the self-hosted Phosphor font; page background is the canonical `#F4F6F9`.
- Faithful to `uploads/design-system-spec.md` §8.1 (Marketing / Landing Page). Copy is
  drawn from the brand's tagline bank — warm, second-person, no emoji.
- A recreation, not production code: links are anchors/placeholders.
