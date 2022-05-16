const resolvers = {
  Query: {
    config: (parent, { name }, { db, req }, info) => {
      return db.models.config.findOrCreate({ where: { name } })
        .then(() => db.models.config.findByPk(name))
    },

    highlight: async (parent, args, { db }) => {
      const { value } = await db.models.config.findByPk('highlight')
      return db.models.ost.findByPk(value)
    }
  }
}

export default resolvers
