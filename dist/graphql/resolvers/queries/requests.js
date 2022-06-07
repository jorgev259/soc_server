"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
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
    }
  }
};
var _default = resolvers;
exports["default"] = _default;