"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _resolversComposition = require("@graphql-tools/resolvers-composition");

var _apolloServerErrors = require("apollo-server-errors");

var _requestcat = require("@lotus-tree/requestcat");

var _resolvers = require("../../../utils/resolvers");

var _plugins = require("../../../utils/plugins");

var resolversComposition = {
  'Mutation.*': (0, _resolvers.hasRole)('REQUESTS')
};
var resolvers = {
  Mutation: {
    editRequest: function () {
      var _editRequest = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(parent, data, _ref, info) {
        var db, user, request;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                db = _ref.db, user = _ref.user;
                _context2.next = 3;
                return db.models.request.findByPk(data.id);

              case 3:
                request = _context2.sent;

                if (request) {
                  _context2.next = 6;
                  break;
                }

                throw new _apolloServerErrors.UserInputError('Request not found');

              case 6:
                _context2.next = 8;
                return db.transaction( /*#__PURE__*/function () {
                  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(transaction) {
                    return _regenerator["default"].wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.next = 2;
                            return request.set(data, {
                              transaction: transaction
                            });

                          case 2:
                            if (!request.changed('state')) {
                              _context.next = 12;
                              break;
                            }

                            _context.t0 = request.state;
                            _context.next = _context.t0 === 'complete' ? 6 : _context.t0 === 'hold' ? 9 : 12;
                            break;

                          case 6:
                            _context.next = 8;
                            return (0, _requestcat.completeRequest)(_plugins.discordClient, db, process.env.GUILD, request);

                          case 8:
                            return _context.abrupt("break", 12);

                          case 9:
                            _context.next = 11;
                            return (0, _requestcat.holdRequest)(_plugins.discordClient, db, process.env.GUILD, request, data.reason);

                          case 11:
                            return _context.abrupt("break", 12);

                          case 12:
                            _context.next = 14;
                            return request.save({
                              transaction: transaction
                            });

                          case 14:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x5) {
                    return _ref2.apply(this, arguments);
                  };
                }());

              case 8:
                return _context2.abrupt("return", request);

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function editRequest(_x, _x2, _x3, _x4) {
        return _editRequest.apply(this, arguments);
      }

      return editRequest;
    }(),
    rejectRequest: function () {
      var _rejectRequest2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(parent, data, _ref3, info) {
        var db, user, request;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                db = _ref3.db, user = _ref3.user;
                _context3.next = 3;
                return db.models.request.findByPk(data.id);

              case 3:
                request = _context3.sent;

                if (request) {
                  _context3.next = 6;
                  break;
                }

                throw new _apolloServerErrors.UserInputError('Request not found');

              case 6:
                _context3.next = 8;
                return (0, _requestcat.rejectRequest)(_plugins.discordClient, db, process.env.GUILD, request, data.reason);

              case 8:
                return _context3.abrupt("return", true);

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function rejectRequest(_x6, _x7, _x8, _x9) {
        return _rejectRequest2.apply(this, arguments);
      }

      return rejectRequest;
    }()
  }
};

var _default = (0, _resolversComposition.composeResolvers)(resolvers, resolversComposition);

exports["default"] = _default;