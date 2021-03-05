import { fonts, fontSizes, fontWeights, lineHeights } from "./theme";
import { text } from "./palette";

type FontConfig = {
  family: string;
  size: number; // in rem,
  height: number; // line-height,
  weight: number;
  colour: string;
};

export const baseFont: FontConfig = {
  family: fonts.serif,
  size: fontSizes.base,
  height: lineHeights.base,
  weight: fontWeights.base,
  colour: text.primary,
};

export const headlineFont: FontConfig = {
  family: fonts.serif,
  size: fontSizes.huge,
  height: lineHeights.base,
  weight: fontWeights.bold,
  colour: text.primary,
};

export const subtitleFont: FontConfig = {
  family: fonts.serif,
  size: fontSizes.large,
  height: lineHeights.base,
  weight: fontWeights.bold,
  colour: text.primary,
};

export function generateStyles(config: FontConfig): string {
  // TODO: Exclude properties which mirror base? Reduces duplication?
  return `
    font-family: ${config.family};
    font-size: ${config.size}rem;
    font-weight: ${config.weight};
    line-height: ${config.height};
    colour: ${config.colour};
  `;
}
