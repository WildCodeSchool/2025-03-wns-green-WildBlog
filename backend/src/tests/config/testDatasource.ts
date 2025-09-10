// import "reflect-metadata";
// import { DataSource } from "typeorm";
// import * as dotenv from 'dotenv';
// import { User } from "../entities/User";
// import { Blog } from "../entities/Blog";
// import { Tag } from "../..entities/Tag";

import "reflect-metadata";
import * as dotenv from 'dotenv';
import { DataSource } from "typeorm";
import { Blog } from "../../entities/Blog";
import { Tag } from "../../entities/Tag";
import { User } from "../../entities/User";

// dotenv.config();

// const dataSource = new DataSource({
//     type: 'postgres',
//     host: process.env.DB_HOST,
//     port: parseInt(process.env.DB_PORT!),
//     username: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE,

//     entities: [User, Blog, Tag],
//     synchronize: true, //synchronise automatiquement la base de données(sans avoir besoin de faire des migrations : NE JAMAIS UTILISER EN PROD)
//     // logging: ['error', 'query']  // verifie les erreurs et les requêtes pour débugguer
//     logging: true  // verifie les erreurs et les requêtes pour débugguer

// });

// export default dataSource;



const testDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_TEST_DATABASE, // base dédiée aux tests
    entities: [User, Blog, Tag],
    synchronize: true,   // recrée le schéma à chaque init
    dropSchema: true,    // supprime les tables existantes à chaque init
    logging: false,      // désactiver le logging pour les tests
  });

  export default testDataSource;