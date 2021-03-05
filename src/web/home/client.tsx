import { hydrate } from "preact";
import HomePage from ".";

hydrate(
  <HomePage {...(window as any).HYDRATE.props} />,
  document.getElementById("root") as Element
);
