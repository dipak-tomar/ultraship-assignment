import serverless from "serverless-http";
import { startServer } from "../src/server.js";

let serverlessHandler: any;

export default async (req: any, res: any) => {
  if (!serverlessHandler) {
    const app = await startServer();
    serverlessHandler = serverless(app);
  }
  return serverlessHandler(req, res);
};
