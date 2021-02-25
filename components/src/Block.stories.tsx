import { FunctionComponent } from "preact";
import Block, { BlockProps } from "./Block";
import ArticleCell, { ArticleCellType } from "./ArticleCell";
import UpdatesCell, { UpdatesCellType } from "./UpdatesCell";
import { constrain } from "../story-utils";

export default {
  title: "Blocks/Basic",
  component: Block,
  args: {
    columns: 5,
  },
  decorators: [constrain("800px", true)],
  // } as Meta;
};

// export const Basic: Story<BlockProps> = (args) => <Block {...args} />;
const Template: any = (args: any) => <Block {...args} />;

const Wrap: FunctionComponent<{ columns: number }> = ({
  columns,
  children,
}) => {
  return <div style={{ gridColumn: `auto / span ${columns}` }}>{children}</div>;
};

export const Blank = Template.bind({});

export const Live = Template.bind({});
Live.args = {
  children: (
    <>
      <Wrap columns={3}>
        <ArticleCell
          title="Lockdown announced for Ewing House"
          text="The university has locked down an entire wing of Pollock Halls as cases spike. Craig Buchan has more."
          isLive
          // imageUrl="https://source.unsplash.com/random"
        />
      </Wrap>
      <Wrap columns={2}>
        <UpdatesCell
          type={UpdatesCellType.Inline}
          updates={[
            {
              id: "4",
              time: "20.03",
              text: "Lockdown lifted after cases drop",
              link: "#",
            },
            {
              id: "3",
              time: "14.45",
              text: "Latest daily statistics",
              link: "#",
            },
            {
              id: "2",
              time: "13.21",
              text: `"Students not to blame" says MSP`,
              link: "#",
            },
            {
              id: "1",
              time: "3d",
              text: "University makes statement",
              link: "#",
            },
          ]}
        />
      </Wrap>
    </>
  ),
};

export const ComplexLive = Template.bind({});
ComplexLive.args = {
  children: (
    <>
      <Wrap columns={3}>
        <ArticleCell
          title="EUSA Elections"
          text="Every year, EUSA holds a vote to decide who the next sabbatical officers will be. This year is no different. Make your voice heard on March 3rd."
          isLive
        />
      </Wrap>
      <Wrap columns={1}>
        <ArticleCell
          title="Browse the manifestos"
          text="Read what each candidate has pledged to do in their elected role, with analysis from our journalists."
          link="#"
          type={ArticleCellType.Compact}
        />
      </Wrap>
      <Wrap columns={1}>
        <UpdatesCell
          type={UpdatesCellType.Stacked}
          updates={[
            {
              id: "4",
              time: "20.03",
              text: "Voting opens with technical hitch",
              link: "#",
            },
            {
              id: "3",
              time: "14.45",
              text: "One day to go",
              link: "#",
            },
            {
              id: "2",
              time: "13.21",
              text: "Candidate list revealed",
              link: "#",
            },
          ]}
        />
      </Wrap>
    </>
  ),
};
