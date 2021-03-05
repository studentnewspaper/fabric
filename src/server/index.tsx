import fastify from "fastify";
import { getCellLiveUpdates } from "../gateway/live";
import { serverRender } from "../web/home/server";
import { createReadStream } from "fs";

// Partial hydration: https://github.com/preactjs/preact/issues/2364

const server = fastify();
const utf = "charset=utf-8";

server.addHook("onSend", (request, reply, payload, next) => {
  reply.header("Cross-Origin-Opener-Policy", "same-origin");
  reply.header("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

server.get("/", async (req, res) => {
  const electionCellUpdates = await getCellLiveUpdates(
    `student-elections-2021`
  );

  const html = serverRender({
    initialLiveElectionCell: {
      updates: electionCellUpdates,
      updatedAt: new Date().toISOString(),
    },
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
