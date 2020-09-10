import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";

import { buildSchemaSync } from "type-graphql";
import { PrismaClient } from "@prisma/client";
import graphiql from "graphql-playground-middleware-express";
import { EmployeeResolver, EmployeeRelationsResolver } from "@/resolvers";

const express = require("express");
const serverless = require("serverless-http");
const prisma = new PrismaClient();

const server = new ApolloServer({
  schema: buildSchemaSync({
    resolvers: [EmployeeResolver, EmployeeRelationsResolver],
  }),
  context: { prisma },
});

const app = express();

app.get("/playground", graphiql({ endpoint: "/graphql" }));

server.applyMiddleware({ app });

const graphqlHandler = serverless(app);
export { graphqlHandler };
