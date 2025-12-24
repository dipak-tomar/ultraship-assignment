import { startServer } from "./server.js";

const run = async () => {
  try {
    const app = await startServer();
    const PORT = process.env.PORT || 4000;
    app.listen({ port: PORT }, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    });
  } catch (error) {
    console.error("Server startup error:", error);
    process.exit(1);
  }
};

run();
