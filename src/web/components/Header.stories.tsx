import { constrain } from "./utils/story-utils";
import HeaderComponent from "./Header";

export default {
  title: "Components/Header",
  component: HeaderComponent,
  // decorators: [constrain("800px", true)],
};

const Template: any = (args: any) => <HeaderComponent {...args} />;

export const Header = Template.bind({});
