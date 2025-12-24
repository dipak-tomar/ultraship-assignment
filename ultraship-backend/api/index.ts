import serverless from "serverless-http";
import { startServer } from "../src/server.js";
import { IncomingMessage, ServerResponse } from "http";

let serverlessHandler: any;

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (!serverlessHandler) {
    const app = await startServer();
    serverlessHandler = serverless(app);
  }
  return serverlessHandler(req, res);
}
