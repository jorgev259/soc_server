"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _sequelize = require("sequelize");

var resolvers = {
  Query: {
    searchAlbum: function searchAlbum(parent, _ref, _ref2) {
      var _where;

      var _ref$title = _ref.title,
          title = _ref$title === void 0 ? '' : _ref$title,
          classes = _ref.classes,
          limit = _ref.limit,
          _ref$page = _ref.page,
          page = _ref$page === void 0 ? 0 : _ref$page,
          _ref$order = _ref.order,
          order = _ref$order === void 0 ? ['createdAt'] : _ref$order,
          _ref$mode = _ref.mode,
          mode = _ref$mode === void 0 ? 'DESC' : _ref$mode,
          _ref$status = _ref.status,
          status = _ref$status === void 0 ? ['show'] : _ref$status;
      var db = _ref2.db;
      var titleWords = title.split(' ');
      return searchPage({
        limit: limit,
        page: page,
        model: 'ost'
      }, {
        where: (_where = {}, (0, _defineProperty2["default"])(_where, _sequelize.Op.or, [(0, _defineProperty2["default"])({}, _sequelize.Op.and, titleWords.map(function (t) {
          return {
            title: (0, _defineProperty2["default"])({}, _sequelize.Op.like, "%".concat(t, "%"))
          };
        })), (0, _defineProperty2["default"])({}, _sequelize.Op.and, titleWords.map(function (t) {
          return {
            subTitle: (0, _defineProperty2["default"])({}, _sequelize.Op.like, "%".concat(t, "%"))
          };
        }))]), (0, _defineProperty2["default"])(_where, "status", (0, _defineProperty2["default"])({}, _sequelize.Op["in"], status)), _where),
        include: classes ? [{
          model: db.models["class"],
          where: {
            name: (0, _defineProperty2["default"])({}, _sequelize.Op["in"], classes)
          }
        }] : [],
        order: [(0, _sequelize.literal)('`ost`.`status` = \'coming\' DESC')].concat((0, _toConsumableArray2["default"])(order.map(function (o) {
          return [o, mode];
        })))
      }, db);
    },
    searchAlbumByArtist: function () {
      var _searchAlbumByArtist = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(parent, _ref5, _ref6) {
        var name, classes, limit, _ref5$page, page, _ref5$order, order, _ref5$mode, mode, _ref5$status, status, db, include;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                name = _ref5.name, classes = _ref5.classes, limit = _ref5.limit, _ref5$page = _ref5.page, page = _ref5$page === void 0 ? 0 : _ref5$page, _ref5$order = _ref5.order, order = _ref5$order === void 0 ? ['createdAt'] : _ref5$order, _ref5$mode = _ref5.mode, mode = _ref5$mode === void 0 ? 'DESC' : _ref5$mode, _ref5$status = _ref5.status, status = _ref5$status === void 0 ? ['show'] : _ref5$status;
                db = _ref6.db;
                include = [{
                  model: db.models.artist,
                  where: {
                    name: (0, _defineProperty2["default"])({}, _sequelize.Op.like, "%".concat(name, "%"))
                  }
                }];
                if (classes) include.push({
                  model: db.models["class"],
                  where: {
                    name: (0, _defineProperty2["default"])({}, _sequelize.Op["in"], classes)
                  }
                });
                return _context.abrupt("return", searchPage({
                  limit: limit,
                  page: page,
                  model: 'ost'
                }, {
                  where: {
                    status: (0, _defineProperty2["default"])({}, _sequelize.Op["in"], status)
                  },
                  include: include,
                  order: order.map(function (o) {
                    return [o, mode];
                  })
                }, db));

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function searchAlbumByArtist(_x, _x2, _x3) {
        return _searchAlbumByArtist.apply(this, arguments);
      }

      return searchAlbumByArtist;
    }(),
    searchAnimation: function searchAnimation(parent, _ref7, _ref8) {
      var _ref7$title = _ref7.title,
          title = _ref7$title === void 0 ? '' : _ref7$title,
          limit = _ref7.limit,
          _ref7$page = _ref7.page,
          page = _ref7$page === void 0 ? 0 : _ref7$page,
          _ref7$order = _ref7.order,
          order = _ref7$order === void 0 ? 'createdAt' : _ref7$order,
          _ref7$mode = _ref7.mode,
          mode = _ref7$mode === void 0 ? 'DESC' : _ref7$mode;
      var db = _ref8.db;
      return searchPage({
        title: title,
        limit: limit,
        page: page,
        model: 'animation'
      }, {
        where: {
          title: (0, _defineProperty2["default"])({}, _sequelize.Op.like, "%".concat(title, "%"))
        },
        order: [[order, mode]]
      }, db);
    },
    searchStudio: function searchStudio(parent, _ref9, _ref10) {
      var _ref9$name = _ref9.name,
          name = _ref9$name === void 0 ? '' : _ref9$name,
          limit = _ref9.limit,
          _ref9$page = _ref9.page,
          page = _ref9$page === void 0 ? 0 : _ref9$page,
          _ref9$order = _ref9.order,
          order = _ref9$order === void 0 ? 'createdAt' : _ref9$order,
          _ref9$mode = _ref9.mode,
          mode = _ref9$mode === void 0 ? 'DESC' : _ref9$mode;
      var db = _ref10.db;
      return searchPage({
        name: name,
        limit: limit,
        page: page,
        model: 'studio'
      }, {
        where: {
          name: (0, _defineProperty2["default"])({}, _sequelize.Op.like, "%".concat(name, "%"))
        },
        order: [[order, mode]]
      }, db);
    },
    searchGame: function searchGame(parent, _ref11, _ref12) {
      var _ref11$name = _ref11.name,
          name = _ref11$name === void 0 ? '' : _ref11$name,
          limit = _ref11.limit,
          _ref11$page = _ref11.page,
          page = _ref11$page === void 0 ? 0 : _ref11$page,
          _ref11$order = _ref11.order,
          order = _ref11$order === void 0 ? 'createdAt' : _ref11$order,
          _ref11$mode = _ref11.mode,
          mode = _ref11$mode === void 0 ? 'DESC' : _ref11$mode;
      var db = _ref12.db;
      return searchPage({
        name: name,
        limit: limit,
        page: page,
        model: 'game'
      }, {
        where: {
          name: (0, _defineProperty2["default"])({}, _sequelize.Op.like, "%".concat(name, "%"))
        },
        order: [[order, mode]]
      }, db);
    },
    searchSeries: function searchSeries(parent, _ref13, _ref14) {
      var _ref13$name = _ref13.name,
          name = _ref13$name === void 0 ? '' : _ref13$name,
          limit = _ref13.limit,
          _ref13$page = _ref13.page,
          page = _ref13$page === void 0 ? 0 : _ref13$page,
          _ref13$order = _ref13.order,
          order = _ref13$order === void 0 ? 'createdAt' : _ref13$order,
          _ref13$mode = _ref13.mode,
          mode = _ref13$mode === void 0 ? 'DESC' : _ref13$mode;
      var db = _ref14.db;
      return searchPage({
        name: name,
        limit: limit,
        page: page,
        model: 'series'
      }, {
        where: {
          name: (0, _defineProperty2["default"])({}, _sequelize.Op.like, "%".concat(name, "%"))
        },
        order: [[order, mode]]
      }, db);
    },
    searchSeriesByName: function searchSeriesByName(parent, _ref15, _ref16) {
      var name = _ref15.name;
      var db = _ref16.db;
      return db.models.series.findAll({
        where: {
          name: (0, _defineProperty2["default"])({}, _sequelize.Op.like, "%".concat(name, "%"))
        }
      });
    },
    searchPublishersByName: function searchPublishersByName(parent, _ref17, _ref18) {
      var name = _ref17.name;
      var db = _ref18.db;
      return db.models.publisher.findAll({
        where: {
          name: (0, _defineProperty2["default"])({}, _sequelize.Op.like, "%".concat(name, "%"))
        }
      });
    },
    searchPlatformsByName: function searchPlatformsByName(parent, _ref19, _ref20) {
      var name = _ref19.name,
          type = _ref19.type;
      var db = _ref20.db;
      return db.models.platform.findAll({
        where: {
          name: (0, _defineProperty2["default"])({}, _sequelize.Op.like, "%".concat(name, "%")),
          type: (0, _defineProperty2["default"])({}, _sequelize.Op.like, "%".concat(type, "%"))
        }
      });
    }
  }
};

var searchPage = function searchPage(args, options, db) {
  var limit = args.limit,
      page = args.page,
      model = args.model;

  if (limit !== undefined) {
    options.limit = limit;
    options.offset = limit * page;
  }

  return db.models[model].findAndCountAll(options);
};

var _default = resolvers;
exports["default"] = _default;