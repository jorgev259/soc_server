export default function relations (sequelize) {
  const {
    album, classification, disc, download, link,
    publisher, game, series,
    platform, artist, category, store,
    animation, studio,
    user, role, forgor, log, comment, rating,
    submission, request
  } = sequelize.models

  user.belongsToMany(role, { through: 'User_Role' })
  log.belongsTo(user, { foreignKey: 'username' })
  forgor.belongsTo(user, { foreignKey: 'username' })

  submission.belongsTo(user)
  submission.belongsTo(request)
  user.hasMany(submission)
  request.hasMany(submission)

  classification.belongsToMany(album, { through: 'Album_Classification' })

  disc.belongsTo(album)

  download.hasMany(link)
  link.belongsTo(download)

  game.belongsToMany(publisher, { through: 'Publisher_Game' })
  game.belongsToMany(album, { through: 'Album_Game' })
  game.belongsToMany(series, { through: 'Series_Game' })

  game.belongsToMany(platform, { through: 'Game_Platform' })
  platform.belongsToMany(game, { through: 'Game_Platform' })

  album.belongsToMany(artist, { onDelete: 'CASCADE', through: 'Album_Artist' })
  album.belongsToMany(classification, { onDelete: 'CASCADE', through: 'Album_Classification' })
  album.belongsToMany(category, { onDelete: 'CASCADE', through: 'Album_Category' })
  album.belongsToMany(platform, { onDelete: 'CASCADE', through: 'Album_Platform' })
  album.belongsToMany(game, { onDelete: 'CASCADE', through: 'Album_Game' })
  album.belongsToMany(animation, { through: 'Album_Animation' })
  album.hasMany(disc, { onDelete: 'CASCADE' })
  album.hasMany(download, { onDelete: 'CASCADE' })
  album.hasMany(store, { onDelete: 'CASCADE' })
  album.belongsToMany(album, { onDelete: 'CASCADE', through: 'related_album', as: 'related' })

  platform.belongsToMany(album, { through: 'Album_Platform' })

  publisher.belongsToMany(game, { through: 'Publisher_Game' })

  series.belongsToMany(game, { through: 'Series_Game' })

  animation.belongsToMany(studio, { through: 'Studio_Animation' })
  studio.belongsToMany(animation, { through: 'Studio_Animation' })

  animation.belongsToMany(album, { through: 'Album_Animation' })

  album.hasMany(comment, { onDelete: 'CASCADE' })
  comment.belongsTo(album)
  user.hasMany(comment, { foreignKey: 'username' })
  comment.belongsTo(user, { foreignKey: 'username' })

  album.hasMany(rating)
  rating.belongsTo(album)
  user.hasMany(rating, { foreignKey: 'username' })
  rating.belongsTo(user, { foreignKey: 'username' })

  user.belongsToMany(album, { through: 'favorites', foreignKey: 'username' })
  album.belongsToMany(user, { through: 'favorites' })
}
