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
    artists: function artists(parent, args, _ref, info) {
      var db = _ref.db;
      return db.models.artist.findAll();
    },
    platforms: function platforms(parent, args, _ref2, info) {
      var db = _ref2.db;
      return db.models.platform.findAll();
    },
    publishers: function publishers(parent, args, _ref3, info) {
      var db = _ref3.db;
      return db.models.publisher.findAll();
    },
    publisher: function publisher(parent, _ref4, _ref5, info) {
      var id = _ref4.id;
      var db = _ref5.db;
      return db.models.publisher.findByPk(id);
    },
    classes: function classes(parent, args, _ref6, info) {
      var db = _ref6.db;
      return db.models["class"].findAll();
    },
    series: function series(parent, args, _ref7, info) {
      var db = _ref7.db;
      return db.models.series.findAll();
    },
    categories: function categories(parent, args, _ref8, info) {
      var db = _ref8.db;
      return db.models.category.findAll();
    },
    games: function games(parent, args, _ref9, info) {
      var db = _ref9.db;
      return db.models.game.findAll();
    },
    game: function game(parent, _ref10, _ref11, info) {
      var slug = _ref10.slug;
      var db = _ref11.db;
      return db.models.game.findByPk(slug);
    },
    album: function album(parent, _ref12, _ref13, info) {
      var id = _ref12.id,
          title = _ref12.title;
      var db = _ref13.db;
      return db.models.ost.findByPk(id);
    },
    downloads: function downloads(parent, _ref14, _ref15) {
      var id = _ref14.id;
      var db = _ref15.db;
      return db.models.download.findAll({
        where: {
          ostId: id
        }
      });
    },
    albums: function albums(parent, args, _ref16, info) {
      var db = _ref16.db;
      return db.models.ost.findAll({
        order: [['title', 'ASC']]
      });
    },
    platform: function () {
      var _platform = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(parent, _ref17, _ref18) {
        var id, db;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                id = _ref17.id;
                db = _ref18.db;
                return _context.abrupt("return", db.models.platform.findByPk(id));

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function platform(_x, _x2, _x3) {
        return _platform.apply(this, arguments);
      }

      return platform;
    }(),
    animation: function animation(parent, _ref19, _ref20) {
      var id = _ref19.id;
      var db = _ref20.db;
      return db.models.animation.findByPk(id);
    },
    animations: function animations(parent, args, _ref21) {
      var db = _ref21.db;
      return db.models.animation.findAll();
    },
    studio: function studio(parent, _ref22, _ref23) {
      var slug = _ref22.slug;
      var db = _ref23.db;
      return db.models.studio.findByPk(slug);
    },
    studios: function studios(parent, _ref24, _ref25) {
      var slug = _ref24.slug;
      var db = _ref25.db;
      return db.models.studio.findAll();
    },
    seriesOne: function seriesOne(parent, _ref26, _ref27, info) {
      var slug = _ref26.slug;
      var db = _ref27.db;
      return db.models.series.findByPk(slug);
    },
    albumCount: function () {
      var _albumCount = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(parent, params, _ref28) {
        var db;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                db = _ref28.db;
                return _context2.abrupt("return", db.models.ost.count());

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function albumCount(_x4, _x5, _x6) {
        return _albumCount.apply(this, arguments);
      }

      return albumCount;
    }(),
    recentSeries: function recentSeries(parent, _ref29, _ref30) {
      var limit = _ref29.limit;
      var db = _ref30.db;
      return db.models.series.findAll({
        limit: limit,
        order: [['createdAt', 'DESC']]
      });
    },
    recentPublishers: function recentPublishers(parent, _ref31, _ref32) {
      var limit = _ref31.limit;
      var db = _ref32.db;
      return db.models.publisher.findAll({
        limit: limit,
        order: [['createdAt', 'DESC']]
      });
    },
    recentPlatforms: function recentPlatforms(parent, _ref33, _ref34) {
      var limit = _ref33.limit,
          type = _ref33.type;
      var db = _ref34.db;
      return db.models.platform.findAll({
        limit: limit,
        order: [['createdAt', 'DESC']],
        where: {
          type: (0, _defineProperty2["default"])({}, _sequelize.Op.like, "%".concat(type, "%"))
        }
      });
    },
    getRandomAlbum: function () {
      var _getRandomAlbum = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(parent, _ref35, _ref36) {
        var _ref35$limit, limit, db, result;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _ref35$limit = _ref35.limit, limit = _ref35$limit === void 0 ? 1 : _ref35$limit;
                db = _ref36.db;
                _context3.next = 4;
                return db.models.ost.findAll({
                  order: db.random(),
                  limit: limit
                });

              case 4:
                result = _context3.sent;
                return _context3.abrupt("return", result);

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function getRandomAlbum(_x7, _x8, _x9) {
        return _getRandomAlbum.apply(this, arguments);
      }

      return getRandomAlbum;
    }()
  }
};
var _default = resolvers;
exports["default"] = _default;