import { HomePageProps } from ".";
import HomePage from "./index";
import ssr from "preact-render-to-string";
import Page from "../components/Page";

function serverRender(props: HomePageProps): string {
  return ssr(
    <Page
      entrypoint="home.js"
      preconnectDomains={[`https://i0.wp.com`]}
      prefetchDocs={[`/live/student-elections-2021`]}
      prefetchScripts={["live.js"]}
    >
      <HomePage {...props} />
    </Page>
  );
}

export default serverRender;
