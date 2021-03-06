import { hydrate } from "preact";
import HomePage from ".";

const propsString = document.getElementById("HYDRATE")?.innerHTML;
if (typeof propsString != "string") throw new Error("Could not read props");

hydrate(
  <HomePage {...JSON.parse(propsString)} />,
  document.getElementById("root") as Element
);

// if (process.env.NODE_ENV == "production") {
//   if ("serviceWorker" in navigator) {
//     window.addEventListener("load", function () {
//       navigator.serviceWorker.register("/sw.js").then(() => {
//         document.body.dispatchEvent(new CustomEvent("sw-init"));
//       });
//     });
//   }
// }
