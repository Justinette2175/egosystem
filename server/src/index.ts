import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import resolvers from "./resolvers";
import graphqlTypes from "./graphqlTypes";
import "./typeORM/index";

const {
  ApolloServerPluginLandingPageLocalDefault
} = require("apollo-server-core");

async function main() {
  const server = new ApolloServer({
    typeDefs: graphqlTypes,
    resolvers,
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })]
  });
  await server.listen(4000);
  console.log("Server started on http://localhost:4000");
}

main();
