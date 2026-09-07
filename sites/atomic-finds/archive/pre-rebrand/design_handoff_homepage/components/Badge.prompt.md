# Badge

Status indicator pill for inventory and product tags.

## Usage

```jsx
import { Badge } from './Badge.jsx';

export function ProductCard() {
  return (
    <>
      <Badge variant="instock">In Stock</Badge>
      <Badge variant="featured">Featured</Badge>
      <Badge variant="out">Out of Stock</Badge>
      <Badge variant="eco">Eco / Restored</Badge>
    </>
  );
}
```

## Variants

- **instock** — Golden background, dark text, small glow
- **featured** — Amber background, dark text, amber glow
- **out** — Transparent, woven-moss border and text
- **eco** — Woven-moss background, bone-white text
