"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = require("sequelize");

var model = function model(sequelize) {
  var Disc = sequelize.define('disc', {
    number: _sequelize.DataTypes.INTEGER,
    body: _sequelize.DataTypes.TEXT
  });
  return Disc;
};

var _default = model;
exports["default"] = _default;