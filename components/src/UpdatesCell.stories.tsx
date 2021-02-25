import { constrain } from "../story-utils";
import UpdatesCell, { UpdatesCellProps, UpdatesCellType } from "./UpdatesCell";

export default {
  title: "Cells/Updates",
  component: UpdatesCell,
  args: {
    updates: [
      {
        id: "1",
        time: "12.07",
        text: "University releases statement",
        link: "#",
      },
      { id: "2", time: "09.23", text: "Erwing House locked down", link: "#" },
      {
        id: "3",
        time: "23hr",
        text: "Really long text that extends over multiple lines",
      },
      { id: "4", time: "4d", text: "Package arrives on doorstep", link: "#" },
    ],
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
