import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import { resolvers } from "./resolvers.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

try {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
      const roleHeader = req.headers["role"];
      const role = Array.isArray(roleHeader) ? roleHeader[0] : roleHeader;
      console.log("Headers:", req.headers);
      console.log("Role header raw:", roleHeader);
      console.log("Role resolved:", role);
      console.log("Returning context:", { role: role || "employee" });
      return { role: role || "employee" };
    },
  });

  console.log(`🚀 Server ready at ${url}`);
} catch (error) {
  console.error("Server startup error:", error);
  process.exit(1);
}
