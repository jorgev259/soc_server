"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPerms = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var getPerms = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(user) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!user) {
              _context.next = 6;
              break;
            }

            _context.next = 3;
            return user.getRoles();

          case 3:
            _context.t0 = _context.sent.map(function (r) {
              return r.permissions;
            }).flat();
            _context.next = 7;
            break;

          case 6:
            _context.t0 = [];

          case 7:
            return _context.abrupt("return", _context.t0);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getPerms(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.getPerms = getPerms;