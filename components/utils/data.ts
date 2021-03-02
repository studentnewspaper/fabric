import { subDays, subHours, subMinutes } from "date-fns";
import { UpdatesCellProps } from "../src/UpdatesCell";

export const liveUpdates: UpdatesCellProps["updates"] = [
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
