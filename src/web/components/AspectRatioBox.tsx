import { css, PropsOf } from "@emotion/react";
import { FunctionComponent } from "preact";

export interface AspectRatioBoxProps extends PropsOf<"div"> {
  ratio: number;
}

const AspectRatioBox: FunctionComponent<AspectRatioBoxProps> = ({
  ratio,
  children,
  ...props
}) => {
  return (
    <div
      css={css`
        overflow: hidden;
        width: 100%;
        height: 0;
        padding-top: ${ratio * 100}%;
        position: relative;
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default AspectRatioBox;
