"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _GraphQLUpload = _interopRequireDefault(require("graphql-upload/public/GraphQLUpload.js"));

var _resolvers = require("../../../utils/resolvers");

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
      var _links = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(download) {
        var links, filterLinks;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return download.getLinks();

              case 2:
                links = _context2.sent;
                filterLinks = links.filter(function (link) {
                  return !link.url.includes('adshrink.it');
                });
                return _context2.abrupt("return", filterLinks.length === 0 ? links : filterLinks);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function links(_x4) {
        return _links.apply(this, arguments);
      }

      return links;
    }()
  },
  Link: {
    url: function () {
      var _url = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(link) {
        var download, links;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return link.getDownload();

              case 2:
                download = _context3.sent;
                _context3.next = 5;
                return download.getLinks();

              case 5:
                links = _context3.sent;
                return _context3.abrupt("return", links.every(function (link) {
                  return link.url.includes('adshrink.it');
                }) ? link.directUrl : link.url);

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function url(_x5) {
        return _url.apply(this, arguments);
      }

      return url;
    }(),
    directUrl: function () {
      var _directUrl = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(link, args, context) {
        var download, links, fallback, user, roles, perms, donator;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return link.getDownload();

              case 2:
                download = _context4.sent;
                _context4.next = 5;
                return download.getLinks();

              case 5:
                links = _context4.sent;
                fallback = links.every(function (link) {
                  return link.url.includes('adshrink.it');
                });

                if (!fallback) {
                  _context4.next = 9;
                  break;
                }

                return _context4.abrupt("return");

              case 9:
                user = context.user;

                if (user) {
                  _context4.next = 12;
                  break;
                }

                return _context4.abrupt("return", false);

              case 12:
                _context4.next = 14;
                return user.getRoles();

              case 14:
                roles = _context4.sent;
                perms = roles.map(function (r) {
                  return r.permissions;
                }).flat();
                donator = perms.includes('DIRECT');

                if (donator) {
                  _context4.next = 19;
                  break;
                }

                return _context4.abrupt("return", false);

              case 19:
                return _context4.abrupt("return", link.directUrl);

              case 20:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function directUrl(_x6, _x7, _x8) {
        return _directUrl.apply(this, arguments);
      }

      return directUrl;
    }()
  },
  Game: {
    albums: function () {
      var _albums = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(game, _ref8) {
        var _ref8$order, order;

        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _ref8$order = _ref8.order, order = _ref8$order === void 0 ? [] : _ref8$order;
                return _context5.abrupt("return", game.getOsts({
                  order: order
                }));

              case 2:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function albums(_x9, _x10) {
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
    placeholder: function placeholder(game, _, _ref9) {
      var db = _ref9.db;
      return (0, _resolvers.placeholder)(game, 'game');
    },
    headerColor: function headerColor(game, _, _ref10) {
      var db = _ref10.db;
      return (0, _resolvers.headerColor)(game, 'game');
    }
  },
  Platform: {
    albums: function albums(parent) {
      return parent.getOsts();
    },
    games: function games(platform, args, _ref11) {
      var db = _ref11.db;
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
    placeholder: function placeholder(anim, _, _ref12) {
      var db = _ref12.db;
      return (0, _resolvers.placeholder)(anim, 'anim');
    },
    headerColor: function headerColor(anim, _, _ref13) {
      var db = _ref13.db;
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
    placeholder: function placeholder(series, _, _ref14) {
      var db = _ref14.db;
      return (0, _resolvers.placeholder)(series, 'series');
    },
    headerColor: function headerColor(series, _, _ref15) {
      var db = _ref15.db;
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