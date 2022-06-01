"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _resolversComposition = require("@graphql-tools/resolvers-composition");

var _resolvers = require("../../../utils/resolvers");

var _revalidate = _interopRequireDefault(require("../../../utils/revalidate"));

// import axios from 'axios'
// const token = process.env.IRONCLAD
var resolversComposition = {
  'Mutation.*': [_resolvers.isAuthed]
};
var resolvers = {
  Mutation: {
    updateComment: function () {
      var _updateComment = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_, _ref, _ref2) {
        var text, anon, ostId, db, user, res;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                text = _ref.text, anon = _ref.anon, ostId = _ref.ostId;
                db = _ref2.db, user = _ref2.user, res = _ref2.res;
                return _context2.abrupt("return", db.transaction( /*#__PURE__*/function () {
                  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(transaction) {
                    var username, row;
                    return _regenerator["default"].wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            username = user.username;
                            _context.next = 3;
                            return db.models.comment.findOne({
                              where: {
                                ostId: ostId,
                                username: username
                              }
                            });

                          case 3:
                            row = _context.sent;

                            if (!row) {
                              _context.next = 11;
                              break;
                            }

                            _context.next = 7;
                            return row.update({
                              text: text,
                              anon: anon
                            }, {
                              transaction: transaction
                            });

                          case 7:
                            _context.next = 9;
                            return row.save({
                              transaction: transaction
                            });

                          case 9:
                            _context.next = 13;
                            break;

                          case 11:
                            _context.next = 13;
                            return db.models.comment.create({
                              ostId: ostId,
                              username: username,
                              text: text,
                              anon: anon
                            }, {
                              transaction: transaction
                            });

                          case 13:
                            _context.next = 15;
                            return (0, _revalidate["default"])(["/album/".concat(ostId)]);

                          case 15:
                            return _context.abrupt("return", true);

                          case 16:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x4) {
                    return _ref3.apply(this, arguments);
                  };
                }()));

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function updateComment(_x, _x2, _x3) {
        return _updateComment.apply(this, arguments);
      }

      return updateComment;
    }(),
    addFavorite: function () {
      var _addFavorite = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(_, _ref4, _ref5) {
        var ostId, db, user, res;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                ostId = _ref4.ostId;
                db = _ref5.db, user = _ref5.user, res = _ref5.res;
                return _context4.abrupt("return", db.transaction( /*#__PURE__*/function () {
                  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(transaction) {
                    return _regenerator["default"].wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            _context3.next = 2;
                            return user.addOst(ostId, {
                              transaction: transaction
                            });

                          case 2:
                            _context3.next = 4;
                            return (0, _revalidate["default"])(["/album/".concat(ostId)]);

                          case 4:
                            return _context3.abrupt("return", true);

                          case 5:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3);
                  }));

                  return function (_x8) {
                    return _ref6.apply(this, arguments);
                  };
                }()));

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function addFavorite(_x5, _x6, _x7) {
        return _addFavorite.apply(this, arguments);
      }

      return addFavorite;
    }(),
    removeFavorite: function () {
      var _removeFavorite = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(_, _ref7, _ref8) {
        var ostId, db, user, res;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                ostId = _ref7.ostId;
                db = _ref8.db, user = _ref8.user, res = _ref8.res;
                return _context6.abrupt("return", db.transaction( /*#__PURE__*/function () {
                  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(transaction) {
                    return _regenerator["default"].wrap(function _callee5$(_context5) {
                      while (1) {
                        switch (_context5.prev = _context5.next) {
                          case 0:
                            _context5.next = 2;
                            return user.removeOst(ostId, {
                              transaction: transaction
                            });

                          case 2:
                            _context5.next = 4;
                            return (0, _revalidate["default"])(["/album/".concat(ostId)]);

                          case 4:
                            return _context5.abrupt("return", true);

                          case 5:
                          case "end":
                            return _context5.stop();
                        }
                      }
                    }, _callee5);
                  }));

                  return function (_x12) {
                    return _ref9.apply(this, arguments);
                  };
                }()));

              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function removeFavorite(_x9, _x10, _x11) {
        return _removeFavorite.apply(this, arguments);
      }

      return removeFavorite;
    }()
  }
};

var _default = (0, _resolversComposition.composeResolvers)(resolvers, resolversComposition);

exports["default"] = _default;