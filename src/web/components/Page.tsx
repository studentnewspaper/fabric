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

export const manifest = () => {
  if (process.env.NODE_ENV == "production") {
    return cachedManifest;
  }
  return loadManifest();
};

export interface PageProps {
  title?: string;
  entrypoint?: string;
  preconnectDomains?: string[];
  prefetchDocs?: string[];
  prefetchScripts?: string[];
}

const Page: FunctionComponent<PageProps> = ({
  title,
  entrypoint,
  children,
  preconnectDomains = [],
  prefetchDocs = [],
  prefetchScripts = [],
}) => {
  return (
    <html lang="en">
      <head>
        <title>{title && `${title} - `}The Student</title>
        <link rel="stylesheet" href={`/${resetUrl}`} />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        {preconnectDomains.map((domain) => (
          <link rel="preconnect" href={domain} crossOrigin="" />
        ))}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Literata:ital,wght@0,400;0,700;1,400&display=fallback"
          rel="stylesheet"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `*{box-sizing:border-box}body{color:${text.primary};font-family:${fonts.serif};line-height:${lineHeights.base}}html,body,#root{padding:0;margin:0;position:absolute;top:0;bottom:0;left:0;right:0;}`,
          }}
        ></style>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {prefetchDocs.map((href) => (
          <link rel="prefetch" href={href} as="document" />
        ))}
        {prefetchScripts.map((href, i) => (
          <link rel="prefetch" href={manifest()[href]} as="script" />
        ))}
        {process.env.NODE_ENV == "production" && (
          <>
            <script
              async
              defer
              data-domain="studentnewspaper.org"
              src="https://analytics.fabric.studentnewspaper.org/js/plausible.js"
            ></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `<script>window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }</script>`,
              }}
            ></script>
          </>
        )}
        <link rel="manifest" href="/manifest.json" />
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
        if ('serviceWorker' in navigator) {
          window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js');
          });
        }        
        `,
          }}
        ></script>
      </body>
    </html>
  );
};

export default Page;
