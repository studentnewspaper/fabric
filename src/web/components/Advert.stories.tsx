import AdvertComponent from "./Advert";

export default {
  title: "Components/Advert",
  component: AdvertComponent,
  args: {
    s3MediaId: "xLtnQtqcz5goVkPtVxZ2e",
    alt: "",
    paidForBy: "EUSA",
    link:
      "https://www.eusa.ed.ac.uk/yourvoice/elections/march/vote?utm_campaign=GOTV&utm_source=The+Student&utm_medium=Advert",
  },
};

const Template: any = (args: any) => <AdvertComponent {...args} />;

export const Advert = Template.bind({});
