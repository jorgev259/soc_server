"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _clsHooked = _interopRequireDefault(require("cls-hooked"));

var _relations = _interopRequireDefault(require("../sequelize/relations"));

var _animation = _interopRequireDefault(require("../sequelize/models/animation"));

var _artist = _interopRequireDefault(require("../sequelize/models/artist"));

var _category = _interopRequireDefault(require("../sequelize/models/category"));

var _class = _interopRequireDefault(require("../sequelize/models/class"));

var _config = _interopRequireDefault(require("../sequelize/models/config"));

var _disc = _interopRequireDefault(require("../sequelize/models/disc"));

var _download = _interopRequireDefault(require("../sequelize/models/download"));

var _game = _interopRequireDefault(require("../sequelize/models/game"));

var _link = _interopRequireDefault(require("../sequelize/models/link"));

var _ost = _interopRequireDefault(require("../sequelize/models/ost"));

var _platform = _interopRequireDefault(require("../sequelize/models/platform"));

var _publisher = _interopRequireDefault(require("../sequelize/models/publisher"));

var _role = _interopRequireDefault(require("../sequelize/models/role"));

var _series = _interopRequireDefault(require("../sequelize/models/series"));

var _store = _interopRequireDefault(require("../sequelize/models/store"));

var _user = _interopRequireDefault(require("../sequelize/models/user"));

var _log = _interopRequireDefault(require("../sequelize/models/log"));

var _comment = _interopRequireDefault(require("../sequelize/models/comment"));

var db = new _sequelize["default"](process.env.GITHUB_ACTIONS ? 'sqlite::memory:' : JSON.parse(process.env.SEQUELIZE));

_sequelize["default"].useCLS(_clsHooked["default"].createNamespace('trans-namespace')); // eslint-disable-line react-hooks/rules-of-hooks


(0, _animation["default"])(db);
(0, _artist["default"])(db);
(0, _category["default"])(db);
(0, _class["default"])(db);
(0, _config["default"])(db);
(0, _disc["default"])(db);
(0, _download["default"])(db);
(0, _game["default"])(db);
(0, _link["default"])(db);
(0, _ost["default"])(db);
(0, _platform["default"])(db);
(0, _publisher["default"])(db);
(0, _role["default"])(db);
(0, _series["default"])(db);
(0, _store["default"])(db);
(0, _user["default"])(db);
(0, _log["default"])(db);
(0, _comment["default"])(db);
(0, _relations["default"])(db);
var _default = db;
exports["default"] = _default;