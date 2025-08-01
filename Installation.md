### FRONTEND SETUP
The frontend uses React, Vite, and TypeScript.

```bash
# Create React project with Vite + TypeScript template
npm create vite@latest frontend -- --template react-ts

# Enter frontend directory
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```


### BACKEND SETUP

# Initialize Node.js project
npm init --yes

# Set module type in package.json 
npm pkg set type="commonjs"

# Create source directory and main file
mkdir src
touch src/index.ts

# Install runtime dependencies
npm install @apollo/server graphql type-graphql typeorm pg jsonwebtoken class-validator reflect-metadata dotenv

# Install dev dependencies
npm install --save-dev typescript @types/node ts-node

# Configure Typescript
{
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist",
    "lib": ["es2020"],
    "target": "es2020",
    "module": "commonjs",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "types": ["node"]
  },
  "include": ["src"]
}

# Update package.json file
"scripts": {
  "compile": "tsc",
  "start": "npm run compile && node ./dist/index.js",
  "dev": "ts-node src/index.ts"
}


# Added packages:
npm install sanitize-html
npm install --save-dev @types/sanitize-html
