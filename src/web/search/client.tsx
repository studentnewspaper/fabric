import { hydrate } from "preact";
import SearchPage from ".";

const propsString = document.getElementById("HYDRATE")?.innerHTML;
if (typeof propsString != "string") throw new Error("Could not read props");

hydrate(
  <SearchPage {...JSON.parse(propsString)} />,
  document.getElementById("root") as Element
);
