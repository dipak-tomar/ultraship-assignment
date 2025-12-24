import { ApolloServer } from "@apollo/server";
import { expressMiddleware, ExpressContextFunctionArgument } from "@apollo/server/express4";
import express from "express";
import cors from "cors";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";

interface Context {
  role: string;
}

const app = express();
const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
});

const startServer = async () => {
  await server.start();

  app.use(cors({
    origin: true,
    credentials: true,
    allowedHeaders: ["Content-Type", "role"],
  }));
  
  // Health check / Root handler
  app.get("/", (req, res) => {
    res.send("UltraShip Backend is running. GraphQL is at /graphql");
  });

  app.use(
    "/graphql",
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }: ExpressContextFunctionArgument) => {
        const roleHeader = req.headers["role"];
        const role = Array.isArray(roleHeader) ? roleHeader[0] : roleHeader;
        console.log("Headers:", req.headers);
        console.log("Role header raw:", roleHeader);
        console.log("Role resolved:", role);
        console.log("Returning context:", { role: role || "employee" });
        return { role: role || "employee" };
      },
    }) as unknown as express.RequestHandler
  );
  
  return app;
};

export { startServer };
export default app;
