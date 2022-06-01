"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var resolvers = {
  Query: {
    config: function config(parent, _ref, _ref2, info) {
      var name = _ref.name;
      var db = _ref2.db,
          req = _ref2.req;
      return db.models.config.findOrCreate({
        where: {
          name: name
        }
      }).then(function () {
        return db.models.config.findByPk(name);
      });
    },
    highlight: function () {
      var _highlight = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(parent, args, _ref3) {
        var db, _yield$db$models$conf, value;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                db = _ref3.db;
                _context.next = 3;
                return db.models.config.findByPk('highlight');

              case 3:
                _yield$db$models$conf = _context.sent;
                value = _yield$db$models$conf.value;
                return _context.abrupt("return", db.models.ost.findByPk(value));

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function highlight(_x, _x2, _x3) {
        return _highlight.apply(this, arguments);
      }

      return highlight;
    }()
  }
};
var _default = resolvers;
exports["default"] = _default;