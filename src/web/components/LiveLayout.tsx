import { css } from "@emotion/react";
import { colours, space } from "../design/theme";
import { FunctionComponent } from "preact";
import ClientGate from "./ClientGate";
import Advert from "./Advert";

const EMERGENCY_AD_PROPS = {
  s3MediaId: "xLtnQtqcz5goVkPtVxZ2e",
  alt: "",
  paidForBy: "EUSA",
  link:
    "https://www.eusa.ed.ac.uk/yourvoice/elections/march/vote?utm_campaign=GOTV&utm_source=The+Student&utm_medium=Advert",
};

export interface LiveLayoutProps {
  updates: JSX.Element[];
}

const containerStyles = css`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 4fr);
  align-items: baseline;
  column-gap: ${space[8]}px;
  row-gap: ${space[8]}px;

  @media (max-width: 800px) {
    display: block;
  }
`;

const dividerStyles = css`
  grid-column: 2 / span 1;
  height: 1px;
  background-color: ${colours.neutral[400]};
  width: 65%;

  @media (max-width: 800px) {
    margin: ${space[8]}px 0;
    width: 100%;
  }
`;

const LiveLayout: FunctionComponent<LiveLayoutProps> = ({ updates }) => {
  const $updates = updates
    .flatMap((update) => [<div css={dividerStyles} />, update])
    .slice(1);

  return (
    <div css={containerStyles}>
      {$updates.slice(0, 3)}
      <div css={dividerStyles} />
      <div></div>
      <Advert {...EMERGENCY_AD_PROPS} hideBottomBorder />
      <div css={dividerStyles} />
      <ClientGate>{$updates.slice(6)}</ClientGate>
    </div>
  );
};

export default LiveLayout;
