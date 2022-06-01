"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = require("sequelize");

var model = function model(sequelize) {
  return sequelize.define('log', {
    id: {
      type: _sequelize.DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    action: _sequelize.DataTypes.STRING,
    data: {
      type: _sequelize.DataTypes.TEXT,
      allowNull: true
    }
  });
};

var _default = model;
exports["default"] = _default;