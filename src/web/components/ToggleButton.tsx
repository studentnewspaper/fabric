import { css } from "@emotion/react";
import { FunctionComponent } from "preact";
import { bg, text } from "../design/palette";
import {
  boxShadows,
  colours,
  fonts,
  fontSizes,
  fontWeights,
  letterSpacings,
  space,
} from "../design/theme";

export interface ToggleButtonProps {
  isToggled?: boolean;
  onToggle?: (toggled: boolean) => void;
  isDisabled?: boolean;
}

const buttonStyles = css`
  font: inherit;
  font-family: ${fonts.sans};
  font-size: ${fontSizes.small}rem;
  /* text-transform: uppercase; */
  font-weight: ${fontWeights.bold};

  border: 1px solid ${bg.complimentary};
  padding: ${space[2]}px ${space[4]}px;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  box-shadow: ${boxShadows.base};

  :disabled {
    background-color: transparent;
    border-color: ${colours.neutral[300]};
    color: ${text.secondary};
    font-weight: ${fontWeights.base};
  }
`;

const onStyles = css`
  background-color: transparent;
  color: ${text.complimentary};
  border-color: ${text.complimentary};
  font-weight: ${fontWeights.base};
`;

const offStyles = css`
  background-color: ${bg.complimentary};
  color: white;
`;

const ToggleButton: FunctionComponent<ToggleButtonProps> = ({
  isToggled = false,
  onToggle: onChange = () => {},
  children,
  isDisabled: _isDisabled = false,
  ...props
}) => {
  const isDisabled = typeof window == "undefined" || _isDisabled;

  return (
    <button
      css={[buttonStyles, isToggled ? onStyles : offStyles]}
      onClick={() => onChange(!isToggled)}
      disabled={isDisabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default ToggleButton;
