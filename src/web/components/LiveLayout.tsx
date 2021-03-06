import { css } from "@emotion/react";
import { colours, space } from "../design/theme";
import { FunctionComponent } from "preact";
import ClientGate from "./ClientGate";

export interface LiveLayoutProps {
  updates: JSX.Element[];
}

const containerStyles = css`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 4fr);
  align-items: baseline;
  column-gap: ${space[8]}px;
  row-gap: ${space[8]}px;
`;

const dividerStyles = css`
  grid-column: 2 / span 1;
  height: 1px;
  background-color: ${colours.neutral[400]};
  width: 65%;
`;

const LiveLayout: FunctionComponent<LiveLayoutProps> = ({ updates }) => {
  const $updates = updates
    .flatMap((update) => [<div css={dividerStyles} />, update])
    .slice(1);

  return (
    <div css={containerStyles}>
      {$updates.slice(0, 6)}
      <ClientGate>{$updates.slice(6)}</ClientGate>
    </div>
  );
};

export default LiveLayout;
