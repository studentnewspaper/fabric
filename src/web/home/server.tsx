import { HomePageProps } from ".";
import HomePage from "./index";
import ssr from "preact-render-to-string";
import { text } from "../design/palette";
import { fonts, lineHeights } from "../design/theme";
/// @ts-expect-error css import
import resetUrl from "minireset.css/minireset.css";

export function serverRender(props: HomePageProps): string {
  return ssr(
    <html>
      <head>
        <title>The Student</title>
        <link rel="stylesheet" href={resetUrl} />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Literata:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `*{box-sizing:border-box}body{color:${text.primary};font-family:${fonts.serif};line-height:${lineHeights.base}}html,body,#root{padding:0;margin:0;position:absolute;top:0;bottom:0;left:0;right:0;}`,
          }}
        ></style>
      </head>
      <body>
        <div id="root">{<HomePage {...props} />}</div>
        <script
          id="HYDRATE"
          type="application/json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(props) }}
        />
        <script src="/static/home.js" async></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `console.log("Designed and developed by Nicholas Bush and Isabella Ronca, March 2021");`,
          }}
        ></script>
      </body>
    </html>
  );
}
