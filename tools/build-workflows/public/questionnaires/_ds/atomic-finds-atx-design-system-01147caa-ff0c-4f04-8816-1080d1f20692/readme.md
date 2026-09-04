# Atomic Finds ATX — Design System

**Atomic Finds ATX** is an Austin, TX vintage furniture brand ("Tiny Time Machines for Your Home") curating hand-selected 60s/70s rattan, bamboo and atomic-age pieces. It sells through Instagram (brand/storytelling) and Facebook Marketplace (conversion), and is building toward an "Atomic Showroom" website where a real home doubles as a styled showroom.

The world has three characters: **Nacho** (the dog mascot/site guide — curious, warm, always in-frame with the furniture, never upstaging it), the **Atomic Inspection Team** (four alien "curators" — Daisy, Milo, Tatiana, Malibu — who appear on stamps, tags and cards as a supporting cameo, never the lead visual), and every sold piece is named (Orbit, Agnes, Miami…) and sent home with a collectible **Atomic Find Card / Time Traveler's Record**.

## Sources this system was built from

- `atomic finds assets/` — an attached local folder: logo concepts, Nacho + Inspection Team illustrations, the Mamba display font, the Inspection Team stamp brief, product photos, and two PDFs (`Atomic_Finds_ATX_Brand_Bible_V1.pdf`, `Atomic_Finds_ATX_Website_Creative_Brief_Anthony.pdf`).
- `uploads/🪐 The Atomic Inspection Team_ Official Stamps.md` — stamp/tag concepts and generation prompts for the Inspection Team.
- No Figma file, GitHub repo, or existing website codebase was provided — there is no live product UI to recreate yet. Everything here is original synthesis from the brand-guideline materials above, built as a from-scratch design system.

## Components (Intentional additions)

No component library source was provided (brand-guidelines-only run), so a small standard set was authored, sized to what the brand's touchpoints actually need:

- **Button** (`components/core`) — primary/secondary/ghost CTA.
- **Tag** (`components/core`) — era/material/status pill.
- **InspectionStamp** (`components/feedback`) — alien-inspector approval badge.
- **ProductCard** (`components/cards`) — named-piece shop listing.
- **CuratorCard** (`components/cards`) — curator bio card.

## Templates (`templates/`)

Ready-to-copy starting points for the brand's recurring outputs:

- `atomic-find-card/` — the two-sided Time Traveler's Record given with every sold piece.
- `instagram-new-arrival/` — square "Meet [Piece]" new-arrival post.
- `instagram-meet-the-piece/` — square curator-spotlight post.
- `business-card/` — two-sided card, primary logo front / contact info back.
- `record-of-passage/` — the invoice/packing slip, styled as a "Transaction Log" rather than a bare receipt.
- `email-welcome/` — the "Welcome to the Family" post-purchase email, in Nacho's voice.
- `email-signature/` — compact staff email signature block: name + business (Mamba, one line), Pacifico-script tagline, and avocado-green Facebook/Instagram/Google Business/website icon links. **Known limitation:** Gmail's signature field doesn't reliably preserve pasted HTML formatting, custom fonts, or linked images — copy-pasting the rendered signature into Gmail can come through with broken layout and missing photo. For a Gmail-safe signature, export the signature as a single flattened image (e.g. a screenshot/PNG of the standalone file) instead of pasting live HTML; a code-friendly email client (or an email signature management tool) is the fix if rich HTML/live links are required.
- `email-product-announcement/` — new-arrivals marketing email (photo + 2-3 pieces + CTA).
- `email-blog-post/` — longer-form newsletter email for showroom stories/styling features.

Not yet built (flagged for the user): Google Business Profile update, Facebook Marketplace listing cover.

**Primary logo:** of the 7 logo concepts found in the source material (see the "Logo Concepts — For Client Review" card), **Concept 1** — the cream rounded-badge lockup with the orange dot-pattern boomerang — is used as the primary mark across all templates. All 7 are kept on file for comparison.

## Foundations

- `tokens/colors.css`, `tokens/typography.css`, `tokens/spacing.css` → imported by root `styles.css`.
- `guidelines/colors`, `guidelines/type`, `guidelines/spacing`, `guidelines/brand` — specimen cards visible in the Design System tab.
- `assets/` — logos, Nacho art, Inspection Team stamps/cards, stickers, one reference product photo.

## Content fundamentals

**Voice:** warm, curious, witty, colorful, never corporate or overly precious. First person plural ("we curate"), talking directly to the visitor ("you"). Short, plain sentences; occasional long breathy one ("Where Vintage Meets Digital"). No emoji in body copy — the 🛸/🪐/👽/🐶 emoji show up only as internal section markers in planning docs, not on customer-facing surfaces.

**Naming, not describing:** every piece gets a person's name (Orbit, Agnes, Miami) instead of a SKU-style title. Copy treats a sale like an adoption: "ready to adopt," "found a new home," "next chapter."

**Character voices:**
- *Nacho* — curious and observational, comments on pieces like a companion, not a salesperson.
- *The Inspection Team* — mysterious, deadpan-official. They "sign off" on inspections in a mock-bureaucratic voice: "PASSED," "APPROVED FOR TIME TRAVEL," "Inspected & Approved." Four distinct curator personalities layer under this (see `Atomic_Finds_The_Curators_Four.md`-derived bios in `CuratorCard` examples): Daisy (laid-back), Milo (detail nerd), Tatiana (bold), Malibu (host).

