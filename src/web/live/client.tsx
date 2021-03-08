import { hydrate } from "preact";
import LivePage from ".";

const propsString = document.getElementById("HYDRATE")?.innerHTML;
if (typeof propsString != "string") throw new Error("Could not read props");

hydrate(
  <LivePage {...JSON.parse(propsString)} />,
  document.getElementById("root") as Element
);
