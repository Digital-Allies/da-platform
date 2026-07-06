# Atomic Finds — Design Reference (CLAUDE.md)

Vintage rattan furniture e-commerce (Fran & Mabel). Dark-mode, celestial-70s aesthetic.

## Colors
- Background: `#1E1E1E` (Deep Charcoal)
- Surface/cards: `#2A2017` (Rattan Black)
- Primary accent: `#F5C842` (Celestial Yellow)
- Secondary accent: `#D4822A` (Amber Orange)
- Text: `#F0E8D8` (Bone White)
- Muted accent: `#556B4A` (Woven Moss, for eco tags)

## Type
- Headings (H1/H3/display): **Lilita One**
- H2 / script accents: **Tilda Script** (never combine with another script face)
- Body/UI: **DM Sans**
- Scale: Display 88px, H1 64px, H2 48px, H3 22px, Body 16px, Small 14px, Label 12px

## Shape & Effects
- Radius: 6 / 12 / 18 / 24px, pills at 999px. Never square corners.
- Shadows are **glows**, not drops: sm `0 0 8px rgba(245,200,66,.35)`, md `0 0 16px rgba(245,200,66,.5)`, lg `0 0 30px rgba(245,200,66,.6)`.
- Borders: 1px `rgba(245,200,66,.15)` default, 2px solid `#F5C842` on hover/focus.

## Spacing
4px base scale (4,8,12,16,20,24,32,40,48,64,80,120). Section padding 120px vertical / 48px horizontal. Max width 1280px (820px prose).

## Motion
Easing `cubic-bezier(0.16,1,0.3,1)`. Durations 180/300/600ms. Cards lift 6px + glow intensifies on hover. Respect `prefers-reduced-motion`.

## Voice
Warm, authentic, expert-but-approachable — like two friends who know their stuff.
- Say: "Handpicked," "Restored," "1970s," "Mid-century," specific piece names.
- Avoid: "Pre-owned," "Refurbished," "Retro period," generic corporate terms.
- Buttons in square brackets: `[ Explore Collection ]`, `[ Schedule Viewing ]`.
- Sentence case headers; ALL CAPS eyebrows/labels; no emoji.

## Key Components
- **Button**: pill radius, solid yellow primary or outlined amber secondary, DM Sans 14px/700/uppercase.
- **Card**: `#2A2017` bg, 1px gold border, 18px radius, lifts 6px + glows on hover.
- **Galaxy Card** (signature): orbital ring around product card w/ orbiting moon, nebula background, amber price pill.
- **Badge**: pill, DM Sans 11px/700/uppercase — variants: In Stock (gold), Featured (amber), Out of Stock (outline), Eco (moss).

## Source
Full system: project `29110ac3-0a76-4fa1-a322-a78bc212a50d` (tokens, components, guidelines, UI kit).
