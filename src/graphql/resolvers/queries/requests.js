const resolvers = {
  Query: {
    requests: (_, {
      state = ['complete', 'hold', 'pending'],
      donator = [true, false]
    }, { db }) => db.models.request.findAll({ where: { state, donator } })
  }
}

export default resolvers
