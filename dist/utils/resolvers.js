"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.placeholder = exports.isAuthed = exports.headerColor = exports.hasRolePage = exports.hasRole = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _apolloServerErrors = require("apollo-server-errors");

var _path = _interopRequireDefault(require("path"));

var _session = require("../utils/session");

var _user = require("../utils/user");

var _startDB = _interopRequireDefault(require("../sequelize/startDB"));

var _plaiceholder = require("plaiceholder");

var _utils = require("../utils");

var isAuthed = function isAuthed(next) {
  return function (root, args, context, info) {
    if (!context.user) throw new _apolloServerErrors.AuthenticationError();
    return next(root, args, context, info);
  };
};

exports.isAuthed = isAuthed;

var hasPerm = function hasPerm(perm) {
  return function (next) {
    return /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(root, args, context, info) {
        var roles, permissions;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return context.user.getRoles();

              case 2:
                roles = _context.sent;
                permissions = roles.map(function (r) {
                  return r.permissions;
                }).flat();

                if (permissions.includes(perm)) {
                  _context.next = 6;
                  break;
                }

                throw new _apolloServerErrors.ForbiddenError();

              case 6:
                return _context.abrupt("return", next(root, args, context, info));

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x, _x2, _x3, _x4) {
        return _ref.apply(this, arguments);
      };
    }();
  };
};

var hasRole = function hasRole(role) {
  return [isAuthed, hasPerm(role)];
};

exports.hasRole = hasRole;

var hasRolePage = function hasRolePage(allowedRoles) {
  return (0, _session.withSessionSsr)( /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(context) {
      var req, username, user, perms;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              req = context.req;
              username = req.session.username;

              if (!username) {
                _context2.next = 8;
                break;
              }

              _context2.next = 5;
              return _startDB["default"].models.user.findByPk(username);

            case 5:
              _context2.t0 = _context2.sent;
              _context2.next = 9;
              break;

            case 8:
              _context2.t0 = null;

            case 9:
              user = _context2.t0;
              _context2.next = 12;
              return (0, _user.getPerms)(user);

            case 12:
              perms = _context2.sent;

              if (perms.some(function (p) {
                return allowedRoles.includes(p);
              })) {
                _context2.next = 15;
                break;
              }

              return _context2.abrupt("return", {
                redirect: {
                  destination: '/404',
                  permanent: false
                }
              });

            case 15:
              return _context2.abrupt("return", {
                props: {}
              });

            case 16:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x5) {
      return _ref2.apply(this, arguments);
    };
  }());
};

exports.hasRolePage = hasRolePage;

var placeholder = function placeholder(parent, folder) {
  if (!parent.placeholder) solvePlaceholder(parent, folder);
  return parent.placeholder;
};

exports.placeholder = placeholder;

function solvePlaceholder(_x6, _x7) {
  return _solvePlaceholder.apply(this, arguments);
}

function _solvePlaceholder() {
  _solvePlaceholder = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(parent, folder) {
    var id, pathString, fullPath, result, base64;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = parent.slug || parent.id;
            pathString = _path["default"].join('/var/www/soc_img/img', folder);
            fullPath = _path["default"].join(pathString, "".concat(id, ".png"));
            _context4.next = 5;
            return (0, _plaiceholder.getPlaiceholder)(fullPath);

          case 5:
            result = _context4.sent;
            base64 = result.base64;
            parent.placeholder = base64;
            _context4.next = 10;
            return parent.save();

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _solvePlaceholder.apply(this, arguments);
}

var headerColor = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(parent, folder) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.t1 = parent.headerColor;

            if (_context3.t1) {
              _context3.next = 5;
              break;
            }

            _context3.next = 4;
            return solveHeaderColor(parent, folder);

          case 4:
            _context3.t1 = _context3.sent;

          case 5:
            _context3.t0 = _context3.t1;

            if (_context3.t0) {
              _context3.next = 8;
              break;
            }

            _context3.t0 = '#ffffff';

          case 8:
            return _context3.abrupt("return", _context3.t0);

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function headerColor(_x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.headerColor = headerColor;

function solveHeaderColor(_x10, _x11) {
  return _solveHeaderColor.apply(this, arguments);
}

function _solveHeaderColor() {
  _solveHeaderColor = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(parent, folder) {
    var color;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return (0, _utils.getImgColor)("".concat(folder, "/").concat(parent.slug || parent.id));

          case 2:
            color = _context5.sent;
            parent.headerColor = color;
            parent.save();
            return _context5.abrupt("return", color);

          case 6:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _solveHeaderColor.apply(this, arguments);
}