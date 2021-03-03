import { css } from "@emotion/react";
import { space } from "design/theme";
import { FunctionComponent } from "preact";

export interface QuoteProps {}

const containerStyles = css`
  border-left: 1px solid black;
  padding: ${space[2]}px 0;
  padding-left: ${space[6]}px;
`;

const Quote: FunctionComponent<QuoteProps> = ({ children }) => {
  return <blockquote css={containerStyles}>{children}</blockquote>;
};

export default Quote;
