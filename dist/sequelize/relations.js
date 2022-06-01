"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = relations;

function relations(sequelize) {
  var _sequelize$models = sequelize.models,
      ost = _sequelize$models.ost,
      classes = _sequelize$models["class"],
      disc = _sequelize$models.disc,
      download = _sequelize$models.download,
      link = _sequelize$models.link,
      publisher = _sequelize$models.publisher,
      game = _sequelize$models.game,
      series = _sequelize$models.series,
      platform = _sequelize$models.platform,
      artist = _sequelize$models.artist,
      category = _sequelize$models.category,
      store = _sequelize$models.store,
      animation = _sequelize$models.animation,
      studio = _sequelize$models.studio,
      user = _sequelize$models.user,
      role = _sequelize$models.role,
      forgor = _sequelize$models.forgor,
      log = _sequelize$models.log,
      comment = _sequelize$models.comment;
  user.belongsToMany(role, {
    through: 'User_Role'
  });
  log.belongsTo(user, {
    foreignKey: 'username'
  });
  forgor.belongsTo(user, {
    foreignKey: 'username'
  });
  classes.belongsToMany(ost, {
    through: 'Ost_Class'
  });
  disc.belongsTo(ost);
  download.hasMany(link);
  link.belongsTo(download);
  game.belongsToMany(publisher, {
    through: 'Publisher_Game'
  });
  game.belongsToMany(ost, {
    through: 'Ost_Game'
  });
  game.belongsToMany(series, {
    through: 'Series_Game'
  });
  game.belongsToMany(platform, {
    through: 'Game_Platform'
  });
  platform.belongsToMany(game, {
    through: 'Game_Platform'
  });
  ost.belongsToMany(artist, {
    onDelete: 'CASCADE',
    through: 'Ost_Artist'
  });
  ost.belongsToMany(classes, {
    onDelete: 'CASCADE',
    through: 'Ost_Class'
  });
  ost.belongsToMany(category, {
    onDelete: 'CASCADE',
    through: 'Ost_Category'
  });
  ost.belongsToMany(platform, {
    onDelete: 'CASCADE',
    through: 'Ost_Platform'
  });
  ost.belongsToMany(game, {
    onDelete: 'CASCADE',
    through: 'Ost_Game'
  });
  ost.belongsToMany(animation, {
    through: 'Ost_Animation'
  });
  ost.hasMany(disc, {
    onDelete: 'CASCADE'
  });
  ost.hasMany(download, {
    onDelete: 'CASCADE'
  });
  ost.hasMany(store, {
    onDelete: 'CASCADE'
  });
  ost.belongsToMany(ost, {
    onDelete: 'CASCADE',
    through: 'related_ost',
    as: 'related'
  });
  platform.belongsToMany(ost, {
    through: 'Ost_Platform'
  });
  publisher.belongsToMany(game, {
    through: 'Publisher_Game'
  });
  series.belongsToMany(game, {
    through: 'Series_Game'
  });
  animation.belongsToMany(studio, {
    through: 'Studio_Animation'
  });
  studio.belongsToMany(animation, {
    through: 'Studio_Animation'
  });
  animation.belongsToMany(ost, {
    through: 'Ost_Animation'
  });
  ost.hasMany(comment);
  comment.belongsTo(ost);
  user.hasMany(comment, {
    foreignKey: 'username'
  });
  comment.belongsTo(user, {
    foreignKey: 'username'
  });
  user.belongsToMany(ost, {
    through: 'favorites',
    foreignKey: 'username'
  });
  ost.belongsToMany(user, {
    through: 'favorites'
  });
}