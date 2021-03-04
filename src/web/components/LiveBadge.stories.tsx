import LiveBadgeComponent, { LiveBadgeType } from "./LiveBadge";

export default {
  title: "Components/Live Badge",
  component: LiveBadgeComponent,
  args: {
    type: LiveBadgeType.Solid,
  },
  argTypes: {
    type: {
      control: {
        type: "inline-radio",
        options: Object.values(LiveBadgeType),
      },
    },
  },
};

export const LiveBadge = (args: any) => <LiveBadgeComponent {...args} />;
