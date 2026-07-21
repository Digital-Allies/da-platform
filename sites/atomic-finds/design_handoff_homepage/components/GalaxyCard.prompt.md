# Galaxy Card

Featured product display with rotating orbital ring, orbiting moon, and twinkling stars.

## Usage

```jsx
<GalaxyCard
  title="Peacock Chair"
  script="vintage find"
  desc="1970s iconic piece, restored"
  price={1450}
  image="../assets/products/product-peacock-chair-02.png"
  bg="../assets/patterns/nebula-ochre.webp"
/>
```

## Features

- **Rotating ring** — glows and rotates continuously (25s) around the card
- **Orbiting teal moon** — passes behind the card up top, in front along the bottom
- **Static stars** — three glowing points set on the ring
- **Galaxy background** — nebula wash behind the card via `bg`, under a dark scrim
- **Price & orbit icon** — gold price pill with the lucide orbit glyph
- **Script tagline** — cursive amber text between title and description
- **Detail dialog** — click to open image + specs + Add to Cart

## Props

- `title` — Product name (default: "Piece")
- `script` — Cursive tagline (default: "find")
- `desc` — Product description
- `price` — Price in dollars (default: 0)
- `image` — Image URL (product photo or alien character)
- `imageBg` — Image-well background color (default: #2D2D2D)
- `bg` — Galaxy nebula/pattern URL washed behind the card body
