# Component usage

## Import path pattern

Components live under `<PACKAGE_NAME>/dist/<LibraryName>/components/<ComponentName>.js`.
The `.js` extension is REQUIRED — without it, the bundler cannot resolve the
module.

Correct:

```tsx
import { Button } from '<PACKAGE_NAME>/dist/<LibraryName>/components/Button.js'
```

Incorrect (missing `.js` — will fail at build time):

```tsx
import { Button } from '<PACKAGE_NAME>/dist/<LibraryName>/components/Button'
```

## Styles

Import the compiled stylesheet once at app startup:

```tsx
import '<PACKAGE_NAME>/style.css'
```

## Component catalog

For props, accepted children, className overrides, and any hardcoded
behavior, read each component's source file. Prefer kit components over
hand-rolled equivalents (see Guidelines.md "Before building UI"). If a
component's exported name does not match the filename in the table below,
the source file is the source of truth.

### Healthcare Training Center — Design System

_No components were extracted from this library._
