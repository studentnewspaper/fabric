import { css, keyframes, PropsOf } from "@emotion/react";
import { FunctionComponent } from "preact";
import { bg, text } from "design/palette";
import { fonts, fontSizes } from "design/theme";

export enum LiveBadgeType {
  Solid = "solid",
  Transparent = "transparent",
}

export interface LiveBadgeProps extends PropsOf<"div"> {
  type?: LiveBadgeType;
}

const badgeStyles = css`
  font-size: ${fontSizes.small}em;
  font-family: ${fonts.sans};
  font-weight: bold;

  display: inline-flex;
  flex-direction: row;
  align-items: center;
`;

const solidBadgeStyles = css`
  padding: 5px 8px;
  border-radius: 3px;
  color: ${text.liveInverse};
  background-color: ${bg.live};
`;

const transparentBadgeStyles = css`
  padding-left: 1px;
  color: ${text.live};
`;

const indicatorAnimation = keyframes`
  0% {opacity: 1;}
  10% {opacity: .25;}
  40% {opacity: 1;}
  100% {opacity: 1;}
`;

const indicatorStyles = css`
  border-radius: 50%;
  width: 8px;
  height: 8px;
  margin-right: 6px;

  animation: ${indicatorAnimation} 1s infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const LiveBadge: FunctionComponent<LiveBadgeProps> = ({
  type = LiveBadgeType.Solid,
  ...props
}) => {
  return (
    <div
      css={css`
        line-height: 1;
      `}
      {...props}
    >
      <div
        css={[
          badgeStyles,
          type == LiveBadgeType.Solid
            ? solidBadgeStyles
            : transparentBadgeStyles,
        ]}
      >
        <div
          css={[
            indicatorStyles,
            css`
              background-color: ${type == LiveBadgeType.Solid
                ? text.liveInverse
                : text.live};
            `,
          ]}
        ></div>
        <div>LIVE</div>
      </div>
    </div>
  );
};

export default LiveBadge;
