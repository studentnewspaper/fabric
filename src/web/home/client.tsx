import { hydrate } from "preact";
import HomePage from ".";

console.log("HYDRATING");
const propsString = document.getElementById("HYDRATE")?.innerHTML;
if (typeof propsString != "string") throw new Error("Could not read props");

hydrate(
  <HomePage {...JSON.parse(propsString)} />,
  document.getElementById("root") as Element
);
