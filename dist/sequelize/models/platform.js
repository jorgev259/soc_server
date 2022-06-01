"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = require("sequelize");

var model = function model(sequelize) {
  var Platform = sequelize.define('platform', {
    id: {
      type: _sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: _sequelize.DataTypes.STRING
    },
    type: {
      type: _sequelize.DataTypes.STRING,
      defaultValue: 'Game'
    }
  }, {
    freezeTableName: true
  });
  return Platform;
};

var _default = model;
exports["default"] = _default;