# Button

Fully rounded pill buttons in solid yellow (primary action), outlined primary/amber (secondary paths). Golden glow on hover.

## Usage

```jsx
import { Button } from './Button.jsx';

export function MyComponent() {
  return (
    <>
      <Button variant="solid">[ Explore Collection ]</Button>
      <Button variant="primary">[ View Full Catalog ]</Button>
      <Button variant="amber">[ Schedule Viewing ]</Button>
    </>
  );
}
```

## Variants

- **solid** — Filled celestial yellow, strong glow, lifts on hover (primary action)
- **primary** — Outlined golden, subtle glow on hover (secondary action)
- **amber** — Outlined amber, warm glow on hover (tertiary action)

## Sizes

- **sm** — 10px/20px padding, compact buttons
- **md** — 14px/30px padding, standard (default)
- **lg** — 18px/40px padding, prominent CTAs
