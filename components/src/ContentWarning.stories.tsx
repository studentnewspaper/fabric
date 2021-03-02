import ContentWarningComponent from "./ContentWarning";

export default {
  title: "Components/Content Warning",
  args: {
    children: "Homophobia and racism",
  },
};

const Template: any = (args: any) => <ContentWarningComponent {...args} />;

export const ContentWarning = Template.bind({});
