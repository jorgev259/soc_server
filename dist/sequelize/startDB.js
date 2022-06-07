"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _relations = _interopRequireDefault(require("../sequelize/relations"));

var _animation = _interopRequireWildcard(require("./models/animation"));

var _artist = _interopRequireWildcard(require("./models/artist"));

var _category = _interopRequireWildcard(require("./models/category"));

var _class = _interopRequireWildcard(require("./models/class"));

var _comment = _interopRequireWildcard(require("./models/comment"));

var _config = _interopRequireWildcard(require("./models/config"));

var _disc = _interopRequireWildcard(require("./models/disc"));

var _download = _interopRequireWildcard(require("./models/download"));

var _game = _interopRequireWildcard(require("./models/game"));

var _link = _interopRequireWildcard(require("./models/link"));

var _log = _interopRequireWildcard(require("./models/log"));

var _ost = _interopRequireWildcard(require("./models/ost"));

var _platform = _interopRequireWildcard(require("./models/platform"));

var _publisher = _interopRequireWildcard(require("./models/publisher"));

var _request = _interopRequireWildcard(require("./models/request"));

var _role = _interopRequireWildcard(require("./models/role"));

var _series = _interopRequireWildcard(require("./models/series"));

var _store = _interopRequireWildcard(require("./models/store"));

var _user = _interopRequireWildcard(require("./models/user"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _dirImport = {};

for (var _key18 in _user) {
  _dirImport[_key18 === 'default' ? "user" : _key18] = _user[_key18];
}

for (var _key17 in _store) {
  _dirImport[_key17 === 'default' ? "store" : _key17] = _store[_key17];
}

for (var _key16 in _series) {
  _dirImport[_key16 === 'default' ? "series" : _key16] = _series[_key16];
}

for (var _key15 in _role) {
  _dirImport[_key15 === 'default' ? "role" : _key15] = _role[_key15];
}

for (var _key14 in _request) {
  _dirImport[_key14 === 'default' ? "request" : _key14] = _request[_key14];
}

for (var _key13 in _publisher) {
  _dirImport[_key13 === 'default' ? "publisher" : _key13] = _publisher[_key13];
}

for (var _key12 in _platform) {
  _dirImport[_key12 === 'default' ? "platform" : _key12] = _platform[_key12];
}

for (var _key11 in _ost) {
  _dirImport[_key11 === 'default' ? "ost" : _key11] = _ost[_key11];
}

for (var _key10 in _log) {
  _dirImport[_key10 === 'default' ? "log" : _key10] = _log[_key10];
}

for (var _key9 in _link) {
  _dirImport[_key9 === 'default' ? "link" : _key9] = _link[_key9];
}

for (var _key8 in _game) {
  _dirImport[_key8 === 'default' ? "game" : _key8] = _game[_key8];
}

for (var _key7 in _download) {
  _dirImport[_key7 === 'default' ? "download" : _key7] = _download[_key7];
}

for (var _key6 in _disc) {
  _dirImport[_key6 === 'default' ? "disc" : _key6] = _disc[_key6];
}

for (var _key5 in _config) {
  _dirImport[_key5 === 'default' ? "config" : _key5] = _config[_key5];
}

for (var _key4 in _comment) {
  _dirImport[_key4 === 'default' ? "comment" : _key4] = _comment[_key4];
}

for (var _key3 in _class) {
  _dirImport[_key3 === 'default' ? "class" : _key3] = _class[_key3];
}

for (var _key2 in _category) {
  _dirImport[_key2 === 'default' ? "category" : _key2] = _category[_key2];
}

for (var _key in _artist) {
  _dirImport[_key === 'default' ? "artist" : _key] = _artist[_key];
}

for (var key in _animation) {
  _dirImport[key === 'default' ? "animation" : key] = _animation[key];
}

var models = _dirImport;
var db = new _sequelize["default"](process.env.GITHUB_ACTIONS ? 'sqlite::memory:' : JSON.parse(process.env.SEQUELIZE));
Object.values(models).forEach(function (model) {
  return model(db);
});
(0, _relations["default"])(db);
var _default = db;
exports["default"] = _default;