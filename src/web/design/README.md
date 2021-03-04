# Design

The individual properties (design tokens) live in `theme.ts`. They are things like exact colour values, font sizes, etcetera.

Styles are built from these design tokens. For instance, the primary text colour is defined in `palette.ts` like this:

```ts
export const text = {
  primary: colours.neutral[800],
  // ...
}.
```

`text.primary` is a _style_, whereas `colours.neutral[800]` is a _property_. By themselves, properties hold no contextual meaning.

Colours are available in shades from 50-800, which mirrors the approach that Tailwind uses (in fact, we liberally borrow from their default theme).
