# Digital Allies — Design Reference (CLAUDE.md)

One-person tech consultancy (Anthony, Kingman AZ). Ruled-paper, museum-cardstock, 1960s research-manual meets modern minimal-tech.

## Colors — 95/5 rule (95% neutral, 5% accent; never stack accents)
- Canvas: `#F9F6F0` (Bone White)
- Text/borders: `#2D2D2D` (Charcoal Grey)
- Link/live state: `#3A7BD5` (Pulse Blue)
- Hover wash: `#FADEEB` (Light Pink)
- Primary CTA/signal: `#C5301A` (Signal Red / Anderson Vermillion)
- Quote/testimonial bg: `#FCFAED` (Pinned-note Yellow)

## Type
- Headers/eyebrows/CTAs: **Lexend Deca** (400–700)
- Body/prices/tables/system text: **JetBrains Mono**
- Body 14px, generous line-height 1.55–1.7. Display ~64px.

## Shape & Layout
- **Square corners** (`border-radius: 0`) — only exceptions: pulse dot (circle) and inputs (2px).
- Structural border: 1px solid `#2D2D2D` on containers.
- **Technical Lace grid**: 20px ruled background grid, 0.5px charcoal line at 7% opacity, visible everywhere.
- Spacing: 4px sub-units, sections `py-20` (80px). Max width 1024px prose / 1280px grid.
- Symmetry Break: strict grid, then nudge ONE red accent 5–10px off-center. Never break symmetry with blue/pink.

## Motion
Calm only. Pulse dot breathes (3s) + rings (2.2s). Hover lift `translateY(-6px)` over 300–400ms, `cubic-bezier(0.16,1,0.3,1)`. No bounce/parallax/scroll-jacking.

## Voice
First-person singular ("I"), direct address ("you"). Sentence case headlines; Title Case for named constructs (Departments, Bureau). Eyebrows UPPERCASE TRACKED with `·` middots. CTAs in square brackets: `[ Inquire Within ]`. No emoji.

**Proprietary nouns — use these, don't invent new ones:**
- Services overview → The Departments
- Design → The Design Bureau · Integrations → Dept. of Cooperation
- Automation → The Self-Governing Bureau · Support → The Permanent Observation Post
- Pricing table → The Transparency Table · Hero → The Lobby
- Contact form → Send a Transmission / The Command Center

Tone: 65% casual, 55% dry, 70% plain, 75% confident, 100% authentic.

## Iconography
Primary: 6 hand-drawn 1px line-art "Artifact Icons" (topo, rotary phone, metronome, engine, compass, Route 66) — abstract tech shapes (clouds/gears) are forbidden. Fallback: Lucide Icons (CDN), then Heroicons outline.

## Key Components
- Flat cards: bone-white bg, charcoal border, no rounded+shadow+colored-border combo.
- Pinned-note pattern: yellow bg, red 4px left-border, red dot pin (used for quotes/testimonials).
- Dashed price rows (`border-bottom: 1px dashed`).
- Focus ring: `0 0 0 2px rgba(58,123,213,.15)` + blue border. Never default outline.

## Source
Full system: project `6119845f-97e8-4b42-899f-193545fca758`. Live site: digitalallies.net. GitHub: Digital-Allies/DigitalAllies, Digital-Allies/design-system.
