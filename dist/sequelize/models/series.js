"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = require("sequelize");

var _utils = require("../../utils");

var model = function model(sequelize) {
  var Series = sequelize.define('series', {
    slug: {
      type: _sequelize.DataTypes.STRING,
      primaryKey: true
    },
    name: {
      type: _sequelize.DataTypes.STRING
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
  return Series;
};

var _default = model;
exports["default"] = _default;