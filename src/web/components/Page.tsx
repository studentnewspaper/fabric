if (typeof window != "undefined")
  throw new Error("Component can only be instantiated on server");

import { FunctionComponent } from "preact";
/// @ts-expect-error css import
import resetUrl from "minireset.css/minireset.css";
import { text } from "../design/palette";
import { fonts, lineHeights } from "../design/theme";
import { readFileSync } from "fs";
import { resolve } from "path";

function loadManifest(): { [entrypoint: string]: string } {
  const manifest = JSON.parse(
    readFileSync(resolve(__dirname, "../static/manifest.json"), "utf8")
  );
  return manifest;
}

const cachedManifest = loadManifest();

const manifest = () => {
  if (process.env.NODE_ENV == "production") {
    return cachedManifest;
  }
  return loadManifest();
};

export interface PageProps {
  title?: string;
  entrypoint?: string;
}

const Page: FunctionComponent<PageProps> = ({
  title,
  entrypoint,
  children,
}) => {
  return (
    <html lang="en">
      <head>
        <title>{title && `${title} - `}The Student</title>
        <link rel="stylesheet" href={`/${resetUrl}`} />
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div id="root">{children}</div>
        {children != null &&
          typeof children == "object" &&
          "props" in children && (
            <script
              id="HYDRATE"
              type="application/json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(children.props),
              }}
            />
          )}
        {entrypoint != null && (
          <>
            <script src={manifest()["commons.js"]} defer></script>
            <script src={manifest()[entrypoint]} defer></script>
          </>
        )}
        <script
          dangerouslySetInnerHTML={{
            __html: `console.log("Designed and developed by Nicholas Bush and Isabella Ronca, March 2021");`,
          }}
        ></script>
      </body>
    </html>
  );
};

export default Page;
