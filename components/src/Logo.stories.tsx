import { constrain } from "../story-utils";
import LogoComponent from "./Logo";

export default {
  title: "Components/Logo",
  component: LogoComponent,
  decorators: [constrain("450px")],
};

const Template: any = (args: any) => <LogoComponent {...args} />;

export const Logo = Template.bind({});
