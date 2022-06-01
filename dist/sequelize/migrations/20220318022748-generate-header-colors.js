"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var path = require('path');

var fs = require('fs-extra');

var sharp = require('sharp');

function colorToHex(color) {
  var hexadecimal = color.toString(16);
  return hexadecimal.length === 1 ? '0' + hexadecimal : hexadecimal;
}

function convertRGBtoHex(red, green, blue) {
  return '#' + colorToHex(red) + colorToHex(green) + colorToHex(blue);
}

var getImgColor = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(filePath) {
    var pathString, _yield$sharp$stats, dominant, r, g, b;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            pathString = path.join('/var/www/soc_img/img', filePath);
            _context.next = 3;
            return fs.exists(pathString);

          case 3:
            if (_context.sent) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", '#ffffff');

          case 5:
            _context.next = 7;
            return sharp(pathString).stats();

          case 7:
            _yield$sharp$stats = _context.sent;
            dominant = _yield$sharp$stats.dominant;
            r = dominant.r, g = dominant.g, b = dominant.b;
            return _context.abrupt("return", convertRGBtoHex(r, g, b));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getImgColor(_x) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
      var _yield$queryInterface, _yield$queryInterface2, ostRows, _yield$queryInterface3, _yield$queryInterface4, animRows, _yield$queryInterface5, _yield$queryInterface6, gameRows, _yield$queryInterface7, _yield$queryInterface8, seriesRows;

      return _regenerator["default"].wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return queryInterface.sequelize.query('SELECT id FROM ost');

            case 2:
              _yield$queryInterface = _context6.sent;
              _yield$queryInterface2 = (0, _slicedToArray2["default"])(_yield$queryInterface, 1);
              ostRows = _yield$queryInterface2[0];
              _context6.next = 7;
              return queryInterface.sequelize.query('SELECT id FROM animation');

            case 7:
              _yield$queryInterface3 = _context6.sent;
              _yield$queryInterface4 = (0, _slicedToArray2["default"])(_yield$queryInterface3, 1);
              animRows = _yield$queryInterface4[0];
              _context6.next = 12;
              return queryInterface.sequelize.query('SELECT slug FROM game');

            case 12:
              _yield$queryInterface5 = _context6.sent;
              _yield$queryInterface6 = (0, _slicedToArray2["default"])(_yield$queryInterface5, 1);
              gameRows = _yield$queryInterface6[0];
              _context6.next = 17;
              return queryInterface.sequelize.query('SELECT slug FROM series');

            case 17:
              _yield$queryInterface7 = _context6.sent;
              _yield$queryInterface8 = (0, _slicedToArray2["default"])(_yield$queryInterface7, 1);
              seriesRows = _yield$queryInterface8[0];
              console.log('Updating ost images');
              _context6.next = 23;
              return Promise.all(ostRows.map( /*#__PURE__*/function () {
                var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(r) {
                  return _regenerator["default"].wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          _context2.t0 = queryInterface.sequelize;
                          _context2.next = 3;
                          return getImgColor("album/".concat(r.id, ".png"));

                        case 3:
                          _context2.t1 = _context2.sent;
                          _context2.t2 = r.id;
                          _context2.t3 = [_context2.t1, _context2.t2];
                          _context2.t4 = {
                            replacements: _context2.t3
                          };
                          return _context2.abrupt("return", _context2.t0.query.call(_context2.t0, 'UPDATE ost SET headerColor=? WHERE id=?', _context2.t4));

                        case 8:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                }));

                return function (_x2) {
                  return _ref2.apply(this, arguments);
                };
              }()));

            case 23:
              console.log('Updating animation images');
              _context6.next = 26;
              return Promise.all(animRows.map( /*#__PURE__*/function () {
                var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(r) {
                  return _regenerator["default"].wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          _context3.t0 = queryInterface.sequelize;
                          _context3.next = 3;
                          return getImgColor("anim/".concat(r.id, ".png"));

                        case 3:
                          _context3.t1 = _context3.sent;
                          _context3.t2 = r.id;
                          _context3.t3 = [_context3.t1, _context3.t2];
                          _context3.t4 = {
                            replacements: _context3.t3
                          };
                          return _context3.abrupt("return", _context3.t0.query.call(_context3.t0, 'UPDATE animation SET headerColor=? WHERE id=?', _context3.t4));

                        case 8:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee3);
                }));

                return function (_x3) {
                  return _ref3.apply(this, arguments);
                };
              }()));

            case 26:
              console.log('Updating game images');
              _context6.next = 29;
              return Promise.all(gameRows.map( /*#__PURE__*/function () {
                var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(r) {
                  return _regenerator["default"].wrap(function _callee4$(_context4) {
                    while (1) {
                      switch (_context4.prev = _context4.next) {
                        case 0:
                          _context4.t0 = queryInterface.sequelize;
                          _context4.next = 3;
                          return getImgColor("game/".concat(r.slug, ".png"));

                        case 3:
                          _context4.t1 = _context4.sent;
                          _context4.t2 = r.slug;
                          _context4.t3 = [_context4.t1, _context4.t2];
                          _context4.t4 = {
                            replacements: _context4.t3
                          };
                          return _context4.abrupt("return", _context4.t0.query.call(_context4.t0, 'UPDATE game SET headerColor=? WHERE slug=?', _context4.t4));

                        case 8:
                        case "end":
                          return _context4.stop();
                      }
                    }
                  }, _callee4);
                }));

                return function (_x4) {
                  return _ref4.apply(this, arguments);
                };
              }()));

            case 29:
              console.log('Updating series images');
              _context6.next = 32;
              return Promise.all(seriesRows.map( /*#__PURE__*/function () {
                var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(r) {
                  return _regenerator["default"].wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          _context5.t0 = queryInterface.sequelize;
                          _context5.next = 3;
                          return getImgColor("series/".concat(r.slug, ".png"));

                        case 3:
                          _context5.t1 = _context5.sent;
                          _context5.t2 = r.slug;
                          _context5.t3 = [_context5.t1, _context5.t2];
                          _context5.t4 = {
                            replacements: _context5.t3
                          };
                          return _context5.abrupt("return", _context5.t0.query.call(_context5.t0, 'UPDATE series SET headerColor=? WHERE slug=?', _context5.t4));

                        case 8:
                        case "end":
                          return _context5.stop();
                      }
                    }
                  }, _callee5);
                }));

                return function (_x5) {
                  return _ref5.apply(this, arguments);
                };
              }()));

            case 32:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }))();
  },
  down: function down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    return (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
      return _regenerator["default"].wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }))();
  }
};