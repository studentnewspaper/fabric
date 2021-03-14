import express from "express";
import serveCompressed from "express-static-gzip";
import compression from "compression";
import { getCellLiveUpdates, getLiveEvent } from "../gateway/live";
import renderHome from "../web/home/server";
import renderLive from "../web/live/server";
import renderSearch from "../web/search/server";
import {
  createImageUrl,
  getFeaturedArticles,
  getSectionArticles,
  getTagArticles,
  sectionDefinitions,
} from "../gateway/wp";
import { join } from "path";
import Cache from "./cache";

// Partial hydration: https://github.com/preactjs/preact/issues/2364

const server = express();
const utf = "charset=utf-8";
const doctype = "<!DOCTYPE html>";

server.use((_req, res, next) => {
  res.header("Cross-Origin-Opener-Policy", "same-origin");
  // res.header("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

// Clients should check more frequently than the CDN
// Happy medium for clients getting updates quickly once CDN updated
const cacheHeader = (maxAge = 120) =>
  `public, max-age ${Math.floor(
    maxAge / 2
  )}, s-maxage ${maxAge}, stale-while-revalidate 1800, stale-if-error 432000`;

const sectionCache = new Cache(
  20 * 60,
  async (key) => {
    if (key == "featured") {
      return getFeaturedArticles(3);
    }
    if (key in sectionDefinitions) {
      return getSectionArticles(
        sectionDefinitions[key as keyof typeof sectionDefinitions]
      );
    }
  },
  Object.keys(sectionDefinitions)
);
server.get("/", compression(), async (req, res) => {
  const [featuredArticles, ...sections] = await Promise.all([
    sectionCache.get("featured"),
    ...Object.entries(sectionDefinitions).map(([title]) =>
      sectionCache.get(title)
    ),
  ] as Promise<any>[]);

  const html = renderHome({
    featuredArticles,
    sections: Object.keys(sectionDefinitions).map((title, i) => ({
      title,
      articles: sections[i],
    })),
  });
  res
    .type("html")
    .set("Cache-Control", cacheHeader(4 * 60))
    .send(doctype + html);
});

const liveCache = new Cache(2 * 60, getLiveEvent, ["student-elections-2021"]);
server.get<{ slug: string }>("/live/:slug", compression(), async (req, res) => {
  const slug = req.params.slug;
  const event = await liveCache.get(slug);
  if (event == null) {
    return res.status(404).send("Not found");
  }

  const html = renderLive({
    slug,
    initialEvent: event,
    firstUpdatedAt: new Date().toISOString(),
  });
  res
    .type("html")
    .set("Cache-Control", cacheHeader())
    .send(doctype + html);
});

server.get("/search", compression(), async (req, res) => {
  const html = renderSearch({});
  res
    .type("html")
    .set("Cache-Control", cacheHeader(60 * 60 * 24 * 7 * 8))
    .send(doctype + html);
});

const staticDir = join(__dirname, "../static");

server.get(
  "/service-worker.js",
  serveCompressed(staticDir, {
    enableBrotli: true,
    orderPreference: ["br"],
    index: false,
    serveStatic: { cacheControl: true, maxAge: 0 },
  })
);

server.use(
  "/static",
  serveCompressed(staticDir, {
    enableBrotli: true,
    orderPreference: ["br"],
    index: false,
    serveStatic: { cacheControl: true, immutable: true, maxAge: "1yr" },
  })
);

const port = process.env.PORT ?? 8000;

server.listen(port, () => {
  console.log(`Server listening on *:${port}`);
});
