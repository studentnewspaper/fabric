import { FunctionComponent } from "preact";
import Block, { BlockProps } from "./Block";
import ArticleCell, { ArticleCellType } from "./ArticleCell";
import UpdatesCell, { UpdatesCellType } from "./UpdatesCell";
import { constrain } from "../story-utils";
import ArticleCellStories, { Compact, WithImage } from "./ArticleCell.stories";
import { liveUpdates } from "../utils/data";

export default {
  title: "Blocks/Basic",
  component: Block,
  args: {
    columns: 5,
    rows: 1,
    title: null,
  },
  argTypes: {
    title: {
      control: {
        type: "text",
      },
    },
  },
  decorators: [constrain("800px", true)],
  // } as Meta;
};

// export const Basic: Story<BlockProps> = (args) => <Block {...args} />;
const Template: any = (args: any) => <Block {...args} />;

const Wrap: FunctionComponent<{ columns: number; rows?: number }> = ({
  columns,
  rows = 1,
  children,
}) => {
  return (
    <div
      style={{
        gridColumn: `auto / span ${columns}`,
        gridRow: `auto / span ${rows}`,
      }}
    >
      {children}
    </div>
  );
};

export const Blank = Template.bind({});

export const WithTitle = Template.bind({});
WithTitle.args = {
  title: "Block title",
};

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
        <UpdatesCell type={UpdatesCellType.Inline} updates={liveUpdates} />
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
        <UpdatesCell type={UpdatesCellType.Stacked} updates={liveUpdates} />
      </Wrap>
    </>
  ),
};

export const Section = Template.bind({});
Section.args = {
  title: "Features",
  rows: 2,
  children: (
    <>
      <Wrap columns={3} rows={2}>
        {/* TODO: Write these out fully so ArticleStories.stories.tsx can change without changing this */}
        <WithImage
          {...ArticleCellStories.args}
          {...WithImage.args}
          isLive={false}
        />
      </Wrap>
      <Wrap columns={2} rows={1}>
        <Compact
          {...ArticleCellStories.args}
          {...Compact.args}
          isLive={false}
        />
      </Wrap>
      <Wrap columns={2} rows={1}>
        <Compact
          {...ArticleCellStories.args}
          {...Compact.args}
          isLive={false}
        />
      </Wrap>
    </>
  ),
};
