"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = require("sequelize");

var model = function model(sequelize) {
  var Artist = sequelize.define('artist', {
    slug: {
      type: _sequelize.DataTypes.STRING,
      primaryKey: true
    },
    name: _sequelize.DataTypes.STRING
  }, {
    freezeTableName: true
  });
  return Artist;
};

var _default = model;
exports["default"] = _default;