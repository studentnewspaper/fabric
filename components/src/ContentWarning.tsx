import { css, PropsOf } from "@emotion/react";
import { bg } from "design/palette";
import { fonts, fontWeights, space } from "design/theme";
import { FunctionComponent } from "preact";

export interface ContentWarningProps extends PropsOf<"div"> {}

const containerStyles = css`
  padding: 16px 0;
  border-top: 1px solid black;
  border-bottom: 1px solid black;

  display: flex;
  flex-direction: row;
  align-items: center;

  font-family: ${fonts.sans};
`;

const iconContainerStyles = css`
  position: relative;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* TODO: Work this out using pythagoras or something */
  margin-left: 5px;
  margin-right: ${space[6]}px;
  user-select: none;
`;

const rotatedBoxStyles = css`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transform: rotate(45deg);

  border: 3px solid ${bg.warning};
`;

const iconTextStyles = css`
  font-weight: ${fontWeights.bold};
`;

const labelStyles = css`
  font-weight: ${fontWeights.bold};
`;

const ContentWarning: FunctionComponent<ContentWarningProps> = ({
  children,
  ...props
}) => {
  return (
    <div css={containerStyles} {...props}>
      <div css={iconContainerStyles}>
        <div css={rotatedBoxStyles}></div>
        <div css={iconTextStyles}>!</div>
      </div>
      <div>
        <div css={labelStyles}>Content warning</div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default ContentWarning;
