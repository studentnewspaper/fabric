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
import { text } from "../design/palette";
import { RiArrowRightLine } from "react-icons/ri";

export interface BlockProps extends PropsOf<"div"> {
  columns: number;
  rows?: number;
  title?: string;
  titleLink?: string;
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
  display: block;
  font-family: ${fonts.sans};
  font-size: ${fontSizes.large}rem;
  font-weight: ${fontWeights.bold};
  letter-spacing: ${letterSpacings.dense};
  padding: ${space[3]}px 0;
  border-bottom: 1px solid ${colours.neutral[300]};
`;

const linkedTitleStyles = css`
  text-decoration: none;
  color: ${text.primary};

  :hover {
    text-decoration: underline;
  }
`;

const Block: FunctionComponent<BlockProps> = ({
  columns,
  rows = 1,
  title,
  titleLink,
  children,
  hasTop = true,
  ...props
}) => {
  return (
    <div css={[containerStyles, hasTop && containerTopStyles]} {...props}>
      {title != null &&
        (titleLink != null ? (
          <a css={[titleStyles, linkedTitleStyles]} href={titleLink}>
            {title}{" "}
            <RiArrowRightLine
              css={css`
                vertical-align: middle;
                position: relative;
                bottom: 1px;
                margin-left: ${space[2]}px;
              `}
            />
          </a>
        ) : (
          <div css={titleStyles}>{title}</div>
        ))}
      <div css={[gridStyles(columns, rows), hasTop && gridTopStyles]}>
        {children}
      </div>
    </div>
  );
};

export default Block;
