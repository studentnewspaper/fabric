import { HomePageProps } from ".";
import HomePage from "./index";
import ssr from "preact-render-to-string";
import { text } from "../design/palette";
import { fonts, lineHeights } from "../design/theme";

export function serverRender(props: HomePageProps): string {
  return ssr(
    <html>
      <head>
        <title>The Student</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Literata:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `*{box-sizing:border-box}body{color:${text.primary};font-family:${fonts.serif};line-height:${lineHeights.base}}html,body,#root{padding:0;margin:0;width:100%;height:100%;overflow:hidden;}`,
          }}
        ></style>
      </head>
      <body>
        <div id="root">{<HomePage {...props} />}</div>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.HYDRATE={props:${JSON.stringify(props)}};`,
          }}
        />
      </body>
    </html>
  );
}
