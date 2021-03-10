import { css } from "@emotion/react";
import { space } from "../design/theme";
import { FunctionComponent } from "preact";

export interface QuoteProps {}

const containerStyles = css`
  border-left: 1px solid black;
  padding-top: ${space[2]}px;
  padding-bottom: ${space[3]}px;
  padding-left: ${space[6]}px;

  *:not(:last-child) {
    margin-bottom: ${space[4]}px;
  }
`;

const Quote: FunctionComponent<QuoteProps> = ({ children }) => {
  return <blockquote css={containerStyles}>{children}</blockquote>;
};

export default Quote;
