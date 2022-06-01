"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _apolloServerErrors = require("apollo-server-errors");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _sequelize = require("sequelize");

var _resolversComposition = require("@graphql-tools/resolvers-composition");

var _info = _interopRequireDefault(require("../../../config/info.json"));

var _resolvers = require("../../../utils/resolvers");

var _permissions = _info["default"].permissions;
var resolversComposition = {
  'Query.users': (0, _resolvers.hasRole)('MANAGE_USER')
};
var resolvers = {
  Query: {
    login: function () {
      var _login = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(parent, _ref, _ref2) {
        var username, password, db, req, user, valid;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                username = _ref.username, password = _ref.password;
                db = _ref2.db, req = _ref2.req;
                _context.next = 4;
                return db.models.user.findByPk(username);

              case 4:
                user = _context.sent;

                if (user) {
                  _context.next = 7;
                  break;
                }

                throw new _apolloServerErrors.UserInputError();

              case 7:
                _context.next = 9;
                return _bcrypt["default"].compare(password, user.password);

              case 9:
                valid = _context.sent;

                if (valid) {
                  _context.next = 12;
                  break;
                }

                throw new _apolloServerErrors.UserInputError();

              case 12:
                req.session.username = user.username;
                _context.next = 15;
                return user.getRoles();

              case 15:
                req.session.permissions = _context.sent.map(function (r) {
                  return r.permissions;
                }).flat();
                _context.next = 18;
                return req.session.save();

              case 18:
                return _context.abrupt("return", 200);

              case 19:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function login(_x, _x2, _x3) {
        return _login.apply(this, arguments);
      }

      return login;
    }(),
    logout: function logout(parent, args, _ref3) {
      var req = _ref3.req,
          res = _ref3.res;
      req.session.destroy();
      res.setHeader('cache-control', 'no-store, max-age=0');
      return 200;
    },
    me: function me(parent, args, _ref4) {
      var db = _ref4.db,
          user = _ref4.user;
      return user;
    },
    permissions: function permissions() {
      return _permissions;
    },
    roles: function roles(parent, args, _ref5) {
      var db = _ref5.db;
      return db.models.role.findAll();
    },
    users: function users(parent, args, _ref6) {
      var db = _ref6.db;
      var username = args.username.trim();
      if (username.length < 3) return [];
      return db.models.user.findAll({
        where: {
          username: (0, _defineProperty2["default"])({}, _sequelize.Op.like, "%".concat(username, "%"))
        }
      });
    },
    user: function user(parent, _ref7, _ref8) {
      var username = _ref7.username;
      var db = _ref8.db;
      return db.models.user.findByPk(username);
    }
  }
};

var _default = (0, _resolversComposition.composeResolvers)(resolvers, resolversComposition);

exports["default"] = _default;