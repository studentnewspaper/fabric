import fastify from "fastify";
import { getCellLiveUpdates, getLiveEvent } from "../gateway/live";
import renderHome from "../web/home/server";
import renderLive from "../web/live/server";
import serve from "fastify-static";
import {
  getFeaturedArticles,
  getSectionArticles,
  sectionDefinitions,
} from "../gateway/wp";
import { join } from "path";

// Partial hydration: https://github.com/preactjs/preact/issues/2364

const server = fastify();
const utf = "charset=utf-8";

server.addHook("onSend", (request, reply, payload, next) => {
  reply.header("Cross-Origin-Opener-Policy", "same-origin");
  // reply.header("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

server.get("/", async (req, res) => {
  const [
    electionCellUpdates,
    featuredArticles,
    ...sections
  ] = await Promise.all([
    getCellLiveUpdates(`student-elections-2021`),
    getFeaturedArticles(3),
    ...Object.entries(sectionDefinitions).map(([_title, categories]) =>
      getSectionArticles(categories)
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
  res.type(`text/html; ${utf}`).send(html);
});

server.get("/live", async (req, res) => {
  const event = await getLiveEvent("student-elections-2021");
  if (event == null) {
    return res.status(404).send("Not found");
  }

  const html = renderLive({ event });
  res.type(`text/html; ${utf}`).send(html);
});

server.register(serve, {
  root: join(__dirname, "static"),
  prefix: "/static",
});

server.listen(8000, (err, address) => {
  if (err) throw err;
  console.log(`Server listening on ${address}`);
});
