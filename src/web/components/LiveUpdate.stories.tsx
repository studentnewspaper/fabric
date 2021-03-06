import { subHours } from "date-fns";
import { constrain } from "./utils/story-utils";
import LiveLayout from "./LiveLayout";
import LiveUpdateComponent from "./LiveUpdate";

export default {
  title: "Components/Live Update",
  component: LiveUpdateComponent,
  args: {
    body: `<h1>University of Edinburgh issues statement</h1>
<p>A spokesperson for University of Edinburgh said:</p>
<blockquote>"The University is working closely with NHS Lothian's Health Protection team to identify staff and students who test positive for Covid-19.</blockquote>
<blockquote>"We are keeping our students and staff informed and following all Scottish Government guidance. We are providing care and support to those self-isolating, both in University-owned and private accommodation."</blockquote>`,
    author: "Craig Buchan",
    authorSlug: "craig-buchan",
    createdAt: subHours(new Date(), 2),
    id: "0001",
  },
  decorators: [
    (Story: any) => <LiveLayout updates={[<Story key={1} />]} />,
    constrain("800px", true),
  ],
};

const Template: any = (args: any) => <LiveUpdateComponent {...args} />;

export const JustText = Template.bind({});
JustText.args = {
  body: `<p>A spokesperson for University of Edinburgh said:</p>
<blockquote>"The University is working closely with NHS Lothian's Health Protection team to identify staff and students who test positive for Covid-19.</blockquote>
<blockquote>"We are keeping our students and staff informed and following all Scottish Government guidance. We are providing care and support to those self-isolating, both in University-owned and private accommodation."</blockquote>`,
};

export const WithTitle = Template.bind({});
