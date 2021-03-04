import { constrain } from "./utils/story-utils";
import { liveUpdates } from "./utils/data";
import LiveLayout from "./LiveLayout";
import LiveUpdate, { LiveUpdateProps } from "./LiveUpdate";

export default {
  title: "Layouts/Live",
  component: LiveLayout,
  decorators: [constrain("800px")],
};

export const Live = (args: any) => (
  <LiveLayout
    updates={liveUpdates.map((update) => (
      <LiveUpdate key={update.id} {...update} />
    ))}
  />
);
