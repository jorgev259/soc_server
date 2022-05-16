export default function relations (sequelize) {
  const {
    ost, class: classes, disc, download, link,
    publisher, game, series,
    platform, artist, category, store,
    animation, studio,
    user, role, forgor, log, comment
  } = sequelize.models

  user.belongsToMany(role, { through: 'User_Role' })
  log.belongsTo(user, { foreignKey: 'username' })
  forgor.belongsTo(user, { foreignKey: 'username' })

  classes.belongsToMany(ost, { through: 'Ost_Class' })

  disc.belongsTo(ost)

  download.hasMany(link)
  link.belongsTo(download)

  game.belongsToMany(publisher, { through: 'Publisher_Game' })
  game.belongsToMany(ost, { through: 'Ost_Game' })
  game.belongsToMany(series, { through: 'Series_Game' })

  game.belongsToMany(platform, { through: 'Game_Platform' })
  platform.belongsToMany(game, { through: 'Game_Platform' })

  ost.belongsToMany(artist, { onDelete: 'CASCADE', through: 'Ost_Artist' })
  ost.belongsToMany(classes, { onDelete: 'CASCADE', through: 'Ost_Class' })
  ost.belongsToMany(category, { onDelete: 'CASCADE', through: 'Ost_Category' })
  ost.belongsToMany(platform, { onDelete: 'CASCADE', through: 'Ost_Platform' })
  ost.belongsToMany(game, { onDelete: 'CASCADE', through: 'Ost_Game' })
  ost.belongsToMany(animation, { through: 'Ost_Animation' })
  ost.hasMany(disc, { onDelete: 'CASCADE' })
  ost.hasMany(download, { onDelete: 'CASCADE' })
  ost.hasMany(store, { onDelete: 'CASCADE' })
  ost.belongsToMany(ost, { onDelete: 'CASCADE', through: 'related_ost', as: 'related' })

  platform.belongsToMany(ost, { through: 'Ost_Platform' })

  publisher.belongsToMany(game, { through: 'Publisher_Game' })

  series.belongsToMany(game, { through: 'Series_Game' })

  animation.belongsToMany(studio, { through: 'Studio_Animation' })
  studio.belongsToMany(animation, { through: 'Studio_Animation' })

  animation.belongsToMany(ost, { through: 'Ost_Animation' })

  ost.hasMany(comment)
  comment.belongsTo(ost)

  user.hasMany(comment, { foreignKey: 'username' })
  comment.belongsTo(user, { foreignKey: 'username' })

  user.belongsToMany(ost, { through: 'favorites', foreignKey: 'username' })
  ost.belongsToMany(user, { through: 'favorites' })
}
