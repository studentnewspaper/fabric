export const fontSizes = {
  small: 0.8,
  base: 1,
  large: 1.2,
  huge: 2,
};

export const fonts = {
  sans: `Inter, Segoe UI, Futura, Helvetica, Arial, sans-serif`,
  serif: `Literata, Big Caslon, Georgia, serif`,
};

export const lineHeights = { dense: 1.15, base: 1.35, relaxed: 1.5 };

export const letterSpacings = {
  dense: "-0.03rem",
  base: "0",
  relaxed: "0.03rem",
};

export const fontWeights = { base: 400, bold: 700 };

// Generated with https://tailwind.ink/
export const colours = {
  red: {
    50: "#fcf7f4",
    100: "#fcede9",
    200: "#fad5d0",
    300: "#f9b3a6",
    400: "#f9826a",
    500: "#fa573f",
    600: "#f3372a",
    700: "#d81a00", // theme colour
    800: "#ae2228",
    900: "#8c1d23",
  },
  blue: {
    50: "#f5fafc",
    100: "#e7f5fc",
    200: "#c8e4f9",
    300: "#a5ccf8",
    400: "#72a4f7",
    500: "#4377f6",
    600: "#3054ee",
    700: "#2a42d4",
    800: "#2233a3",
    900: "#1c2a7e",
  },
  // From https://github.com/tailwindlabs/tailwindcss/blob/master/colors.js
  neutral: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
  },
};

export const space = [0, 2, 4, 8, 12, 16, 20, 24, 32, 48, 96];

export const breakpoints = ["40em", "52em", "64em"];

export const mediaQueries = {
  small: `@media screen and (min-width: ${breakpoints[0]})`,
  medium: `@media screen and (min-width: ${breakpoints[1]})`,
  large: `@media screen and (min-width: ${breakpoints[2]})`,
};

export const zIndices = {
  linkArea: 10,
};

export const boxShadows = {
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  base: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl:
    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
};
