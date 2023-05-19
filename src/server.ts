import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import express from 'express'
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'

import { getSchema } from './schema'
import geoip from 'geoip-lite'
import MobileDetect from 'mobile-detect'
import dotenv from 'dotenv'
import { Context } from './types/context'
import { connectToMongo } from './mongo'

dotenv.config()

const graphQlPath = process.env.GRAPHQL_PATH

//TODO: check i18next-fs-backend

async function startApolloServer() {
// Required logic for integrating with Express
  const app = express()
  // Our httpServer handles incoming requests to our Express app.
  // Below, we tell Apollo Server to "drain" this httpServer,
  // enabling our servers to shut down gracefully.
  const httpServer = http.createServer(app)

  // Same ApolloServer initialization as before, plus the drain plugin
  // for our httpServer.

  const schema = await getSchema()
  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
    introspection: true,

  })

  await server.start()

  app.use(
    graphQlPath,
    cors({
      origin: '*',
    }),
    bodyParser.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress) as string
        const context: Context = {
          req,
          user: req.user,
          ip,
          location: geoip.lookup(ip),
          md: new MobileDetect(req.headers['user-agent']),
        }
        return context
      },
    }),
  )

  await new Promise<void>((resolve) => httpServer.listen({ port: process.env.PORT }, resolve))
  console.log('🚀 Server ready at http://localhost:4000/')
  await connectToMongo()
}
startApolloServer().catch((e) => console.log('cannot start server', e))
