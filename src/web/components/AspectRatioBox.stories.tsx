import { css } from "@emotion/react";
import AspectRatioBoxComponent from "./AspectRatioBox";

export default {
  title: "Components/Aspect Ratio Box",
  component: AspectRatioBoxComponent,
  args: {
    ratio: Math.round((9 / 16) * 10) / 10,
  },
  argTypes: {
    ratio: {
      control: {
        type: "range",
        min: 0.05,
        max: 2,
        step: 0.05,
      },
    },
  },
};

export const AspectRatioBox: any = (args: any) => (
  <div
    css={css`
      width: 100%;
      max-width: 300px;
    `}
  >
    <AspectRatioBoxComponent {...args}>
      <div
        css={css`
          background-color: rgba(0, 0, 0, 0.5);
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
        `}
       />
    </AspectRatioBoxComponent>
  </div>
);
