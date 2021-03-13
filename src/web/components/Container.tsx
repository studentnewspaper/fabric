import { css, Interpolation, PropsOf, Theme } from "@emotion/react";
import { space } from "../design/theme";
import { FunctionComponent } from "preact";

export interface ContainerProps extends PropsOf<"div"> {
  grid?: number;
  gridCss?: Interpolation<Theme>;
}

const Container: FunctionComponent<ContainerProps> = ({
  grid,
  children,
  gridCss,
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
              display: grid;
              grid-template-columns: repeat(${grid}, minmax(0, 1fr));
            `,
          gridCss,
        ]}
      >
        {children}
      </div>
    </div>
  );
};

export default Container;
