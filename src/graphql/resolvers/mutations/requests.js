import { composeResolvers } from '@graphql-tools/resolvers-composition'
import { UserInputError } from 'apollo-server-errors'

import { hasRole } from '../../../utils/resolvers'

const resolversComposition = { 'Mutation.*': hasRole('REQUESTS') }
const resolvers = {
  Mutation: {
    editRequest: async (parent, data, { db, user }, info) => {
      const request = await db.models.request.findByPk(data.id)
      if (!request) throw new UserInputError('Request not found')

      await request.set(data)
      await request.save()

      return request
    },

    rejectRequest: async (parent, data, { db, user }, info) => {
      const request = await db.models.request.findByPk(data.id)
      if (!request) throw new UserInputError('Request not found')

      await request.destroy()
      return true
    }
  }
}

export default composeResolvers(resolvers, resolversComposition)
