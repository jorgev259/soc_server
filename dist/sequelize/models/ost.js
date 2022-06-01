"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = require("sequelize");

var _utils = require("../../utils");

var model = function model(sequelize) {
  return sequelize.define('ost', {
    id: {
      type: _sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: _sequelize.DataTypes.STRING,
    subTitle: _sequelize.DataTypes.TEXT,
    releaseDate: _sequelize.DataTypes.DATEONLY,
    label: _sequelize.DataTypes.STRING,
    vgmdb: _sequelize.DataTypes.STRING,
    description: _sequelize.DataTypes.STRING,
    status: {
      type: _sequelize.DataTypes.STRING,
      defaultValue: 'show'
    },
    placeholder: {
      type: _sequelize.DataTypes.TEXT,
      defaultValue: _utils.PLACEHOLDER
    },
    headerColor: {
      type: _sequelize.DataTypes.STRING,
      defaultValue: '#ffffff'
    }
  }, {
    freezeTableName: true
  });
};

var _default = model;
exports["default"] = _default;