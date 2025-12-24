import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const link = new HttpLink({
  uri: process.env.REACT_APP_API_URL || "http://localhost:4000/graphql",
  credentials: "include",
});

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
