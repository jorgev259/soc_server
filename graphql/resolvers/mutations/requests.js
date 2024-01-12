import { composeResolvers } from '@graphql-tools/resolvers-composition'
import { UserInputError } from 'apollo-server-errors'
import { mergeResolvers } from '@graphql-tools/merge'

import { hasRole, isAuthed } from '../../../utils/resolvers'
import { getUser } from '@/next/lib/getSession'
import requestPOST from '@/next/server/utils/requests'

const resolvers = {
  Mutation: {
    editRequest: async (parent, data, { db }, info) => {
      const request = await db.models.request.findByPk(data.id)
      if (!request) throw new UserInputError('Request not found')

      await db.transaction(async transaction => {
        await request.set(data, { transaction })

        if (request.changed('state')) {
          switch (request.state) {
          case 'complete':
            await requestPOST('complete', { requestId: request.id })
            break

          case 'hold':
            await requestPOST('hold', { requestId: request.id, reason: data.reason })
            break
          }
        }

        await request.save({ transaction })
      })

      return request
    },

    rejectRequest: async (parent, data, { db }, info) => {
      const request = await db.models.request.findByPk(data.id)
      if (!request) throw new UserInputError('Request not found')

      await requestPOST('reject', { requestId: request.id, reason: data.reason })
      return true
    }
  }
}

const submitActions = {
  Mutation: {
    submitAlbum: async (parent, data, { db }, info) => {
      const { request: requestId, title, vgmdb, links } = data
      let request

      if (requestId) {
        request = await db.models.request.findByPk(requestId)

        if (!request) throw new UserInputError('Request not found')
        if (request.state === 'complete') throw new UserInputError('Request already complete')
      }

      return db.models.submission.create({
        title,
        vgmdb,
        links,
        requestId,
        userUsername: await getUser().username
      })
    }
  }
}

const requestResolvers = composeResolvers(resolvers, { 'Mutation.*': hasRole('REQUESTS') })
const submitResolvers = composeResolvers(submitActions, { 'Mutation.*': [isAuthed] })

export default mergeResolvers([requestResolvers, submitResolvers])
