"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = require("sequelize");

var model = function model(sequelize) {
  var Category = sequelize.define('category', {
    name: {
      type: _sequelize.DataTypes.STRING,
      primaryKey: true
    }
  }, {
    freezeTableName: true
  });
  return Category;
};

var _default = model;
exports["default"] = _default;