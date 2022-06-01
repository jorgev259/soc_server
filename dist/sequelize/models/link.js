"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = require("sequelize");

var model = function model(sequelize) {
  var Link = sequelize.define('link', {
    url: _sequelize.DataTypes.STRING,
    directUrl: _sequelize.DataTypes.STRING,
    provider: _sequelize.DataTypes.STRING,
    custom: _sequelize.DataTypes.STRING
  });
  return Link;
};

var _default = model;
exports["default"] = _default;