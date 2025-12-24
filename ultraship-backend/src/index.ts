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

await server.start();

app.use(cors({
  origin: "http://localhost:3001",
  credentials: true,
  allowedHeaders: ["Content-Type", "role"],
}));
app.use(express.json());
app.use(
  "/graphql",
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

try {
  const PORT = 4000;
  await new Promise<void>((resolve) =>
    app.listen({ port: PORT }, () => resolve())
  );
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
} catch (error) {
  console.error("Server startup error:", error);
  process.exit(1);
}
