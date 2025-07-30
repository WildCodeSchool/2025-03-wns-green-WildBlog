import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import "reflect-metadata";
import dataSource from "./config/data-source";
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/HelloResolver';
import { UserResolver } from './resolvers/UserResolver';

const start = async () => {
  try {
    await dataSource.initialize();
    console.log("✅ Database connected");

    const schema = await buildSchema({
      resolvers: [HelloResolver, UserResolver],
    });

    const server = new ApolloServer({ schema });

    const { url } = await startStandaloneServer(server, {
      listen: { port: 4200 },
    });

    console.log(`🚀 GraphQL server ready at ${url}`);
  } catch (err) {
    console.error("❌ Failed to start server:", err);
  }
};

start();
