import "reflect-metadata";
import "dotenv/config";
import { buildSchema } from "type-graphql";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { startApolloServer } from "./apollo-server";
import { initDataLayer } from "./orm";
import { resolvers } from "./orm/@generated/type-graphql";

export const getGraphqlSchema = async (): Promise<any> => {
  const schema = await await buildSchema({
    resolvers,
    validate: false,
  });
  // const schema = makeExecutableSchema(customSchema as any);

  return {
    schema,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    middleware: [],
  };
};

async function main() {
  initDataLayer();
  const schema = await getGraphqlSchema();
  await startApolloServer(schema);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
