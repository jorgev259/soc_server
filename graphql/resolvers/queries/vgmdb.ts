import getVGMDB from '@sittingonclouds/vgmdb-parser'

const resolvers = {
  Query: {
    vgmdb: (_, { url }) => getVGMDB(url)
  }
}

export default resolvers
