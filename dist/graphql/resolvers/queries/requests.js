"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _sequelize = require("sequelize");

var resolvers = {
  Query: {
    requests: function requests(_, _ref, _ref2) {
      var _ref$state = _ref.state,
          state = _ref$state === void 0 ? ['complete', 'hold', 'pending'] : _ref$state,
          _ref$donator = _ref.donator,
          donator = _ref$donator === void 0 ? [true, false] : _ref$donator;
      var db = _ref2.db;
      return db.models.request.findAll({
        where: {
          state: state,
          donator: donator
        }
      });
    },
    request: function request(_, _ref3, _ref4) {
      var link = _ref3.link;
      var db = _ref4.db;
      return db.models.request.findOne({
        where: {
          link: link
        }
      });
    },
    searchRequests: function () {
      var _searchRequests = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_, _ref5, _ref6) {
        var _ref5$state, state, _ref5$donator, donator, _ref5$limit, limit, filter, db, searchId;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _ref5$state = _ref5.state, state = _ref5$state === void 0 ? ['complete', 'hold', 'pending'] : _ref5$state, _ref5$donator = _ref5.donator, donator = _ref5$donator === void 0 ? [true, false] : _ref5$donator, _ref5$limit = _ref5.limit, limit = _ref5$limit === void 0 ? 10 : _ref5$limit, filter = _ref5.filter;
                db = _ref6.db;

                if (!filter) {
                  _context.next = 8;
                  break;
                }

                _context.next = 5;
                return db.models.request.findAll({
                  donator: donator,
                  where: (0, _defineProperty2["default"])({
                    state: state
                  }, _sequelize.Op.or, [{
                    id: filter
                  }, {
                    link: filter
                  }, {
                    user: filter
                  }, {
                    userID: filter
                  }]),
                  limit: limit
                });

              case 5:
                searchId = _context.sent;

                if (!(searchId.length > 0)) {
                  _context.next = 8;
                  break;
                }

                return _context.abrupt("return", searchId);

              case 8:
                return _context.abrupt("return", db.models.request.findAll({
                  where: [{
                    state: state,
                    donator: donator
                  }, (0, _sequelize.where)((0, _sequelize.fn)('LOWER', (0, _sequelize.col)('title')), (0, _defineProperty2["default"])({}, _sequelize.Op.like, "%".concat(filter || '', "%")))],
                  limit: limit
                }));

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function searchRequests(_x, _x2, _x3) {
        return _searchRequests.apply(this, arguments);
      }

      return searchRequests;
    }()
  }
};
var _default = resolvers;
exports["default"] = _default;