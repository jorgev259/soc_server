"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = require("sequelize");

var model = function model(sequelize) {
  var config = sequelize.define('config', {
    name: {
      type: _sequelize.DataTypes.STRING,
      primaryKey: true
    },
    value: {
      type: _sequelize.DataTypes.STRING,
      defaultValue: ''
    }
  }, {
    freezeTableName: true
  });
  return config;
};

var _default = model;
exports["default"] = _default;