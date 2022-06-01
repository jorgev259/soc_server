"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = require("sequelize");

var model = function model(sequelize) {
  return sequelize.define('comment', {
    text: _sequelize.DataTypes.STRING(300),
    anon: _sequelize.DataTypes.BOOLEAN
  });
};

var _default = model;
exports["default"] = _default;