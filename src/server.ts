import { createServer } from "node:http";

const hostname = "0.0.0.0";
const port = 3000;

const server = createServer((_, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World 2");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
