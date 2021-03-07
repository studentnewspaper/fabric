import express from "express";
import serveCompressed from "express-static-gzip";
import compression from "compression";
import { getCellLiveUpdates, getLiveEvent } from "../gateway/live";
import renderHome from "../web/home/server";
import renderLive from "../web/live/server";
import {
  getFeaturedArticles,
  getSectionArticles,
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

const electionCellCache = new Cache(2 * 60, getCellLiveUpdates);
const sectionCache = new Cache(20 * 60, async (key) => {
  if (key == "featured") {
    return getFeaturedArticles(3);
  }
  if (key in sectionDefinitions) {
    return getSectionArticles(
      sectionDefinitions[key as keyof typeof sectionDefinitions]
    );
  }
});
server.get("/", compression(), async (req, res) => {
  const [
    electionCellUpdates,
    featuredArticles,
    ...sections
  ] = await Promise.all([
    electionCellCache.get(`student-elections-2021`),
    // TODO: Type check these keys
    sectionCache.get("featured"),
    ...Object.entries(sectionDefinitions).map(([title]) =>
      sectionCache.get(title)
    ),
  ] as Promise<any>[]);

  const html = renderHome({
    initialLiveElectionCell: {
      updates: electionCellUpdates,
      updatedAt: new Date().toISOString(),
    },
    featuredArticles,
    sections: Object.keys(sectionDefinitions).map((title, i) => ({
      title,
      articles: sections[i],
    })),
  });
  res.type("html").send(doctype + html);
});

const liveCache = new Cache(2 * 60, getLiveEvent);
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
  res.type("html").send(doctype + html);
});

server.use(
  "/static",
  serveCompressed(join(__dirname, "../static"), {
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
