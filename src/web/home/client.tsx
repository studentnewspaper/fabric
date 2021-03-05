import { hydrate } from "preact";
import HomePage from ".";

hydrate(<HomePage />, document.getElementById("root") as Element);
