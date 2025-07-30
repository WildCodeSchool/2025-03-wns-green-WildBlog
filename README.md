
# 2025-03-wns-green-WildBlog  : Wild Blog

Full-stack project composed of a React frontend with Vite and TypeScript, and a Node.js backend using Apollo Server GraphQL, TypeGraphQL, TypeORM, and PostgreSQL.  
Project launched using Docker.

---

### Project Structure

- `frontend/`: React application with Vite and TypeScript.  
- `backend/`: GraphQL server in TypeScript using Apollo Server, TypeGraphQL, TypeORM, and PostgreSQL.  
- `docker-compose.yaml`: orchestrates frontend, backend, PostgreSQL database, and pgAdmin containers.

---

### Main Technologies
```
Frontend: React, Vite, TypeScript, ESLint
Backend: Node.js, Apollo Server, GraphQL, TypeGraphQL, TypeORM, PostgreSQL
Database: PostgreSQL running in Docker container
Container management: Docker Compose
```

#### Frontend

- React with TypeScript  
- Vite  
- ESLint for linting  
- Main scripts:  
  - `npm run dev`: start development mode  
  - `npm run build`: production build  

#### Backend

- Node.js in TypeScript (compiled via `tsc`)  
- Apollo Server for a GraphQL API  
- TypeGraphQL to structure the GraphQL schema using TS decorators  
- TypeORM as ORM with PostgreSQL  
- Manages entities, resolvers, validation, authentication (jsonwebtoken)  
- Main scripts:  
  - `npm run compile`: compile TS to JS in `dist/`  
  - `npm start`: compile and start the server  

#### Database

- PostgreSQL  
- Managed via TypeORM in backend  
- Access via pgAdmin  

---

## Installation & Running

1. Copy the `.env.sample` file and rename it to `.env` at the project root with the indicated variables.

```bash
cp .env.sample .env
