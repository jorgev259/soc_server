"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _pages3 = _interopRequireDefault(require("../../../config/pages.json"));

var userResolvable = {
  roles: function roles(parent) {
    return parent.getRoles();
  },
  permissions: function () {
    var _permissions = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(parent) {
      var roles;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return parent.getRoles();

            case 2:
              roles = _context.sent;
              return _context.abrupt("return", roles.map(function (r) {
                return r.permissions;
              }).flat());

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function permissions(_x) {
      return _permissions.apply(this, arguments);
    }

    return permissions;
  }(),
  pages: function () {
    var _pages2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(parent) {
      var roles, permissions;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return parent.getRoles();

            case 2:
              roles = _context2.sent;
              permissions = roles.map(function (r) {
                return r.permissions;
              }).flat();
              return _context2.abrupt("return", _pages3["default"].filter(function (_ref) {
                var perms = _ref.perms,
                    name = _ref.name;
                return name && perms.some(function (r) {
                  return permissions.includes(r);
                });
              }));

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function pages(_x2) {
      return _pages2.apply(this, arguments);
    }

    return pages;
  }(),
  comments: function comments(user, _, _ref2) {
    var db = _ref2.db;
    return user.getComments();
  },
  favorites: function favorites(user) {
    return user.getOsts();
  },
  imgUrl: function () {
    var _imgUrl = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(user) {
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", "https://cdn.sittingonclouds.net/user/".concat(user.imgId ? "".concat(user.username, "_").concat(user.imgId) : 'default', ".png"));

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function imgUrl(_x3) {
      return _imgUrl.apply(this, arguments);
    }

    return imgUrl;
  }()
};
var funcs = {
  User: userResolvable,
  UserMe: userResolvable,
  Role: {
    permissions: function permissions(parent) {
      return typeof parent.permissions === 'string' || parent.permissions instanceof String ? JSON.parse(parent.permissions) : parent.permissions;
    }
  }
};
var _default = funcs;
exports["default"] = _default;