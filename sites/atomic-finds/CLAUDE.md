# Atomic Finds ATX — Design Reference (CLAUDE.md)

Vintage rattan & bamboo furniture, restored in Austin by Jennyfer Gomez. Dark-mode, celestial-70s aesthetic. **E-commerce-ready storefront with a flexible conversion layer** — sales complete off-site today (Facebook Marketplace, direct payment, inquiry); never assume native checkout or a specific payment provider.

> Synced 2026-07-21 from the Claude Design project handoffs in
> `design_handoff_homepage/` + `design_handoff_product_grid/` (tokens are the
> source of truth: `design_handoff_homepage/tokens/*.css`). This file supersedes
> the earlier Lilita One/Tilda Script system.

## Colors
- Background: `#1E1E1E` (Deep Charcoal); alt `#181613`; hero stops `#211C14`/`#16140F`
- Surface/cards: `#2A2017` (Rattan Black); card gradient `#23201B → #1B1916`; inset `#14120E`
- Primary accent: `#F5C842` (Celestial Yellow)
- Secondary accent: `#D4822A` (Amber Orange)
- Text: `#F0E8D8` (Bone White); body `#D9CFBF`; muted `#9A8F7D`; soft `#6A6052`
- Muted accent: `#556B4A` (Woven Moss, eco tags); rattan tan `#C4956A`; Austin clay `#C1502E` (sparingly)

## Type
- Display/H1/H3/card titles/prices: **Bagel Fat One** (self-hosted TTF in the handoff `fonts/`; also Google-hosted)
- H2 / script accents: **Pacifico** (Google) — the ONE script face, never stack with another decorative face. (Tilda Script is dead: only available copy was a watermarked trial build.)
- Rare expressive one-offs: **Agbalumo** (self-hosted; not used by default)
- Body/UI: **DM Sans**
- Scale (clamped): Display 48–88px, H1 38–64px, H2 30–48px, H3 22px, Body 16px, Small 14px, Label 12px

## Shape & Effects
- Radius: 6 / 12 / 18 / 24px, pills at 999px. Never square corners.
- Shadows are **glows**, not drops: sm `0 0 8px rgba(245,200,66,.35)`, md `0 0 16px rgba(245,200,66,.5)`, lg `0 0 30px rgba(245,200,66,.6)`, amber `0 0 12px rgba(212,130,42,.55)`.
- Borders: 1px `rgba(245,200,66,.15)` default, 2px solid `#F5C842` on hover/focus.
- Starfield background utility (`.af-starfield`) — twinkling star dots over the hero gradient.

## Spacing
4px base scale (4,8,12,16,20,24,32,40,48,64,80,120). Section padding 120px vertical / 48px horizontal. Max width 1280px (820px prose).

## Motion
Easing `cubic-bezier(0.16,1,0.3,1)`. Durations 180/300/600ms. Cards lift 6px + glow intensifies on hover. Respect `prefers-reduced-motion`.

## Voice
Warm, authentic, expert-but-approachable.
- Say: "Handpicked," "Restored," "1970s," "Mid-century," specific piece names.
- Avoid: "Pre-owned," "Refurbished," "Retro period," generic corporate terms.
- Buttons in square brackets: `[ Shop the Collection ]`, `[ Get in Touch ]`.
- Sentence case headers; ALL CAPS eyebrows/labels; no emoji.
- Tagline lockup: "where vintage meets digital."

## Commerce rules (Anthony, 2026-07-21)
- CTAs never hard-code "Buy Now" — per-product selling states. Approved directions: View Listing / Show Interest / Claim Me / Ask About This Item / Get in Touch / Purchase Options / Message to Buy.
- Product detail = **quick-view modal**, not separate product pages (for now).
- Cart-capable foundation; checkout provider undecided — provider-agnostic language ("checkout provider," "payment platform," "purchase flow").
- `products.external_url` carries the outbound target (Marketplace listing today, checkout link later — same field).

## Key Components (see `design_handoff_*/components/`)
- **Button**: pill radius, solid yellow primary or outlined amber secondary, DM Sans 14px/700/uppercase.
- **Card**: card-gradient bg, 1px gold border, 18px radius, lifts 6px + glows on hover.
- **Galaxy Card** (signature): tilted 3D orbital ring + orbiting moon around a featured product, nebula wash background, detail dialog.
- **ProductCard / ProductGrid**: renders live `products` rows 1:1 — null `image_url` → "Photo coming soon" fallback (launch state); `price` null → "Inquire"; `original_price` set → Sale badge + strikethrough; 2-line title clamp; `View Listing →` CTA to `external_url`.
- **Badge**: pill, DM Sans 11px/700/uppercase — variants: In Stock (gold), Featured (amber), Out of Stock (outline), Eco (moss).
- **The Curators** (mascots): Daisy (Laid-Back Tastemaker), Milo (Detail Nerd), Tatiana (The Bold One), Malibu (Host With the Most).

## Source
Full system: Claude Design project `29110ac3-0a76-4fa1-a322-a78bc212a50d` ("Atomic Finds ATX - Design System") — readable via the DesignSync tool. Repo handoffs: `design_handoff_homepage/` (full homepage + brand system) and `design_handoff_product_grid/` (ProductCard/ProductGrid spec vs the live schema).
