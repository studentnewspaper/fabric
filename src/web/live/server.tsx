import LivePage, { LivePageProps } from ".";
import ssr from "preact-render-to-string";
import Page from "../components/Page";

function serverRender(props: LivePageProps): string {
  return ssr(
    <Page title={props.initialEvent.title} entrypoint="live.js">
      <LivePage {...props} />
    </Page>
  );
}

export default serverRender;
