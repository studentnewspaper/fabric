import { constrain } from "../story-utils";
import QuoteComponent from "./Quote";

export default {
  title: "Components/Quote",
  args: {
    children: `"This is a really long quote which has multiple lines. It does not yet support an author field, but it may one day`,
  },
  decorators: [constrain("450px", true)],
};

const Template: any = (args: any) => <QuoteComponent {...args} />;

export const Quote = Template.bind({});
