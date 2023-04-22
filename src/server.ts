import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import {expressjwt as jwt} from "express-jwt";
import express from 'express';
import http from 'http';
import cors from 'cors';
import mongoose from "mongoose";
import bodyParser from 'body-parser';

import { getSchema } from "./schema";
import geoip from "geoip-lite";
import MobileDetect from "mobile-detect";
import dotenv from "dotenv";
import { Context } from "./resolvers/auth/context";

dotenv.config();

const graphQlPath = process.env.GRAPHQL_PATH;
const port = process.env.PORT;
const dbUrl = process.env.MONGODB_URL

mongoose.connect(dbUrl, {
    autoIndex: true,
}).then(() => {
    console.log("connected to mongodb")
}).catch((e) => {
    console.log(e);
})

const auth = jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    credentialsRequired: false,
})

async function startApolloServer() {
// Required logic for integrating with Express
    const app = express();
// Our httpServer handles incoming requests to our Express app.
// Below, we tell Apollo Server to "drain" this httpServer,
// enabling our servers to shut down gracefully.
    const httpServer = http.createServer(app);

// Same ApolloServer initialization as before, plus the drain plugin
// for our httpServer.

    const schema = await getSchema();
    const server = new ApolloServer({
        schema,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer })
        ],
        introspection: true,

    });

    await server.start();

    app.use(
      graphQlPath,
      cors({
        origin: '*'
      }),
      bodyParser.json(),
        expressMiddleware(server, {
            context: async ({ req }) => {
                const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
                const context: Context = {
                    req,
                    user: req.user,
                    ip,
                    location: geoip.lookup(ip),
                    md: new MobileDetect(req.headers['user-agent']),
                }
                return context;
            },
        }),
    )
    await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000/`);

}
startApolloServer().then(r => console.log(r))
