"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = require("sequelize");

var model = function model(sequelize) {
  var User = sequelize.define('user', {
    username: {
      type: _sequelize.DataTypes.STRING,
      primaryKey: true
    },
    email: _sequelize.DataTypes.STRING,
    password: _sequelize.DataTypes.STRING,
    placeholder: {
      type: _sequelize.DataTypes.TEXT
    },
    imgId: _sequelize.DataTypes.STRING
  });
  sequelize.define('forgor', {
    key: {
      type: _sequelize.DataTypes.STRING,
      primaryKey: true
    },
    expires: _sequelize.DataTypes.DATE
  });
  return User;
};

var _default = model;
exports["default"] = _default;