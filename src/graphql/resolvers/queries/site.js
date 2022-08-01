import fg from 'fast-glob'
import { composeResolvers } from '@graphql-tools/resolvers-composition'

import { hasRole } from '../../../utils/resolvers'

const resolversComposition = { 'Query.banners': hasRole('UPDATE') }
const resolvers = {
  Query: {
    config: (parent, { name }, { db, req }, info) => {
      return db.models.config.findOrCreate({ where: { name } })
        .then(() => db.models.config.findByPk(name))
    },

    highlight: async (parent, args, { db }) => {
      const { value } = await db.models.config.findByPk('highlight')
      return db.models.album.findByPk(value)
    },

    banners: async (parent, args) => {
      const filePaths = await fg(['/var/www/soc_img/img/live/**/*.png'])
      const images = filePaths.map(f => f.split('/').pop())

      return images
    }
  }
}

export default composeResolvers(resolvers, resolversComposition)
