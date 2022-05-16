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

var resolversComposition = {
  'Mutation.*': [_resolvers.isAuthed]
};
var resolvers = {
  Mutation: {
    updateComment: function () {
      var _updateComment = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref, _ref2) {
        var text, anon, ostId, db, user, res, username, row;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                text = _ref.text, anon = _ref.anon, ostId = _ref.ostId;
                db = _ref2.db, user = _ref2.user, res = _ref2.res;
                username = user.username;
                _context.next = 5;
                return db.models.comment.findOne({
                  where: {
                    ostId: ostId,
                    username: username
                  }
                });

              case 5:
                row = _context.sent;

                if (!row) {
                  _context.next = 13;
                  break;
                }

                _context.next = 9;
                return row.update({
                  text: text,
                  anon: anon
                });

              case 9:
                _context.next = 11;
                return row.save();

              case 11:
                _context.next = 15;
                break;

              case 13:
                _context.next = 15;
                return db.models.comment.create({
                  ostId: ostId,
                  username: username,
                  text: text,
                  anon: anon
                });

              case 15:
                _context.next = 17;
                return res.unstable_revalidate("/album/".concat(ostId));

              case 17:
                return _context.abrupt("return", true);

              case 18:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function updateComment(_x, _x2, _x3) {
        return _updateComment.apply(this, arguments);
      }

      return updateComment;
    }(),
    addFavorite: function () {
      var _addFavorite = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_, _ref3, _ref4) {
        var ostId, db, user, res;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                ostId = _ref3.ostId;
                db = _ref4.db, user = _ref4.user, res = _ref4.res;
                _context2.next = 4;
                return user.addOst(ostId);

              case 4:
                _context2.next = 6;
                return res.unstable_revalidate("/album/".concat(ostId));

              case 6:
                return _context2.abrupt("return", true);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function addFavorite(_x4, _x5, _x6) {
        return _addFavorite.apply(this, arguments);
      }

      return addFavorite;
    }(),
    removeFavorite: function () {
      var _removeFavorite = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_, _ref5, _ref6) {
        var ostId, db, user, res;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                ostId = _ref5.ostId;
                db = _ref6.db, user = _ref6.user, res = _ref6.res;
                _context3.next = 4;
                return user.removeOst(ostId);

              case 4:
                _context3.next = 6;
                return res.unstable_revalidate("/album/".concat(ostId));

              case 6:
                return _context3.abrupt("return", true);

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function removeFavorite(_x7, _x8, _x9) {
        return _removeFavorite.apply(this, arguments);
      }

      return removeFavorite;
    }()
  }
};

var _default = (0, _resolversComposition.composeResolvers)(resolvers, resolversComposition);

exports["default"] = _default;