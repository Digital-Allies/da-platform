# Digital Allies — Website UI Kit

A high-fidelity recreation of the `digitalallies.net` marketing site, split into reusable JSX components.

Open `index.html` to see the click-through demo. Each component lives in its own `.jsx` file and is loaded into the demo via Babel-standalone.

## Structure

- `index.html` — full-page composition: nav → hero → jargon jar → departments → diagrams → pricing → reliability → field notes → footer.
- `Nav.jsx` — sticky bar: pulse-dot lockup, link row, EN | ES toggle.
- `Hero.jsx` — "The Lobby." Eyebrow, display headline, pinned-note quote, bracketed CTAs.
- `JargonJar.jsx` — flip-card grid (corporate ↔ DA translation).
- `Departments.jsx` — 4-up grid of named bureaus, with hover wash + artifact icons.
- `Diagrams.jsx` — collapsible accordion with rotating `+` glyphs.
- `Pricing.jsx` — *The Transparency Table* — Free / Paid two-column.
- `Reliability.jsx` — three "moat" cards (Local · No-Ghosting · Direct Line).
- `FieldNotes.jsx` — testimonial row, three pinned-yellow notes.
- `Footer.jsx` — *The Command Center* — form on left, address on right.
- `Primitives.jsx` — shared atoms (`PulseDot`, `Button`, `PinnedNote`, `Eyebrow`).

## How components are exported

Each file ends with `Object.assign(window, { ComponentName })` so the demo can compose them in a single root render.

## How the kit cuts corners

It is a visual recreation, not production code: the language toggle is cosmetic, the form is non-submitting, and the symmetry-break button is illustrative. Real interactions are mocked at the visual layer only.
