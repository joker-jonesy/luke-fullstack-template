
# Fullstack Template

This project is dedicated to showcasing a full CRUD app.



## Project Scope

- ReactJS using Vite Template
- Server running on Express
- LESS CSS Preprocessor
- Prisma Schema and Prisma ORM
- Redux and Redux Toolkit. Also uses Redux RTK for API calls
- Authentican using JSON WebToken


## Installation

Install using npm

```bash
  npm i;
  npx prisma migrate dev
  npx prisma generate
```

Create an .env file including these variables

```bash
  DATABASE_URL="your local postgres url here"
  JWT="your secret"
```

Deploy this project to [render.com](render.com). Create a Postgres SQL and a Web Service. 

In your .env file, change your DATABASE_URL to the Postgres SQL  Internal URL
```bash
  npx prisma migrate dev
  npx prisma generate
```

Create these enviornment variables for your Web Service.

```bash
  DATABASE_URL="your internal postgres url from render here"
  JWT="generate random secret"
  VITE_URL="your url Render creates for your web service"
  NODE_VERSION="19.8.1"
```