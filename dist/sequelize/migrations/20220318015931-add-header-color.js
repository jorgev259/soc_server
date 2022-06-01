"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var config;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              config = {
                type: Sequelize.DataTypes.STRING,
                defaultValue: '#ffffff'
              };
              return _context.abrupt("return", queryInterface.sequelize.transaction(function (t) {
                return Promise.all([queryInterface.addColumn('ost', 'headerColor', config, {
                  transaction: t
                }), queryInterface.addColumn('game', 'headerColor', config, {
                  transaction: t
                }), queryInterface.addColumn('animation', 'headerColor', config, {
                  transaction: t
                }), queryInterface.addColumn('series', 'headerColor', config, {
                  transaction: t
                })]);
              }));

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  down: function down(queryInterface, Sequelize) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", queryInterface.sequelize.transaction(function (t) {
                return Promise.all([queryInterface.removeColumn('ost', 'headerColor', {
                  transaction: t
                }), queryInterface.removeColumn('game', 'headerColor', {
                  transaction: t
                }), queryInterface.removeColumn('animation', 'headerColor', {
                  transaction: t
                }), queryInterface.removeColumn('series', 'headerColor', {
                  transaction: t
                })]);
              }));

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  }
};