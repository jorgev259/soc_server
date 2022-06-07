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

var _resolvers = require("../../../utils/resolvers");

var resolversComposition = {
  'Mutation.*': (0, _resolvers.hasRole)('REQUESTS')
};
var resolvers = {
  Mutation: {
    editRequest: function () {
      var _editRequest = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(parent, data, _ref, info) {
        var db, user, request;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                db = _ref.db, user = _ref.user;
                _context.next = 3;
                return db.models.request.findByPk(data.id);

              case 3:
                request = _context.sent;

                if (request) {
                  _context.next = 6;
                  break;
                }

                throw new _apolloServerErrors.UserInputError('Request not found');

              case 6:
                _context.next = 8;
                return request.set(data);

              case 8:
                _context.next = 10;
                return request.save();

              case 10:
                return _context.abrupt("return", request);

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function editRequest(_x, _x2, _x3, _x4) {
        return _editRequest.apply(this, arguments);
      }

      return editRequest;
    }(),
    rejectRequest: function () {
      var _rejectRequest = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(parent, data, _ref2, info) {
        var db, user, request;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                db = _ref2.db, user = _ref2.user;
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
                return request.destroy();

              case 8:
                return _context2.abrupt("return", true);

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function rejectRequest(_x5, _x6, _x7, _x8) {
        return _rejectRequest.apply(this, arguments);
      }

      return rejectRequest;
    }()
  }
};

var _default = (0, _resolversComposition.composeResolvers)(resolvers, resolversComposition);

exports["default"] = _default;