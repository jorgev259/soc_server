"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = require("sequelize");

var request = function request(sequelize) {
  return sequelize.define('request', {
    id: {
      type: _sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: _sequelize.DataTypes.STRING,
    link: _sequelize.DataTypes.STRING,
    user: _sequelize.DataTypes.STRING,
    userID: _sequelize.DataTypes.STRING,
    state: {
      type: _sequelize.DataTypes.STRING,
      allowNull: false
    },
    donator: {
      type: _sequelize.DataTypes.BOOLEAN,
      allowNull: false
    },
    reason: _sequelize.DataTypes.STRING,
    comments: _sequelize.DataTypes.STRING,
    message: _sequelize.DataTypes.STRING
  });
};

var _default = request;
exports["default"] = _default;