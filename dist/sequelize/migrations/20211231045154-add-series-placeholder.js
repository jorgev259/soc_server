"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _require = require('sequelize'),
    DataTypes = _require.DataTypes;

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.addColumn('series', 'placeholder', {
      type: DataTypes.TEXT
    });
  },
  down: function () {
    var _down = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(queryInterface, Sequelize) {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", queryInterface.removeColumn('series', 'placeholder'));

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function down(_x, _x2) {
      return _down.apply(this, arguments);
    }

    return down;
  }()
};