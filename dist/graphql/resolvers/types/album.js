"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _GraphQLUpload = _interopRequireDefault(require("graphql-upload/public/GraphQLUpload.js"));

var _resolvers = require("../../../utils/resolvers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var resolvers = {
  Upload: _GraphQLUpload["default"],
  Album: {
    artists: function artists(parent, args, context, info) {
      return parent.getArtists();
    },
    classes: function classes(parent, args, context, info) {
      return parent.getClasses();
    },
    categories: function categories(parent, args, context, info) {
      return parent.getCategories();
    },
    platforms: function platforms(parent, args, context, info) {
      return parent.getPlatforms({
        order: ['name']
      });
    },
    games: function games(parent, args, context, info) {
      return parent.getGames();
    },
    discs: function discs(parent, args, context, info) {
      return parent.getDiscs({
        order: [['number', 'ASC']]
      });
    },
    related: function related(parent, args, context, info) {
      return parent.getRelated();
    },
    stores: function stores(parent) {
      return parent.getStores();
    },
    animations: function animations(parent) {
      return parent.getAnimations();
    },
    comments: function comments(parent) {
      return parent.getComments();
    },
    isFavorite: function () {
      var _isFavorite = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(album, _, _ref) {
        var db, user;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                db = _ref.db, user = _ref.user;
                return _context.abrupt("return", user ? album.hasUser(user.username) : false);

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function isFavorite(_x, _x2, _x3) {
        return _isFavorite.apply(this, arguments);
      }

      return isFavorite;
    }(),
    selfComment: function selfComment(album, _, _ref2) {
      var db = _ref2.db,
          user = _ref2.user;
      return user ? db.models.comment.findOne({
        where: {
          ostId: album.id,
          username: user.username
        }
      }) : null;
    },
    favorites: function favorites(album, _, _ref3) {
      var db = _ref3.db;
      return album.countUsers();
    },
    placeholder: function placeholder(album, _, _ref4) {
      var db = _ref4.db;
      return (0, _resolvers.placeholder)(album, 'album');
    },
    headerColor: function headerColor(album, _, _ref5) {
      var db = _ref5.db;
      return (0, _resolvers.headerColor)(album, 'album');
    }
  },
  Comment: {
    username: function username(parent) {
      return parent.anon ? null : parent.username;
    },
    album: function album(comment, _, _ref6) {
      var db = _ref6.db;
      return comment.getOst();
    }
  },
  Category: {
    albums: function albums(parent) {
      return parent.getOsts();
    }
  },
  Class: {
    albums: function albums(parent) {
      return parent.getOsts();
    },
    count: function count(parent, args, _ref7) {
      var db = _ref7.db;
      return db.models.ost.count({
        include: [{
          model: db.models["class"],
          where: {
            name: parent.name
          }
        }]
      });
    }
  },
  Download: {
    links: function () {
      var _links = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(parent, args, _ref8, info) {
        var req, db, user, donator, links, roles, perms;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                req = _ref8.req, db = _ref8.db, user = _ref8.user;
                donator = false;
                _context2.next = 4;
                return parent.getLinks();

              case 4:
                links = _context2.sent;

                if (!user) {
                  _context2.next = 11;
                  break;
                }

                _context2.next = 8;
                return user.getRoles();

              case 8:
                roles = _context2.sent;
                perms = roles.map(function (r) {
                  return r.permissions;
                }).flat();
                donator = perms.includes('DIRECT');

              case 11:
                return _context2.abrupt("return", links.map(function (l) {
                  var link = _objectSpread({}, l.dataValues);

                  if (!donator) link.directUrl = '/unauthorized';
                  return link;
                }));

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function links(_x4, _x5, _x6, _x7) {
        return _links.apply(this, arguments);
      }

      return links;
    }()
  },
  Game: {
    albums: function () {
      var _albums = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(game, _ref9) {
        var _ref9$order, order;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _ref9$order = _ref9.order, order = _ref9$order === void 0 ? [] : _ref9$order;
                return _context3.abrupt("return", game.getOsts({
                  order: order
                }));

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function albums(_x8, _x9) {
        return _albums.apply(this, arguments);
      }

      return albums;
    }(),
    series: function series(parent, args, context, info) {
      return parent.getSeries();
    },
    publishers: function publishers(parent, args, context, info) {
      return parent.getPublishers();
    },
    platforms: function platforms(parent, args, context, info) {
      return parent.getPlatforms({
        order: ['name']
      });
    },
    placeholder: function placeholder(game, _, _ref10) {
      var db = _ref10.db;
      return (0, _resolvers.placeholder)(game, 'game');
    },
    headerColor: function headerColor(game, _, _ref11) {
      var db = _ref11.db;
      return (0, _resolvers.headerColor)(game, 'game');
    }
  },
  Platform: {
    albums: function albums(parent) {
      return parent.getOsts();
    },
    games: function games(platform, args, _ref12) {
      var db = _ref12.db;
      return platform.getGames();
    }
  },
  Animation: {
    studios: function studios(parent) {
      return parent.getStudios();
    },
    albums: function albums(parent) {
      return parent.getOsts();
    },
    placeholder: function placeholder(anim, _, _ref13) {
      var db = _ref13.db;
      return (0, _resolvers.placeholder)(anim, 'anim');
    },
    headerColor: function headerColor(anim, _, _ref14) {
      var db = _ref14.db;
      return (0, _resolvers.placeholder)(anim, 'anim');
    }
  },
  Studio: {
    animations: function animations(studio) {
      return studio.getAnimations();
    }
  },
  Series: {
    games: function games(parent, args, context, info) {
      return parent.getGames();
    },
    placeholder: function placeholder(series, _, _ref15) {
      var db = _ref15.db;
      return (0, _resolvers.placeholder)(series, 'series');
    },
    headerColor: function headerColor(series, _, _ref16) {
      var db = _ref16.db;
      return (0, _resolvers.placeholder)(series, 'series');
    }
  },
  Publisher: {
    games: function games(parent, args, context, info) {
      return parent.getGames();
    }
  },
  Disc: {
    album: function album(parent) {
      return parent.getOst();
    }
  }
};
var _default = resolvers;
exports["default"] = _default;