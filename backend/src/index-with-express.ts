import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import "reflect-metadata";
import dataSource from "./config/data-source";
import { buildSchema } from 'type-graphql';
import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { HelloResolver } from './resolvers/HelloResolver';
import { UserResolver } from './resolvers/UserResolver';
import { BlogResolver } from './resolvers/BlogResolver';
import { TagResolver } from './resolvers/TagResolver';
import { CategoryResolver } from './resolvers/CategoryResolver';
import { PostResolver } from './resolvers/PostResolver';
import { CommentResolver } from './resolvers/CommentResolver';
import { LikeResolver } from './resolvers/LikeResolver';
import { AuthResolver } from './resolvers/AuthResolver';
import { User } from './entities/User';
import jwt from 'jsonwebtoken';

dotenv.config();

const start = async () => {
  try {
    await dataSource.initialize();
    console.log("✅ Database connected");

    const schema = await buildSchema({
      resolvers: [AuthResolver, HelloResolver, UserResolver, BlogResolver, TagResolver, CategoryResolver, PostResolver, CommentResolver, LikeResolver ],
      validate: true, // active les decorators de class-validator
    });

    // Créer l'application Express
    const app = express();

    // Middleware CORS
    app.use(cors());
    
    // Servir les fichiers statiques (images, etc.)
    app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
    
    // Créer le serveur Apollo
    const server = new ApolloServer({ schema });
    await server.start();

    // Appliquer Apollo GraphQL middleware sur Express
    app.use('/graphql', 
      express.json(), 
      expressMiddleware(server, {
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
      })
    );

    // Démarrer le serveur
    app.listen(4200, () => {
      console.log(`🚀 Server ready at http://localhost:4200/graphql`);
      console.log(`📁 Static files served at http://localhost:4200/uploads`);
    });

  } catch (err) {
    console.error("❌ Failed to start server:", err);
  }
};

start();