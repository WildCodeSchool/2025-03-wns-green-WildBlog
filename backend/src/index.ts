import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import "reflect-metadata";
import dataSource from "./config/data-source";
import { buildSchema } from 'type-graphql';
import * as dotenv from 'dotenv';
import { HelloResolver } from './resolvers/HelloResolver';
import { UserResolver } from './resolvers/UserResolver';
import { BlogResolver } from './resolvers/BlogResolver';
import { TagResolver } from './resolvers/TagResolver';
import { CategoryResolver } from './resolvers/CategoryResolver';
import { PostResolver } from './resolvers/PostResolver';
import { AuthResolver } from './resolvers/AuthResolver';
import { User } from './entities/User';
import jwt from 'jsonwebtoken';

dotenv.config();

const start = async () => {
  try {
    await dataSource.initialize();
    console.log("✅ Database connected");

    const schema = await buildSchema({
      resolvers: [AuthResolver, HelloResolver, UserResolver, BlogResolver, TagResolver, CategoryResolver, PostResolver ],
      validate: true, // active les decorators de class-validator
    });

    const server = new ApolloServer({ schema });

    const { url } = await startStandaloneServer(server, {
      
      listen: { port: 4200 },
      context: async ({ req }) => {
        console.log("Headers de la requête :", req.headers);
        console.log("Authorization header :", req.headers.authorization);
      
        const token = req.headers.authorization?.replace('Bearer ', '');
        let currentUser: User | null = null;

        if (token) {
          try {
            const payload = jwt.verify(token, process.env.JWT_SECRET_KEY!) as { id: number };
            currentUser = await User.findOne({
              where: { id: payload.id },
              relations: ["posts", "blogs"]
            });
          } catch (err) {
            console.warn("Token invalide ou expiré");
          }
        }
      
        console.log("utilisateur connecté:", currentUser?.email ?? "aucun");
      
        return { req, currentUser };
      }
    });

    console.log(`GraphQL server ready at ${url}`);
  } catch (err) {
    console.error("❌ Failed to start server:", err);
  }
};

start();
