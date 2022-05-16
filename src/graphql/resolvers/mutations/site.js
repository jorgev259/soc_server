import { composeResolvers } from '@graphql-tools/resolvers-composition'
import { img } from '../../../utils'
import { hasRole } from '../../../utils/resolvers'

const resolversComposition = { 'Mutation.*': hasRole('UPDATE') }
const resolvers = {
  Mutation: {
    config: async (parent, data, { db, payload }, info) =>
      db.models.config.upsert(data)
        .then(() => db.models.config.findByPk(data.name)),

    uploadBanner: async (parent, { banner }, { db, payload }) => {
      const timestamp = Date.now()
      await img(banner, 'live', timestamp)
      await db.models.config.upsert({ name: 'banner', value: timestamp })

      return 1
    }
  }
}

export default composeResolvers(resolvers, resolversComposition)
