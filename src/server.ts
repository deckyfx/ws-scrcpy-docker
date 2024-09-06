import { createServer, IncomingMessage, ServerResponse } from "node:http";
import fs from "node:fs";
import qs from "querystring";
import { exec } from "child_process";

type POSTConnectPayoad = {
  ip: string;
  port: string;
};

type POSTPairPayoad = {
  ip: string;
  pair_port: string;
  pair_code: string;
};

const hostname = "0.0.0.0";
const port = process.env.WS_SCRCPY_UI_PORT
  ? Number(process.env.WS_SCRCPY_UI_PORT)
  : 3000;

const sendOK = (res: ServerResponse<IncomingMessage>) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("OK");
};

const sendNotOK = (res: ServerResponse<IncomingMessage>, message?: string) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end(message || "Not OK");
};

const sendNotFound = (res: ServerResponse<IncomingMessage>) => {
  res.statusCode = 404;
  res.setHeader("Content-Type", "text/plain");
  res.end("Not Found");
};

const sendIndex = (res: ServerResponse<IncomingMessage>, html: string) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.write(html.toString());
  res.end();
};

fs.readFile("./views/index.html", function (err, html) {
  if (err) {
    throw err;
  }
  const server = createServer((req, res) => {
    if (req.method !== "POST") {
      sendIndex(res, html.toString());
      return;
    }

    let body = "";

    req.on("data", (data) => {
      body += data;
      // Too much POST data, kill the connection!
      // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
      if (body.length > 1e6) req.connection.destroy();
    });

    req.on("end", () => {
      const post = qs.parse(body);

      switch (req.url) {
        case "/connect": {
          const data = post as POSTConnectPayoad;
          if (!data.ip || !data.port) {
            sendNotOK(res, "missing arguments");
            return;
          }
          exec(
            `adb connect ${data.ip}:${data.port}`,
            (error, stdout, stderr) => {
              if (error) {
                console.error(`Error: ${error}`);
                sendNotOK(res, error.message);
                return;
              } else {
                if (stdout.includes("failed")) {
                  console.log(`stdout: ${stdout}`);
                  sendNotOK(res, stdout);
                  return;
                }
                sendOK(res);
                return;
              }
            }
          );
          return;
        }
        case "/pair": {
          const data = post as POSTPairPayoad;
          if (!data.ip || !data.pair_port || !data.pair_code) {
            sendNotOK(res, "missing arguments");
            return;
          }
          exec(
            `adb pair ${data.ip}:${data.pair_port} ${data.pair_code}`,
            (error, stdout, stderr) => {
              if (error) {
                console.error(`Error: ${error}`);
                sendNotOK(res, error.message);
                return;
              } else {
                if (stdout.includes("failed")) {
                  console.log(`stdout: ${stdout}`);
                  sendNotOK(res, stdout);
                  return;
                }
                sendOK(res);
                return;
              }
            }
          );
          return;
        }
      }

      sendNotFound(res);
      return;
    });
  });
  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
});
