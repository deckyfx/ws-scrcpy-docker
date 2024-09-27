import { server, get, post, file, text } from "@decky.fx/node-server";

import * as cp from "node:child_process";

import util from "node:util";

const hostname = "0.0.0.0";
const port = 3000;

const exec = util.promisify(cp.exec);

type Payload = {
  ip: string;
  port: string;
  pair_port: string;
  pair_code: string;
};

get("/", async (_, res, __) => {
  res.end(file("./views/index.html"));
  return true;
});

post("/connect", async (_, res, data) => {
  const body = data.body as Payload | undefined;

  if (!body || !body.ip || !body.port) {
    text(res, "missing arguments");
    return;
  }

  const error = await runAdb(`adb connect ${body.ip}:${body.port}`);
  if (error) {
    text(res, error);
    return;
  }
  text(res, "OK");
  return;
});

post("/pair", async (_, res, data) => {
  const body = data.body as Payload | undefined;

  if (!body || !body.ip || !body.pair_port || !body.pair_code) {
    text(res, "missing arguments");
    return;
  }

  const error = await runAdb(
    `adb pair ${body.ip}:${body.pair_port} ${body.pair_code}`
  );
  if (error) {
    text(res, error);
    return;
  }
  text(res, "OK");
  return;
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

async function runAdb(command: string) {
  return new Promise<string>(async (resolve) => {
    try {
      const { stdout } = await exec(command);
      if (stdout.includes("failed")) {
        console.log(`stdout: ${stdout}`);
        resolve(stdout);
        return;
      }
      resolve("");
      return;
    } catch (error: any) {
      console.error(`Error: ${error}`);
      resolve(error.message);
      return;
    }
  });
}
