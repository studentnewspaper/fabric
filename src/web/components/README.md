# Components

Components live in the `/src` folder. Emotion is used for styling.

- If styles need to switch base on some prop,

Most components should have an associated `.stories.tsx` file. This makes them appear in Storybook, the tool we use to preview the components.

To start Storybook, make sure that all the dependencies are installed with `yarn install` and then run `yarn run storybook`.

## Styling guide

Styles should not be written inline. Assign them to variables instead. If styles need to vary based on a prop, there are a couple of methods you can use:

In situations where only small adjustments are made with no complex logic:

```tsx
const boxStyles = (hasPadding: boolean) => css`
  padding: ${hasPadding ? `6px` : `0`};
`;

<div css={boxStyles(props.hasPadding)} />;
```

In situations where there are two mutually exclusive styles:

```tsx
const boxStyles = (type: BoxType) => {
  switch (type) {
    case BoxType.SomeOption:
      return css`...`;
    case BoxType.OtherOption:
      return css`...`;
  }
};

<div css={boxStyles(props.type)} />;
```

In situations where additional styles can be toggled (which will override earlier styles):

```tsx
const baseStyles = css`
  ...
`;

const optionStyles = css`
  ...
`;

<div css={[baseStyles, prop.option && optionStyles]} />;
```

These three options can be mixed and merged, and there are no hard and fast rules. Whatever is the easiest to read and understand ideally, without four levels of nested ternarys.
