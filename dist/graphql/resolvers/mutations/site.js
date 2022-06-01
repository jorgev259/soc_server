"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _resolversComposition = require("@graphql-tools/resolvers-composition");

var _utils = require("../../../utils");

var _resolvers = require("../../../utils/resolvers");

var resolversComposition = {
  'Mutation.*': (0, _resolvers.hasRole)('UPDATE')
};
var resolvers = {
  Mutation: {
    config: function () {
      var _config = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(parent, data, _ref, info) {
        var db, payload;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                db = _ref.db, payload = _ref.payload;
                return _context.abrupt("return", db.models.config.upsert(data).then(function () {
                  return db.models.config.findByPk(data.name);
                }));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function config(_x, _x2, _x3, _x4) {
        return _config.apply(this, arguments);
      }

      return config;
    }(),
    uploadBanner: function () {
      var _uploadBanner = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(parent, _ref2, _ref3) {
        var banner, db, payload, timestamp;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                banner = _ref2.banner;
                db = _ref3.db, payload = _ref3.payload;
                timestamp = Date.now();
                _context2.next = 5;
                return (0, _utils.img)(banner, 'live', timestamp);

              case 5:
                _context2.next = 7;
                return db.models.config.upsert({
                  name: 'banner',
                  value: timestamp
                });

              case 7:
                return _context2.abrupt("return", 1);

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function uploadBanner(_x5, _x6, _x7) {
        return _uploadBanner.apply(this, arguments);
      }

      return uploadBanner;
    }()
  }
};

var _default = (0, _resolversComposition.composeResolvers)(resolvers, resolversComposition);

exports["default"] = _default;