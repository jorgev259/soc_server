"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = require("sequelize");

var _utils = require("../../utils");

var animation = function animation(sequelize) {
  sequelize.define('animation', {
    id: {
      type: _sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: _sequelize.DataTypes.STRING,
      unique: true
    },
    subTitle: {
      type: _sequelize.DataTypes.STRING
    },
    releaseDate: _sequelize.DataTypes.DATEONLY,
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
  sequelize.define('studio', {
    slug: {
      type: _sequelize.DataTypes.STRING,
      primaryKey: true
    },
    name: _sequelize.DataTypes.STRING
  }, {
    freezeTableName: true
  });
};

var _default = animation;
exports["default"] = _default;