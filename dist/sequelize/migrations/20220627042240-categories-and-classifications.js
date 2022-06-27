'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return queryInterface.renameTable('category', 'classification');

            case 2:
              _context.next = 4;
              return queryInterface.renameTable('ost_category', 'ost_classification');

            case 4:
              _context.next = 6;
              return queryInterface.renameTable('class', 'category');

            case 6:
              _context.next = 8;
              return queryInterface.renameTable('ost_class', 'ost_category');

            case 8:
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
              _context2.next = 2;
              return queryInterface.renameTable('category', 'class');

            case 2:
              _context2.next = 4;
              return queryInterface.renameTable('ost_category', 'ost_class');

            case 4:
              _context2.next = 6;
              return queryInterface.renameTable('classification', 'category');

            case 6:
              _context2.next = 8;
              return queryInterface.renameTable('ost_classification', 'ost_category');

            case 8:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  }
};