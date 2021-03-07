import { FunctionComponent } from "preact";
import { css, PropsOf } from "@emotion/react";
import {
  colours,
  fonts,
  fontSizes,
  fontWeights,
  letterSpacings,
  space,
} from "../design/theme";

export interface BlockProps extends PropsOf<"div"> {
  columns: number;
  rows?: number;
  title?: string;
  hasTop?: boolean;
}

const containerStyles = css`
  width: 100%;
`;

const containerTopStyles = css`
  margin-top: ${space[6]}px;
  border-top: 1px solid black;
`;

const gridStyles = (columns: number, rows: number) => css`
  padding-bottom: ${space[6]}px;
  display: grid;
  grid-template-columns: repeat(${columns}, minmax(0, 1fr));
  /* TODO: Are these minmax's really necessary */
  grid-template-rows: repeat(${rows - 1}, minmax(0, auto)) minmax(0, 1fr);
  column-gap: ${space[5]}px;
  row-gap: ${space[6]}px;

  @media (max-width: 800px) {
    grid-template-columns: repeat(${Math.min(columns, 2)}, minmax(0, 1fr));
  }
`;

const gridTopStyles = css`
  padding-top: ${space[6]}px;
`;

const titleStyles = css`
  /* TODO: Export this from typography.ts? */
  font-family: ${fonts.sans};
  font-size: ${fontSizes.large}rem;
  font-weight: ${fontWeights.bold};
  letter-spacing: ${letterSpacings.dense};
  padding: ${space[3]}px 0;
  border-bottom: 1px solid ${colours.neutral[300]};
`;

const Block: FunctionComponent<BlockProps> = ({
  columns,
  rows = 1,
  title,
  children,
  hasTop = true,
  ...props
}) => {
  return (
    <div css={[containerStyles, hasTop && containerTopStyles]} {...props}>
      {title != null && <div css={titleStyles}>{title}</div>}
      <div css={[gridStyles(columns, rows), hasTop && gridTopStyles]}>
        {children}
      </div>
    </div>
  );
};

export default Block;
