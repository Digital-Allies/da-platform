# Card

Container component for feature cards, product cards, and testimonials. Lifts on hover with glow effect.

## Usage

```jsx
import { Card } from './Card.jsx';

export function FeatureGrid() {
  return (
    <Card>
      <h3 style={{...}}>Feature Title</h3>
      <p>Feature description goes here.</p>
    </Card>
  );
}
```

## Behavior

- Lifts 6px upward on hover
- Border glows golden
- Smooth 300ms transition
- Respects prefers-reduced-motion
