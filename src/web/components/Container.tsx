import { css, PropsOf } from "@emotion/react";
import { space } from "../design/theme";
import { FunctionComponent } from "preact";

export interface ContainerProps extends PropsOf<"div"> {
  grid?: number;
}

const Container: FunctionComponent<ContainerProps> = ({
  grid,
  children,
  ...props
}) => {
  return (
    <div
      css={css`
        width: 100%;
        padding: 0 ${space[6]}px;
      `}
      {...props}
    >
      <div
        css={[
          css`
            max-width: 1000px;
            margin: 0 auto;
          `,
          grid != null &&
            css`
              grid-template-columns: minmax(${grid}, 1fr);
            `,
        ]}
      >
        {children}
      </div>
    </div>
  );
};

export default Container;
