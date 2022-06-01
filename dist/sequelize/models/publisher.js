"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = require("sequelize");

var model = function model(sequelize) {
  var Publisher = sequelize.define('publisher', {
    id: {
      type: _sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: _sequelize.DataTypes.STRING
    }
  }, {
    freezeTableName: true
  });
  return Publisher;
};

var _default = model;
exports["default"] = _default;