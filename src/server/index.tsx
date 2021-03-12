import express from "express";
import serveCompressed from "express-static-gzip";
import compression from "compression";
import { getCellLiveUpdates, getLiveEvent } from "../gateway/live";
import renderHome from "../web/home/server";
import renderLive from "../web/live/server";
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

const electionCellCache = new Cache(2 * 60, getCellLiveUpdates, [
  `student-elections-2021`,
]);
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
  const [
    electionCellUpdates,
    featuredArticles,
    ...sections
  ] = await Promise.all([
    electionCellCache.get(`student-elections-2021`),
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
    interviews: [
      {
        name: "Alfie Garland",
        slug: "the-student-meets-alfie-garland",
        imageUrl: createImageUrl(
          "2021/03/158349541_3629901077079196_8760039522844051971_o-e1615232170644.jpg"
        ),
      },
      {
        name: "Ellen Macrae",
        slug:
          "we-need-a-president-with-experience-ellen-macrae-on-her-re-election-campaign",
        imageUrl: createImageUrl(
          "2021/03/candidate-photo2-1-e1615231715976.jpg"
        ),
      },
      {
        name: "Jason Gallagher",
        slug:
          "i-will-turn-up-at-every-msps-house-in-this-country-interview-with-jason-gallagher",
        imageUrl: createImageUrl("2021/03/image1-1-e1615231599166.jpeg"),
      },
      {
        name: "Rakshit Dalal",
        slug: "the-student-meets-rakshit-dalal",
        imageUrl: createImageUrl(
          "2021/03/MicrosoftTeams-image-1-scaled-e1615231440127.jpg"
        ),
      },
      {
        name: "Tom Ely-Corbett",
        slug: "the-student-meets-tom-ely-corbett",
        imageUrl: createImageUrl(
          "2021/03/158747032_2393387444138204_5710872180779573610_n-e1615232704700.jpg"
        ),
      },
    ],
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
