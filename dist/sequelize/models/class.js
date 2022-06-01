"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = require("sequelize");

var model = function model(sequelize) {
  var Class = sequelize.define('class', {
    name: {
      type: _sequelize.DataTypes.STRING,
      primaryKey: true
    }
  }, {
    freezeTableName: true
  });
  return Class;
};

var _default = model;
exports["default"] = _default;