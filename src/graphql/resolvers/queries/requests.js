import { Op, fn, col, where } from 'sequelize'

const resolvers = {
  Query: {
    requests: (_, {
      state = ['complete', 'hold', 'pending'],
      donator = [true, false]
    }, { db }) => db.models.request.findAll({ where: { state, donator } }),
    request: (_, { link }, { db }) => db.models.request.findOne({ where: { link } }),
    searchRequests: async (_, {
      state = ['complete', 'hold', 'pending'],
      donator = [true, false],
      limit = 10, filter
    }, { db }) => {
      if (filter) {
        const searchId = await db.models.request.findAll({
          donator,
          where: {
            state,
            [Op.or]: [
              { id: filter },
              { link: filter },
              { user: filter },
              { userID: filter }
            ]
          },
          limit
        })
        if (searchId.length > 0) return searchId
      }

      return db.models.request.findAll({
        where: [
          { state, donator },
          where(fn('LOWER', col('title')), { [Op.like]: `%${filter || ''}%` })
        ],
        limit
      })
    }
  }
}

export default resolvers
