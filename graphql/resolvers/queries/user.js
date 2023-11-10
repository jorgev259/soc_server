import { UserInputError } from 'apollo-server-errors'
import bcrypt from 'bcrypt'
import { Op } from 'sequelize'
import { composeResolvers } from '@graphql-tools/resolvers-composition'

import info from '@/next/constants/info.json'
import { hasRole } from '@/next/server/utils/resolvers'

const { permissions } = info

const resolversComposition = { 'Query.users': hasRole('MANAGE_USER') }
const resolvers = {
  Query: {
    me: (parent, args, { user }) => user,
    permissions: () => permissions,
    roles: (parent, args, { db }) => db.models.role.findAll(),
    users: (parent, args, { db }) => {
      const search = args.search.trim()
      if (search.length < 3) return []

      return db.models.user.findAll({
        where: {
          [Op.or]: [
            { username: { [Op.like]: `%${search}%` } },
            { email: search }
          ]
        }
      })
    },
    user: (parent, { username }, { db }) => db.models.user.findByPk(username)
  }
}

export default composeResolvers(resolvers, resolversComposition)
