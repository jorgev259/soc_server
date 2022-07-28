import { composeResolvers } from '@graphql-tools/resolvers-composition'
// import axios from 'axios'

import { isAuthed } from '../../../utils/resolvers'

// const token = process.env.IRONCLAD

const resolversComposition = {
  'Mutation.*': [isAuthed]
}

const resolvers = {
  Mutation: {
    updateComment: async (_, { text, anon, ostId }, { db, user, res }) => (
      db.transaction(async transaction => {
        const { username } = user
        const row = await db.models.comment.findOne({ where: { ostId, username } })

        if (row) {
          await row.update({ text, anon }, { transaction })
          await row.save({ transaction })
        } else await db.models.comment.create({ ostId, username, text, anon }, { transaction })

        return true
      })
    ),
    addFavorite: async (_, { ostId }, { db, user, res }) => (
      db.transaction(async transaction => {
        await user.addOst(ostId, { transaction })
        return true
      })
    ),
    removeFavorite: async (_, { ostId }, { db, user, res }) => (
      db.transaction(async transaction => {
        await user.removeOst(ostId, { transaction })
        return true
      })
    ),
    rateAlbum: async (_, { ostId, score }, { db, user, res }) => (
      db.transaction(async transaction => {
        const { username } = user
        const row = await db.models.rating.findOne({ where: { ostId, username } })

        if (row) {
          await row.update({ score }, { transaction })
          await row.save({ transaction })
        } else await db.models.rating.create({ ostId, username, score }, { transaction })

        return true
      })
    )
  }
}

export default composeResolvers(resolvers, resolversComposition)
