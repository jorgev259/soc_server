"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = require("sequelize");

var model = function model(sequelize) {
  var Role = sequelize.define('role', {
    name: {
      type: _sequelize.DataTypes.STRING,
      primaryKey: true
    },
    permissions: _sequelize.DataTypes.JSON
  });
  return Role;
};

var _default = model;
exports["default"] = _default;