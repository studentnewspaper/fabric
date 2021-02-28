import { FunctionComponent } from "preact";
import { css } from "@emotion/react";
import {
  fonts,
  fontSizes,
  fontWeights,
  letterSpacings,
  space,
} from "design/theme";

export interface BlockProps {
  columns: number;
  rows?: number;
  title?: string;
}

const containerStyles = css`
  width: 100%;
  border-top: 2px solid black;
  border-bottom: 1px solid black;
`;

const gridStyles = (columns: number, rows: number) => css`
  padding: ${space[6]}px 0;
  display: grid;
  grid-template-columns: repeat(${columns}, minmax(0, 1fr));
  /* TODO: Are these minmax's really necessary */
  grid-template-rows: repeat(${rows - 1}, minmax(0, auto)) minmax(0, 1fr);
  column-gap: ${space[4]}px;
  row-gap: ${space[6]}px;
`;

const titleStyles = css`
  /* TODO: Export this from typography.ts? */
  font-family: ${fonts.sans};
  font-size: ${fontSizes.large}rem;
  font-weight: ${fontWeights.bold};
  letter-spacing: ${letterSpacings.dense};
  padding: ${space[3]}px 0;
  border-bottom: 1px solid black;
`;

const Block: FunctionComponent<BlockProps> = ({
  columns,
  rows = 1,
  title,
  children,
}) => {
  return (
    <div css={containerStyles}>
      {title != null && <div css={titleStyles}>{title}</div>}
      <div css={gridStyles(columns, rows)}>{children}</div>
    </div>
  );
};

export default Block;