**Example lines actually used in the source material:**
- "Tiny Time Machines for Your Home" (tagline, always present)
- "Found Across Time + Space"
- "This tiny time machine has found a new home."
- "Restored with love in Austin, TX."
- "Far-out finds, down-to-earth prices."

## Visual foundations

- **Color:** warm cream base (`--cream-100`) with burnt orange as the dominant accent, avocado + olive-teal as secondary greens, mustard as a warm highlight. Pink is a minor accent only — never a base or headline color. Max two background colors per composition (cream + one accent block), per the brand's "not cluttered" rule.
- **Type:** Mamba (bold, groovy 1970s display) for logo/headlines; Pacifico (playful script) for taglines and curator quotes; Poppins for all body copy and UI text. Headlines are large and confident; body stays plain and legible — the personality lives in the display/script pairing, not in the body font.
- **Backgrounds:** flat color blocks or full-bleed warm, sunlit photography of real rooms (the Atomic Showroom concept) — no gradients, no stock-photo gloss, no busy patterns. A single starburst/atomic-ring motif is the one recurring background decoration, used sparingly (corner or behind a headline, never tiled).
- **Illustration:** hand-drawn/flat-vector 1970s style for Nacho and the Inspection Team — warm muted fills, clean outlines, no photoreal rendering.
- **Cards:** thick ink border (2–3px), moderate rounded corners (14–24px), and a flat offset "stamp" shadow (`--shadow-card`: solid ink offset, no blur) rather than a soft drop shadow — this echoes the vintage ticket-stub/postcard look of the source stamp art. Dashed dividers inside cards (like a form to fill in) reinforce the "record/ticket" feel.
- **Buttons:** pill-shaped, heavy ink outline, solid fill (no gradients); hover = darker shade + slight lift, no glow/scale effects.
- **Corners:** generous but not full-pill on cards (14–24px); pills reserved for buttons/tags/badges.
- **Animation:** not defined by the source material — kept minimal and functional (hover darken + 1px lift) rather than invented; ask the user if bouncier motion fits Nacho's personality.
- **Imagery color mood:** warm, sunlit, slightly grainy real-home photography (see `assets/product-photos`) — never cool-toned, never studio-white.
- **Transparency/blur:** not used — flat, opaque surfaces throughout, consistent with the flat-vector illustration style.

## Iconography

No icon system, icon font, or SVG icon set was found in the source material. The brand's "icons" are hand-drawn illustration assets (Nacho, the Inspection Team, starburst/atomic-ring motifs) rather than a UI icon set — treat any future UI icon need as an open question rather than inventing a system. No emoji are used in customer-facing copy (the 🛸🪐👽 in planning docs are internal only). No Unicode glyphs are used as icons in the source; the ✓ checkmark on the Atomic Find Card is the one exception, used as plain punctuation.

## Standalone downloads

Every template folder now also has a `<Name>-standalone.html` file alongside its `.dc.html` (e.g. `templates/email-signature/EmailSignature-standalone.html`). Templates live inside the design system and depend on it — relative paths to `assets/`, `styles.css`/`_ds_bundle.js` (for tokens and any `x-import`ed components), and shared fonts. That works fine in the Design System tab, but a `.dc.html` downloaded on its own (e.g. via drag-out or file export) loses that surrounding project and renders broken: missing images, fallback fonts, no color tokens.

The `-standalone.html` files fix that: everything the template needs — images, the Mamba font, all styles and scripts — is bundled and embedded into one offline-ready file. Hand those out (email attachment, download link, paste into another tool) instead of the raw `.dc.html`. They're generated artifacts — regenerate a `-standalone.html` from its `.dc.html` after editing the template rather than editing the standalone file directly.

## Index

- `styles.css` — root stylesheet, imports everything in `tokens/`.
- `tokens/` — colors, typography, spacing custom properties.
- `guidelines/colors`, `guidelines/type`, `guidelines/spacing`, `guidelines/brand` — Design System tab specimen cards.
- `components/core` — Button, Tag.
- `components/feedback` — InspectionStamp.
- `components/cards` — ProductCard, CuratorCard.
- `templates/` — Atomic Find Card, Instagram New Arrival, Instagram Meet the Piece, Business Card, Record of Passage (invoice), Welcome Email, Email Signature, Product Announcement Email, Blog/Story Email.
- `assets/` — logos (7 concepts + primary pick), fonts (Mamba.otf; Pacifico loaded from Google Fonts), Nacho art, Inspection Team art/stamps, stickers, product photos.
- `SKILL.md` — portable skill file for using this system in Claude Code.

## Caveats

- Gmail signatures: see the `email-signature/` note above — Gmail strips/mangles pasted rich HTML. Treat the email signature template as an image-export source, not a paste-in-as-HTML asset, unless the sender's email client supports real HTML signatures.

- 14 product photos in the source folder are `.heic` files, which this environment can't decode/convert — only the `.jpeg`/`.png` product photos made it into `assets/product-photos`. Export those as JPEG/PNG if you'd like them added.
- No production codebase or Figma file was provided, so components/templates are original work sized to the brand brief, not a recreation of an existing UI."}]
