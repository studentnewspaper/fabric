import { FunctionComponent } from "preact";
import { css } from "@emotion/react";
import { space } from "design/theme";

export interface BlockProps {
  columns: number;
}

const blockStyles = (columns: number) => css`
  width: 100%;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  padding: ${space[6]}px 0;
  column-gap: ${space[4]}px;

  display: grid;
  grid-template-columns: repeat(${columns}, minmax(0, 1fr));
`;

const Block: FunctionComponent<BlockProps> = ({ columns, children }) => {
  return <div css={blockStyles(columns)}>{children}</div>;
};

export default Block;
