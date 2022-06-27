import { UserInputError } from 'apollo-server-errors'
import { composeResolvers } from '@graphql-tools/resolvers-composition'

import { img, createLog, createUpdateLog, getImgColor, slugify } from '../../../utils'
import { postReddit, postDiscord, discordClient } from '../../../utils/plugins'
import { hasRole } from '../../../utils/resolvers'
import { completeRequest } from '@lotus-tree/requestcat/lib/util'

const resolversComposition = { 'Mutation.*': hasRole('CREATE') }
const resolvers = {
  Mutation: {
    createAlbum: async (parent, data, { db, user }, info) => (
      db.transaction(async transaction => {
        data.artists = data.artists ? data.artists.map(artist => { return { name: artist, slug: slugify(artist) } }) : []
        await db.models.artist.bulkCreate(data.artists, { ignoreDuplicates: true, transaction })

        const ost = await db.models.ost.create(data, {
          include: [db.models.disc, db.models.store, {
            model: db.models.download, include: [db.models.link]
          }],
          transaction
        })

        await Promise.all([
          ost.setArtists(data.artists.filter(({ slug }) => slug.length > 0).map(({ slug }) => slug), { transaction }),
          ost.setCategories(data.categories || [], { transaction }),
          ost.setClassifications(data.classifications || [], { transaction }),
          ost.setPlatforms(data.platforms || [], { transaction }),
          ost.setGames(data.games || [], { transaction }),
          ost.setAnimations(data.animations || [], { transaction }),
          ost.setRelated(data.related || [], { transaction }),
          createLog(db, 'createAlbum', data, user.username, transaction)
        ])

        const { id } = ost.dataValues
        ost.placeholder = data.cover ? await img(data.cover, 'album', id) : undefined
        ost.headerColor = data.cover ? await getImgColor(`album/${id}`) : undefined

        await ost.save({ transaction })

        if (ost.status === 'show') {
          if (data.request) {
            db.models.request.findByPk(data.request)
              .then(async request => {
                if (request.state === 'complete') return

                await completeRequest(discordClient, db, process.env.GUILD, request)
                const guild = await discordClient.guilds.fetch(process.env.GUILD)
                await guild.channels.fetch()

                const userText = request.userID || request.user
                  ? ` ${request.userID ? `<@${request.userID}>` : `@${request.user}`} :arrow_down:`
                  : ''

                guild.channels.cache
                  .find(c => c.name === 'last-added-soundtracks')
                  .send(`https://www.sittingonclouds.net/album/${id}${userText}`)
              })
          } else {
            postDiscord(ost.id)
          }

          postReddit(ost)
        }

        return ost
      })
    ),

    deleteAlbum: async (parent, { id }, { db, user, res }, info) => {
      const ost = await db.models.ost.findByPk(id)
      if (!ost) throw new UserInputError('Not Found')
      return db.transaction(async transaction => {
        await createUpdateLog(db, 'deleteAlbum', ost, user.username, transaction)
        await ost.destroy({ transaction })
        // res.unstable_revalidate(`/album/${id}`)
        return 1
      })
    }
  }
}

export default composeResolvers(resolvers, resolversComposition)
