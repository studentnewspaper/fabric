import { HomePageProps } from ".";
import HomePage from "./index";
import ssr from "preact-render-to-string";
import { text } from "../design/palette";
import { fonts, lineHeights } from "../design/theme";
/// @ts-expect-error css import
import resetUrl from "minireset.css/minireset.css";
import Page from "../components/Page";

function serverRender(props: HomePageProps): string {
  return ssr(
    <Page entrypoint="home.js">
      <HomePage {...props} />
    </Page>
  );
}

export default serverRender;
