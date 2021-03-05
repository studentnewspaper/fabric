import { constrain } from "./utils/story-utils";
import { liveUpdatesForCell } from "./utils/data";
import UpdatesCell, { UpdatesCellProps, UpdatesCellType } from "./UpdatesCell";

export default {
  title: "Cells/Updates",
  component: UpdatesCell,
  args: {
    updates: liveUpdatesForCell,
    type: UpdatesCellType.Stacked,
  } as UpdatesCellProps,
  argTypes: {
    type: {
      control: {
        type: "inline-radio",
        options: Object.values(UpdatesCellType),
      },
    },
  },
};

const Template: any = (args: any) => <UpdatesCell {...args} />;

export const Stacked = Template.bind({});
Stacked.decorators = [constrain("200px")];
Stacked.args = { type: UpdatesCellType.Stacked };

export const Inline = Template.bind({});
Inline.decorators = [constrain("600px")];
Inline.args = { type: UpdatesCellType.Inline };

export const UpdatedAt = Template.bind({});
UpdatedAt.decorators = [constrain("600px")];
UpdatedAt.args = { type: UpdatesCellType.Inline, updatedAt: new Date() };
