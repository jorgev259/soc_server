"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _comments = _interopRequireWildcard(require("./mutations/comments"));

var _create = _interopRequireWildcard(require("./mutations/create"));

var _site = _interopRequireWildcard(require("./mutations/site"));

var _update = _interopRequireWildcard(require("./mutations/update"));

var _user = _interopRequireWildcard(require("./mutations/user"));

var _album = _interopRequireWildcard(require("./queries/album"));

var _search = _interopRequireWildcard(require("./queries/search"));

var _site2 = _interopRequireWildcard(require("./queries/site"));

var _user2 = _interopRequireWildcard(require("./queries/user"));

var _album2 = _interopRequireWildcard(require("./types/album"));

var _user3 = _interopRequireWildcard(require("./types/user"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _dirImport = {};

for (var _key4 in _user) {
  _dirImport[_key4 === 'default' ? "user" : _key4] = _user[_key4];
}

for (var _key3 in _update) {
  _dirImport[_key3 === 'default' ? "update" : _key3] = _update[_key3];
}

for (var _key2 in _site) {
  _dirImport[_key2 === 'default' ? "site" : _key2] = _site[_key2];
}

for (var _key in _create) {
  _dirImport[_key === 'default' ? "create" : _key] = _create[_key];
}

for (var key in _comments) {
  _dirImport[key === 'default' ? "comments" : key] = _comments[key];
}

var mutations = _dirImport;
var _dirImport2 = {};

for (var _key8 in _user2) {
  _dirImport2[_key8 === 'default' ? "user" : _key8] = _user2[_key8];
}

for (var _key7 in _site2) {
  _dirImport2[_key7 === 'default' ? "site" : _key7] = _site2[_key7];
}

for (var _key6 in _search) {
  _dirImport2[_key6 === 'default' ? "search" : _key6] = _search[_key6];
}

for (var _key5 in _album) {
  _dirImport2[_key5 === 'default' ? "album" : _key5] = _album[_key5];
}

var queries = _dirImport2;
var _dirImport3 = {};

for (var _key10 in _user3) {
  _dirImport3[_key10 === 'default' ? "user" : _key10] = _user3[_key10];
}

for (var _key9 in _album2) {
  _dirImport3[_key9 === 'default' ? "album" : _key9] = _album2[_key9];
}

var types = _dirImport3;

var listResolvers = function listResolvers(obj) {
  return Object.entries(obj).map(function (_ref) {
    var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
        _ = _ref2[0],
        value = _ref2[1];

    return value;
  });
};

var resolvers = [].concat((0, _toConsumableArray2["default"])(listResolvers(mutations)), (0, _toConsumableArray2["default"])(listResolvers(queries)), (0, _toConsumableArray2["default"])(listResolvers(types)));
var _default = resolvers;
exports["default"] = _default;