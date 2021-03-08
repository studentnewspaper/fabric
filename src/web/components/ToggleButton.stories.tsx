import ToggleButtonComponent from "./ToggleButton";

export default {
  title: "Components/Toggle",
  args: {
    isToggled: false,
    children: "Enable notifications",
    disabled: false,
  },
  component: ToggleButtonComponent,
};

const Template: any = (args: any) => <ToggleButtonComponent {...args} />;

export const Initial = Template.bind({});

export const Active = Template.bind({});
Active.args = { isToggled: true, children: "Disable notifications" };

export const Disabled = Template.bind({});
Disabled.args = { disabled: true, children: "Loading..." };
