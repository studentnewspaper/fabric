import fastify from "fastify";
import { serverRender } from "../web/home/server";

const server = fastify();

server.addHook("onSend", (request, reply, payload, next) => {
  reply.header("Cross-Origin-Opener-Policy", "same-origin");
  reply.header("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

server.get("/", (req, res) => {
  const html = serverRender({});
  res.type("text/html; charset=utf-8").send(html);
});

server.listen(8000, (err, address) => {
  if (err) throw err;
  console.log(`Server listening on ${address}`);
});
