# ProductCard / ProductGrid

Renders the live Supabase `products` table (see `da-platform` PR #1) with no schema translation — pass rows straight from `getProducts()`.

## Usage

```jsx
import { ProductGrid } from './ProductGrid.jsx';

<ProductGrid title={block.data.title || 'Featured Finds'} products={products} />
```

## Wiring notes (visual element → `products` column)

- Image → `image_url`; `null` renders the "Photo coming soon" fallback (the launch state, not an edge case — never a broken-image box).
- Condition tag (top-left) → `condition`.
- "Sale" badge (top-right) → shown when `original_price` is set.
- Title → `title`, clamped to 2 lines.
- Meta line → `location` + `listed_label`, joined, displayed as-is (never parsed).
- Attribute chips → up to 3 entries from `attributes` (free-form key/value).
- Price → `price` + `original_price` strikethrough when on sale; `price: null` renders "Inquire".
- CTA → links to `external_url` (Marketplace today, checkout later — same field), opens in a new tab, labeled "View Listing".
- Trust line (bottom) → `seller_name` + `seller_rating`, shown only if present.

`description` is accepted but not rendered on the card — surface it in a detail view/modal if needed.

## Data shape

```ts
{ id, title, description, price, original_price, condition, location,
  listed_label, attributes, image_url, external_url, seller_name,
  seller_rating, display_order }
```

Sort by `display_order` ascending before passing in — the component renders in array order.
