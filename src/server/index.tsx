import fastify from "fastify";
import { getCellLiveUpdates } from "../gateway/live";
import { serverRender } from "../web/home/server";
import { createReadStream } from "fs";
import { getFeaturedArticles } from "../gateway/wp";

// Partial hydration: https://github.com/preactjs/preact/issues/2364

const server = fastify();
const utf = "charset=utf-8";

server.addHook("onSend", (request, reply, payload, next) => {
  // reply.header("Cross-Origin-Opener-Policy", "same-origin");
  // reply.header("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

server.get("/", async (req, res) => {
  const [electionCellUpdates, featuredArticles] = await Promise.all([
    getCellLiveUpdates(`student-elections-2021`),
    getFeaturedArticles(3),
  ]);

  const html = serverRender({
    initialLiveElectionCell: {
      updates: electionCellUpdates,
      updatedAt: new Date().toISOString(),
    },
    featuredArticles,
  });
  res.type(`text/html; ${utf}`).send(html);
});

// TODO: Find a better way to serve resources
server.get("/resources/reset.css", (request, reply) => {
  reply
    .type(`text/css; ${utf}`)
    .send(createReadStream("./node_modules/minireset.css/minireset.min.css"));
});

server.get("/resources/home.js", (request, reply) => {
  reply
    .type(`application/javascript; ${utf}`)
    .send(createReadStream("./build/client/home.js"));
});

server.listen(8000, (err, address) => {
  if (err) throw err;
  console.log(`Server listening on ${address}`);
});
