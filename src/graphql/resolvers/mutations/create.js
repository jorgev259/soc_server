import { UserInputError } from 'apollo-server-errors'
import { composeResolvers } from '@graphql-tools/resolvers-composition'

import { img, createLog, createUpdateLog, getImgColor, slugify } from '../../../utils'
import { postReddit, postDiscord } from '../../../utils/plugins'
import { hasRole } from '../../../utils/resolvers'

const resolversComposition = { 'Mutation.*': hasRole('CREATE') }
const resolvers = {
  Mutation: {
    createAlbum: async (parent, data, { db, user }, info) => {
      return db.transaction(async () => {
        data.artists = data.artists ? data.artists.map(artist => { return { name: artist, slug: slugify(artist) } }) : []
        await db.models.artist.bulkCreate(data.artists, { ignoreDuplicates: true })

        const ost = await db.models.ost.create(data, {
          include: [db.models.disc, db.models.store, {
            model: db.models.download, include: [db.models.link]
          }]
        })

        await Promise.all([
          ost.setArtists(data.artists.map(({ slug }) => slug)),
          ost.setClasses(data.classes || []),
          ost.setCategories(data.categories || []),
          ost.setPlatforms(data.platforms || []),
          ost.setGames(data.games || []),
          ost.setAnimations(data.animations || []),
          ost.setRelated(data.related || []),
          createLog(db, 'createAlbum', data, user.username)
        ])

        const { id } = ost.dataValues
        ost.placeholder = data.cover ? await img(data.cover, 'album', id) : undefined
        ost.headerColor = data.cover ? await getImgColor(`album/${id}`) : undefined

        await ost.save()

        if (ost.status === 'show') {
          postReddit(ost)
          postDiscord(ost.id)
        }

        return ost
      })
    },

    deleteAlbum: async (parent, { id }, { db, user, res }, info) => {
      const ost = await db.models.ost.findByPk(id)
      if (!ost) throw new UserInputError('Not Found')
      return db.transaction(async () => {
        await createUpdateLog(db, 'deleteAlbum', ost, user.username)
        await ost.destroy()
        res.unstable_revalidate(`/album/${id}`)
        return 1
      })
    }
  }
}

export default composeResolvers(resolvers, resolversComposition)
