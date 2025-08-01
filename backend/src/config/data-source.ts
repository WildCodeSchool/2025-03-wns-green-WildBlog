import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from 'dotenv';
import { User } from "../entities/User";
import { Blog } from "../entities/Blog";
import { Tag } from "../entities/Tag";
import { Category } from "../entities/Category";
import { Post } from "../entities/Post";

dotenv.config();

const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT!),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,

    entities: [User, Blog, Tag, Category, Post],
    synchronize: true, //synchronise automatiquement la base de données(sans avoir besoin de faire des migrations : NE JAMAIS UTILISER EN PROD)
    // logging: ['error', 'query']  // verifie les erreurs et les requêtes pour débugguer
    logging: true  // verifie les erreurs et les requêtes pour débugguer

});

export default dataSource;