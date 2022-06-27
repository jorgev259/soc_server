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
    categories: function categories(parent, args, context, info) {
      return parent.getCategories();
    },
    classifications: function classifications(parent, args, context, info) {
      return parent.getClassifications();
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
    selfScore: function () {
      var _selfScore = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(album, _, _ref3) {
        var _yield$db$models$rati;

        var db, user;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                db = _ref3.db, user = _ref3.user;

                if (!user) {
                  _context2.next = 16;
                  break;
                }

                _context2.next = 4;
                return db.models.rating.findOne({
                  where: {
                    ostId: album.id,
                    username: user.username
                  }
                });

              case 4:
                _context2.t2 = _yield$db$models$rati = _context2.sent;
                _context2.t1 = _context2.t2 === null;

                if (_context2.t1) {
                  _context2.next = 8;
                  break;
                }

                _context2.t1 = _yield$db$models$rati === void 0;

              case 8:
                if (!_context2.t1) {
                  _context2.next = 12;
                  break;
                }

                _context2.t3 = void 0;
                _context2.next = 13;
                break;

              case 12:
                _context2.t3 = _yield$db$models$rati.score;

              case 13:
                _context2.t0 = _context2.t3;
                _context2.next = 17;
                break;

              case 16:
                _context2.t0 = null;

              case 17:
                return _context2.abrupt("return", _context2.t0);

              case 18:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function selfScore(_x4, _x5, _x6) {
        return _selfScore.apply(this, arguments);
      }

      return selfScore;
    }(),
    favorites: function favorites(album, _, _ref4) {
      var db = _ref4.db;
      return album.countUsers();
    },
    placeholder: function placeholder(album, _, _ref5) {
      var db = _ref5.db;
      return (0, _resolvers.placeholder)(album, 'album');
    },
    headerColor: function headerColor(album, _, _ref6) {
      var db = _ref6.db;
      return (0, _resolvers.headerColor)(album, 'album');
    },
    avgRating: function () {
      var _avgRating = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(album, _, _ref7) {
        var db;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                db = _ref7.db;
                return _context3.abrupt("return", (0, _resolvers.solveRating)(album));

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function avgRating(_x7, _x8, _x9) {
        return _avgRating.apply(this, arguments);
      }

      return avgRating;
    }()
  },
  Comment: {
    username: function username(parent) {
      return parent.anon ? null : parent.username;
    },
    album: function album(comment, _, _ref8) {
      var db = _ref8.db;
      return comment.getOst();
    }
  },
  Category: {
    albums: function albums(parent) {
      return parent.getOsts();
    },
    count: function count(parent, args, _ref9) {
      var db = _ref9.db;
      return db.models.ost.count({
        include: [{
          model: db.models.category,
          where: {
            name: parent.name
          }
        }]
      });
    }
  },
  Download: {
    links: function () {
      var _links = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(download) {
        var links, filterLinks;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return download.getLinks();

              case 2:
                links = _context4.sent;
                filterLinks = links.filter(function (link) {
                  return !link.url.includes('adshrink.it');
                });
                return _context4.abrupt("return", filterLinks.length === 0 ? links : filterLinks);

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function links(_x10) {
        return _links.apply(this, arguments);
      }

      return links;
    }()
  },
  Link: {
    url: function () {
      var _url = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(link) {
        var download, links;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return link.getDownload();

              case 2:
                download = _context5.sent;
                _context5.next = 5;
                return download.getLinks();

              case 5:
                links = _context5.sent;
                return _context5.abrupt("return", links.every(function (link) {
                  return link.url.includes('adshrink.it');
                }) ? link.directUrl : link.url);

              case 7:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function url(_x11) {
        return _url.apply(this, arguments);
      }

      return url;
    }(),
    directUrl: function () {
      var _directUrl = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(link, args, context) {
        var download, links, fallback, user, roles, perms, donator;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return link.getDownload();

              case 2:
                download = _context6.sent;
                _context6.next = 5;
                return download.getLinks();

              case 5:
                links = _context6.sent;
                fallback = links.every(function (link) {
                  return link.url.includes('adshrink.it');
                });

                if (!fallback) {
                  _context6.next = 9;
                  break;
                }

                return _context6.abrupt("return");

              case 9:
                user = context.user;

                if (user) {
                  _context6.next = 12;
                  break;
                }

                return _context6.abrupt("return", false);

              case 12:
                _context6.next = 14;
                return user.getRoles();

              case 14:
                roles = _context6.sent;
                perms = roles.map(function (r) {
                  return r.permissions;
                }).flat();
                donator = perms.includes('DIRECT');

                if (donator) {
                  _context6.next = 19;
                  break;
                }

                return _context6.abrupt("return", false);

              case 19:
                return _context6.abrupt("return", link.directUrl);

              case 20:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function directUrl(_x12, _x13, _x14) {
        return _directUrl.apply(this, arguments);
      }

      return directUrl;
    }()
  },
  Game: {
    albums: function () {
      var _albums = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(game, _ref10) {
        var _ref10$order, order;

        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _ref10$order = _ref10.order, order = _ref10$order === void 0 ? [] : _ref10$order;
                return _context7.abrupt("return", game.getOsts({
                  order: order
                }));

              case 2:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function albums(_x15, _x16) {
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
    placeholder: function placeholder(game, _, _ref11) {
      var db = _ref11.db;
      return (0, _resolvers.placeholder)(game, 'game');
    },
    headerColor: function headerColor(game, _, _ref12) {
      var db = _ref12.db;
      return (0, _resolvers.headerColor)(game, 'game');
    }
  },
  Platform: {
    albums: function albums(parent) {
      return parent.getOsts();
    },
    games: function games(platform, args, _ref13) {
      var db = _ref13.db;
      return platform.getGames();
    }
  },
  Animation: {
    studios: function studios(parent) {
      return parent.getStudios();
    },
    albums: function albums(anim, _ref14) {
      var _ref14$order = _ref14.order,
          order = _ref14$order === void 0 ? [] : _ref14$order;
      return anim.getOsts({
        order: order
      });
    },
    placeholder: function placeholder(anim, _, _ref15) {
      var db = _ref15.db;
      return (0, _resolvers.placeholder)(anim, 'anim');
    },
    headerColor: function headerColor(anim, _, _ref16) {
      var db = _ref16.db;
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
    placeholder: function placeholder(series, _, _ref17) {
      var db = _ref17.db;
      return (0, _resolvers.placeholder)(series, 'series');
    },
    headerColor: function headerColor(series, _, _ref18) {
      var db = _ref18.db;
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