"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = require("sequelize");

var model = function model(sequelize) {
  var Download = sequelize.define('download', {
    title: _sequelize.DataTypes.STRING,
    small: _sequelize.DataTypes.BOOLEAN
  });
  return Download;
};

var _default = model;
exports["default"] = _default;