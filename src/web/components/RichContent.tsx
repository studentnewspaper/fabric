import { css, PropsOf } from "@emotion/react";
import { fontWeights, lineHeights, space } from "../design/theme";
import {
  generateStyles,
  headlineFont,
  subtitleFont,
} from "../design/typography";
import { FunctionComponent } from "preact";

export interface RichContentProps extends PropsOf<"div"> {}

const styles = css`
  line-height: ${lineHeights.relaxed};

  h1 {
    /* h1s in content should not be headline size, because they will not be the headline of the article */
    ${generateStyles(subtitleFont)}
  }

  h2 {
    font-weight: ${fontWeights.bold};
  }

  *:not(:last-child) {
    margin-bottom: ${space[4]}px;
  }

  /* TODO: Synchronise with <Quote /> */
  blockquote {
    border-left: 1px solid black;
    padding-top: ${space[2]}px;
    padding-bottom: ${space[3]}px;
    padding-left: ${space[6]}px;

    *:not(:last-child) {
      margin-bottom: ${space[4]}px;
    }
  }
`;

// TODO: Make sure images have cross-origin where possible for caching purposes
const RichContent: FunctionComponent<RichContentProps> = ({ ...props }) => {
  return <div css={styles} {...props} />;
};

export default RichContent;
