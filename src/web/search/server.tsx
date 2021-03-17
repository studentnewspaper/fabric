import SearchPage, { SearchPageProps } from ".";
import ssr from "preact-render-to-string";
import Page from "../components/Page";

function serverRender(props: SearchPageProps): string {
  const stylesheet = (
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.4.5/themes/satellite-min.css"
      integrity="sha256-TehzF/2QvNKhGQrrNpoOb2Ck4iGZ1J/DI4pkd2oUsBc="
      ///@ts-expect-error prop not typed yet
      crossorigin="anonymous"
    />
  );

  return ssr(
    <Page title="Search" entrypoint="search.js" otherHead={stylesheet}>
      <SearchPage {...props} />
    </Page>
  );
}

export default serverRender;
