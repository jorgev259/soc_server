import { composeResolvers } from '@graphql-tools/resolvers-composition'

import { isAuthed } from '../../../utils/resolvers'

const resolversComposition = {
  'Mutation.*': [isAuthed]
}

const resolvers = {
  Mutation: {
    updateComment: async (_, { text, anon, ostId }, { db, user, res }) => {
      const { username } = user
      const row = await db.models.comment.findOne({ where: { ostId, username } })

      if (row) {
        await row.update({ text, anon })
        await row.save()
      } else await db.models.comment.create({ ostId, username, text, anon })

      await res.unstable_revalidate(`/album/${ostId}`)

      return true
    },
    addFavorite: async (_, { ostId }, { db, user, res }) => {
      await user.addOst(ostId)
      await res.unstable_revalidate(`/album/${ostId}`)
      return true
    },
    removeFavorite: async (_, { ostId }, { db, user, res }) => {
      await user.removeOst(ostId)
      await res.unstable_revalidate(`/album/${ostId}`)
      return true
    }
  }
}

export default composeResolvers(resolvers, resolversComposition)
