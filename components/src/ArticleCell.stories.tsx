import { constrain } from "../story-utils";
import ArticleCell, { ArticleCellProps, ArticleCellType } from "./ArticleCell";
// import { Story, Meta } from "@storybook/preact/types-6-0";

export default {
  title: "Cells/Article",
  component: ArticleCell,
  args: {
    title: "Nicola Sturgeon announces roadmap out of lockdown",
    subtitle: "Freedom by summer.",
    text:
      "First Minister Nicola Sturgeon announced a strategic framework which aims to slowly lift lockdown restrictions in order to reopen the economy by April 26.",
    link: "#",
    isLive: false,
    imageUrl: undefined,
    type: ArticleCellType.Default,
  } as ArticleCellProps,
  argTypes: {
    type: {
      control: {
        type: "inline-radio",
        options: Object.values(ArticleCellType),
      },
    },
    imageUrl: {
      control: {
        type: "text",
      },
    },
  },
};
// as Meta<ArticleCellProps>;

// const Template: Story<ArticleCellProps> = (args) => <ArticleCell {...args} />;
const Template: any = (args: any) => <ArticleCell {...args} />;

export const WithImage = Template.bind({});
WithImage.decorators = [constrain("600px")];
WithImage.args = {
  imageUrl: "https://source.unsplash.com/random",
  isLive: true,
};

export const Compact = Template.bind({});
Compact.decorators = [constrain("200px")];
Compact.args = {
  type: ArticleCellType.Compact,
};
