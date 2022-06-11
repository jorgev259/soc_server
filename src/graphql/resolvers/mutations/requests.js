import { composeResolvers } from '@graphql-tools/resolvers-composition'
import { UserInputError } from 'apollo-server-errors'
import { holdRequest, completeRequest, rejectRequest } from '@lotus-tree/requestcat/lib/util'

import { hasRole } from '../../../utils/resolvers'
import { discordClient } from '../../../utils/plugins'

const resolversComposition = { 'Mutation.*': hasRole('REQUESTS') }
const resolvers = {
  Mutation: {
    editRequest: async (parent, data, { db, user }, info) => {
      const request = await db.models.request.findByPk(data.id)
      if (!request) throw new UserInputError('Request not found')

      await db.transaction(async transaction => {
        await request.set(data, { transaction })

        if (request.changed('state')) {
          switch (request.state) {
          case 'complete':
            await completeRequest(discordClient, db, process.env.GUILD, request)
            break

          case 'hold':
            await holdRequest(discordClient, db, process.env.GUILD, request, data.reason)
            break
          }
        }

        await request.save({ transaction })
      })

      return request
    },

    rejectRequest: async (parent, data, { db, user }, info) => {
      const request = await db.models.request.findByPk(data.id)
      if (!request) throw new UserInputError('Request not found')

      await rejectRequest(discordClient, db, process.env.GUILD, request, data.reason)
      return true
    }
  }
}

export default composeResolvers(resolvers, resolversComposition)
