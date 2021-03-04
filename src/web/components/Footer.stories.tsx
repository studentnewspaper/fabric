import { constrain } from "./utils/story-utils";
import FooterComponent from "./Footer";

export default {
  title: "Components/Footer",
  component: FooterComponent,
  decorators: [constrain("800px", true)],
};

const Template: any = (args: any) => <FooterComponent {...args} />;

export const Footer = Template.bind({});
