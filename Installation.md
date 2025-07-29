<!-- FRONTEND : Installation du projet React avec Vite et Typescript -->
npm create vite@latest frontend -- --template react-ts 
cd frontend
npm i 
npm run dev
<!-- le projet est visible sur http://localhost:5173/ -->


<!-- BACKEND : -->
<!-- Initialize a new Node.js project with npm this create a package.json file -->
<!--  Install dependencies graphql and @apollo/Server this create a node_modules directory and add a package-lock.json file -->

npm init --yes && npm pkg set type="module"

npm install @apollo/server graphql

<!-- Set up with TypeScript (recommended) -->
mkdir src
touch src/index.ts

<!-- Run the following command to install the typescript and @types/node packages into your project's dev dependencies: -->
npm install --save-dev typescript @types/node

<!-- Next, create a tsconfig.json file in your project: -->
<!-- Configurer TypeScript -->
touch tsconfig.json
<!-- with this configuration  -->
{
  "compilerOptions": {
    "rootDirs": ["src"],
    "outDir": "dist",
    "lib": ["es2020"],
    "target": "es2020",
    "module": "esnext",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "types": ["node"]
  }
}

<!-- Finally, replace the default scripts entry in your package.json file with the following type and scripts entries: -->
{
  // ...etc.
  "type": "module",
  "scripts": {
    "compile": "tsc",
    "start": "npm run compile && node ./dist/index.js"
  }
  // other dependencies
}

<!-- You can now run npm start, which should successfully compile and run your empty index.ts file, printing something like this: -->
npm start




<!-- PostgreSQL + ORM -->
npm install typeorm pg

<!-- JsonWebToken -->
npm install jsonwebtoken

