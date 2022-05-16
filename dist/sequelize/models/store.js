"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = require("sequelize");

var model = function model(sequelize) {
  var Store = sequelize.define('store', {
    url: _sequelize.DataTypes.STRING,
    provider: _sequelize.DataTypes.STRING
  });
  return Store;
};

var _default = model;
exports["default"] = _default;