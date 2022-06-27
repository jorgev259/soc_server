"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _apolloServerErrors = require("apollo-server-errors");

var _resolversComposition = require("@graphql-tools/resolvers-composition");

var _utils = require("../../../utils");

var _plugins = require("../../../utils/plugins");

var _resolvers = require("../../../utils/resolvers");

var _util = require("@lotus-tree/requestcat/lib/util");

var resolversComposition = {
  'Mutation.*': (0, _resolvers.hasRole)('CREATE')
};
var resolvers = {
  Mutation: {
    createAlbum: function () {
      var _createAlbum = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(parent, data, _ref, info) {
        var db, user;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                db = _ref.db, user = _ref.user;
                return _context3.abrupt("return", db.transaction( /*#__PURE__*/function () {
                  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(transaction) {
                    var ost, id;
                    return _regenerator["default"].wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            data.artists = data.artists ? data.artists.map(function (artist) {
                              return {
                                name: artist,
                                slug: (0, _utils.slugify)(artist)
                              };
                            }) : [];
                            _context2.next = 3;
                            return db.models.artist.bulkCreate(data.artists, {
                              ignoreDuplicates: true,
                              transaction: transaction
                            });

                          case 3:
                            _context2.next = 5;
                            return db.models.ost.create(data, {
                              include: [db.models.disc, db.models.store, {
                                model: db.models.download,
                                include: [db.models.link]
                              }],
                              transaction: transaction
                            });

                          case 5:
                            ost = _context2.sent;
                            _context2.next = 8;
                            return Promise.all([ost.setArtists(data.artists.filter(function (_ref3) {
                              var slug = _ref3.slug;
                              return slug.length > 0;
                            }).map(function (_ref4) {
                              var slug = _ref4.slug;
                              return slug;
                            }), {
                              transaction: transaction
                            }), ost.setCategories(data.categories || [], {
                              transaction: transaction
                            }), ost.setClassifications(data.classifications || [], {
                              transaction: transaction
                            }), ost.setPlatforms(data.platforms || [], {
                              transaction: transaction
                            }), ost.setGames(data.games || [], {
                              transaction: transaction
                            }), ost.setAnimations(data.animations || [], {
                              transaction: transaction
                            }), ost.setRelated(data.related || [], {
                              transaction: transaction
                            }), (0, _utils.createLog)(db, 'createAlbum', data, user.username, transaction)]);

                          case 8:
                            id = ost.dataValues.id;

                            if (!data.cover) {
                              _context2.next = 15;
                              break;
                            }

                            _context2.next = 12;
                            return (0, _utils.img)(data.cover, 'album', id);

                          case 12:
                            _context2.t0 = _context2.sent;
                            _context2.next = 16;
                            break;

                          case 15:
                            _context2.t0 = undefined;

                          case 16:
                            ost.placeholder = _context2.t0;

                            if (!data.cover) {
                              _context2.next = 23;
                              break;
                            }

                            _context2.next = 20;
                            return (0, _utils.getImgColor)("album/".concat(id));

                          case 20:
                            _context2.t1 = _context2.sent;
                            _context2.next = 24;
                            break;

                          case 23:
                            _context2.t1 = undefined;

                          case 24:
                            ost.headerColor = _context2.t1;
                            _context2.next = 27;
                            return ost.save({
                              transaction: transaction
                            });

                          case 27:
                            if (ost.status === 'show') {
                              if (data.request) {
                                db.models.request.findByPk(data.request).then( /*#__PURE__*/function () {
                                  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(request) {
                                    var guild, userText;
                                    return _regenerator["default"].wrap(function _callee$(_context) {
                                      while (1) {
                                        switch (_context.prev = _context.next) {
                                          case 0:
                                            if (!(request.state === 'complete')) {
                                              _context.next = 2;
                                              break;
                                            }

                                            return _context.abrupt("return");

                                          case 2:
                                            _context.next = 4;
                                            return (0, _util.completeRequest)(_plugins.discordClient, db, process.env.GUILD, request);

                                          case 4:
                                            _context.next = 6;
                                            return _plugins.discordClient.guilds.fetch(process.env.GUILD);

                                          case 6:
                                            guild = _context.sent;
                                            _context.next = 9;
                                            return guild.channels.fetch();

                                          case 9:
                                            userText = request.userID || request.user ? " ".concat(request.userID ? "<@".concat(request.userID, ">") : "@".concat(request.user), " :arrow_down:") : '';
                                            guild.channels.cache.find(function (c) {
                                              return c.name === 'last-added-soundtracks';
                                            }).send("https://www.sittingonclouds.net/album/".concat(id).concat(userText));

                                          case 11:
                                          case "end":
                                            return _context.stop();
                                        }
                                      }
                                    }, _callee);
                                  }));

                                  return function (_x6) {
                                    return _ref5.apply(this, arguments);
                                  };
                                }());
                              } else {
                                (0, _plugins.postDiscord)(ost.id);
                              }

                              (0, _plugins.postReddit)(ost);
                            }

                            return _context2.abrupt("return", ost);

                          case 29:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2);
                  }));

                  return function (_x5) {
                    return _ref2.apply(this, arguments);
                  };
                }()));

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function createAlbum(_x, _x2, _x3, _x4) {
        return _createAlbum.apply(this, arguments);
      }

      return createAlbum;
    }(),
    deleteAlbum: function () {
      var _deleteAlbum = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(parent, _ref6, _ref7, info) {
        var id, db, user, res, ost;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                id = _ref6.id;
                db = _ref7.db, user = _ref7.user, res = _ref7.res;
                _context5.next = 4;
                return db.models.ost.findByPk(id);

              case 4:
                ost = _context5.sent;

                if (ost) {
                  _context5.next = 7;
                  break;
                }

                throw new _apolloServerErrors.UserInputError('Not Found');

              case 7:
                return _context5.abrupt("return", db.transaction( /*#__PURE__*/function () {
                  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(transaction) {
                    return _regenerator["default"].wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            _context4.next = 2;
                            return (0, _utils.createUpdateLog)(db, 'deleteAlbum', ost, user.username, transaction);

                          case 2:
                            _context4.next = 4;
                            return ost.destroy({
                              transaction: transaction
                            });

                          case 4:
                            return _context4.abrupt("return", 1);

                          case 5:
                          case "end":
                            return _context4.stop();
                        }
                      }
                    }, _callee4);
                  }));

                  return function (_x11) {
                    return _ref8.apply(this, arguments);
                  };
                }()));

              case 8:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function deleteAlbum(_x7, _x8, _x9, _x10) {
        return _deleteAlbum.apply(this, arguments);
      }

      return deleteAlbum;
    }()
  }
};

var _default = (0, _resolversComposition.composeResolvers)(resolvers, resolversComposition);

exports["default"] = _default;