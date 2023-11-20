import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'
import { graphqlUploadExpress } from 'graphql-upload'
import { ApolloServerPluginLandingPageDisabled, ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { loadFilesSync } from '@graphql-tools/load-files'
import path from 'path'
import { getIronSession } from 'iron-session'

import dbModule from './sequelize/startDB'
import resolvers from './graphql/resolvers'

const db = dbModule.default || dbModule
const isProd = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 4000
const schemas = loadFilesSync(path.join(__dirname, './graphql/schemas'))
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://sittingonclouds.net', 'https://www.sittingonclouds.net',
    'https://sittingonclouds.com', 'https://www.sittingonclouds.com',
    'https://sittingonclouds.org', 'https://www.sittingonclouds.org',
    'https://sittingonclouds.ru', 'https://www.sittingonclouds.ru',
    'https://sittingonclouds.to', 'https://www.sittingonclouds.to'
  ],
  credentials: true
}
const sessionOptions = {
  password: process.env.IRONCLAD,
  cookieName: 'socuser'
}

async function context ({ req, res }) {
  const session = await getIronSession(req, res, sessionOptions)
  const { username } = session

  return { db, req, res, session, username, user: username && await db.models.user.findByPk(username) }
}

const server = new ApolloServer({
  typeDefs: mergeTypeDefs(schemas),
  resolvers: mergeResolvers(resolvers),
  context,
  plugins: [
    isProd
      ? ApolloServerPluginLandingPageDisabled()
      : ApolloServerPluginLandingPageGraphQLPlayground()
  ]
})

startServer()

async function startServer () {
  // db.sync()
  if (isProd || process.env.SYNC) db.sync()
  await server.start()

  const app = express()
  app.use(graphqlUploadExpress())

  server.applyMiddleware({ app, path: '/', cors: corsOptions })
  await app.listen({ port, host: '0.0.0.0' })

  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
}
