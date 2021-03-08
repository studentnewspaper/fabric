import { subDays, subHours, subMinutes } from "date-fns";
import { LiveUpdateProps } from "../LiveUpdate";
import { UpdatesCellProps } from "../UpdatesCell";

export const liveUpdatesForCell: UpdatesCellProps["updates"] = [
  {
    id: "1",
    timestamp: new Date(),
    text: "University releases statement",
    link: "#",
  },
  {
    id: "2",
    timestamp: subMinutes(new Date(), 124),
    text: "Erwing House locked down",
    link: "#",
  },
  {
    id: "3",
    timestamp: subHours(new Date(), 26),
    text: "Really long text that extends over multiple lines",
  },
  {
    id: "4",
    timestamp: subDays(new Date(), 6),
    text: "Package arrives on doorstep",
    link: "#",
  },
  {
    id: "5",
    timestamp: subDays(new Date(), 89),
    text: "A really really old update",
    link: "#",
  },
];

export const liveUpdates: LiveUpdateProps[] = [
  {
    id: "001",
    author: "Nicholas Bush",
    authorSlug: "nick-bush",
    body: `<p>This is the first live update of many. Lives allow for sharing small updates to a developing story.</p>
    <p>Updates can be major or minor. Major updates are shown in update cells in the home page. This is the key aspect of the editorial fabric: elements can be brought in from all sorts of different locations to build up heavily contextualised storytelling.</p>`,
    createdAt: new Date(),
  },
  {
    authorSlug: "nick-bush",
    body: `<h1>University of Edinburgh issues statement</h1>
    <p>A spokesperson for University of Edinburgh said:</p>
    <blockquote>"The University is working closely with NHS Lothian's Health Protection team to identify staff and students who test positive for Covid-19.</blockquote>
    <blockquote>"We are keeping our students and staff informed and following all Scottish Government guidance. We are providing care and support to those self-isolating, both in University-owned and private accommodation."</blockquote>`,
    author: "Craig Buchan",
    createdAt: subHours(new Date(), 2),
    id: "002",
  },
  {
    authorSlug: "nick-bush",
    body: `<p>A spokesperson for University of Edinburgh said:</p>
    <blockquote>"The University is working closely with NHS Lothian's Health Protection team to identify staff and students who test positive for Covid-19.</blockquote>
    <blockquote>"We are keeping our students and staff informed and following all Scottish Government guidance. We are providing care and support to those self-isolating, both in University-owned and private accommodation."</blockquote>`,
    author: "Craig Buchan",
    createdAt: subDays(new Date(), 1),
    id: "003",
  },
];
