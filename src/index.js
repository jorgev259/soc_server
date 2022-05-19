import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'
import { graphqlUploadExpress } from 'graphql-upload'
import { ApolloServerPluginLandingPageDisabled, ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { loadFilesSync } from '@graphql-tools/load-files'
import path from 'path'
import { ironSession } from 'iron-session/express'

import dbModule from './sequelize/startDB'
import resolvers from './graphql/resolvers'

const db = dbModule.default || dbModule

const port = process.env.PORT || 4000
const schemas = loadFilesSync(path.join(__dirname, './graphql/schemas'))
const corsOptions = {
  origin: [
    'http://localhost:3000', 'http://localhost:4000',
    'https://sittingonclouds.net', 'https://www,sittingonclouds.net'
  ],
  credentials: true
}

async function context ({ req, res }) {
  const { username } = req.session || {}
  return { db, req, res, username, user: username && await db.models.user.findByPk(username) }
}

const server = new ApolloServer({
  typeDefs: mergeTypeDefs(schemas),
  resolvers: mergeResolvers(resolvers),
  context,
  plugins: [
    process.env.NODE_ENV === 'production'
      ? ApolloServerPluginLandingPageDisabled()
      : ApolloServerPluginLandingPageGraphQLPlayground()
  ]
})

startServer()

async function startServer () {
  if (process.env.NODE_ENV === 'production' || process.env.SYNC) db.sync()
  await server.start()

  const app = express()
  app.use(graphqlUploadExpress())
  app.use(ironSession({ password: process.env.IRONCLAD, cookieName: 'socuser' }))

  server.applyMiddleware({ app, path: '/graphql', cors: corsOptions })
  await app.listen({ port })

  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
}
