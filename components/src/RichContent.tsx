import { css, PropsOf } from "@emotion/react";
import { fontWeights, lineHeights, space } from "design/theme";
import { generateStyles, headlineFont, subtitleFont } from "design/typography";
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
`;

const RichContent: FunctionComponent<RichContentProps> = ({ ...props }) => {
  return <div css={styles} {...props} />;
};

export default RichContent;
