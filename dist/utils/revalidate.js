"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var token = process.env.IRONCLAD;

var revalidate = function revalidate(paths) {
  return _axios["default"].post('http://localhost:3000/api/revalidate', {
    token: token,
    revalidate: paths
  });
};

var _default = revalidate;
exports["default"] = _default;