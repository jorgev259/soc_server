"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _resolversComposition = require("@graphql-tools/resolvers-composition");

var _utils = require("../../../utils");

var _plugins = require("../../../utils/plugins");

var _resolvers = require("../../../utils/resolvers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var resolversComposition = {
  'Mutation.*': (0, _resolvers.hasRole)('UPDATE')
};
var resolvers = {
  Mutation: {
    createPublisher: function () {
      var _createPublisher = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(parent, data, _ref, info) {
        var db, user;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                db = _ref.db, user = _ref.user;
                return _context2.abrupt("return", db.transaction( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
                  var pub;
                  return _regenerator["default"].wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return db.models.publisher.create(data);

                        case 2:
                          pub = _context.sent;
                          data.id = pub.id;
                          _context.next = 6;
                          return (0, _utils.createLog)(db, 'createPublisher', data, user.username);

                        case 6:
                          return _context.abrupt("return", pub);

                        case 7:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }))));

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function createPublisher(_x, _x2, _x3, _x4) {
        return _createPublisher.apply(this, arguments);
      }

      return createPublisher;
    }(),
    updatePublisher: function () {
      var _updatePublisher = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(parent, _ref3, _ref4, info) {
        var id, name, user, db;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                id = _ref3.id, name = _ref3.name;
                user = _ref4.user, db = _ref4.db;
                return _context4.abrupt("return", db.transaction( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
                  var pub;
                  return _regenerator["default"].wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          _context3.next = 2;
                          return db.models.publisher.findByPk(id);

                        case 2:
                          pub = _context3.sent;
                          pub.name = name;
                          _context3.next = 6;
                          return pub.save();

                        case 6:
                          _context3.next = 8;
                          return (0, _utils.createUpdateLog)(db, 'updatePublisher', pub, user.username);

                        case 8:
                          return _context3.abrupt("return", pub);

                        case 9:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee3);
                }))));

              case 3:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function updatePublisher(_x5, _x6, _x7, _x8) {
        return _updatePublisher.apply(this, arguments);
      }

      return updatePublisher;
    }(),
    deletePublisher: function () {
      var _deletePublisher = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(parent, _ref6, _ref7) {
        var id, user, db;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                id = _ref6.id;
                user = _ref7.user, db = _ref7.db;
                return _context6.abrupt("return", db.transaction( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
                  var pub;
                  return _regenerator["default"].wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          _context5.next = 2;
                          return db.models.publisher.findByPk(id);

                        case 2:
                          pub = _context5.sent;
                          _context5.next = 5;
                          return (0, _utils.createLog)(db, 'deletePublisher', pub.dataValues, user.username);

                        case 5:
                          _context5.next = 7;
                          return pub.destroy();

                        case 7:
                        case "end":
                          return _context5.stop();
                      }
                    }
                  }, _callee5);
                }))));

              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function deletePublisher(_x9, _x10, _x11) {
        return _deletePublisher.apply(this, arguments);
      }

      return deletePublisher;
    }(),
    createPlatform: function () {
      var _createPlatform = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(parent, data, _ref9, info) {
        var db, user;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                db = _ref9.db, user = _ref9.user;
                return _context8.abrupt("return", db.transaction( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
                  var plat;
                  return _regenerator["default"].wrap(function _callee7$(_context7) {
                    while (1) {
                      switch (_context7.prev = _context7.next) {
                        case 0:
                          plat = db.models.platform.create(data);
                          data.id = plat.id;
                          _context7.next = 4;
                          return (0, _utils.createLog)(db, 'createPlatform', data, user.username);

                        case 4:
                          return _context7.abrupt("return", plat);

                        case 5:
                        case "end":
                          return _context7.stop();
                      }
                    }
                  }, _callee7);
                }))));

              case 2:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function createPlatform(_x12, _x13, _x14, _x15) {
        return _createPlatform.apply(this, arguments);
      }

      return createPlatform;
    }(),
    updatePlatform: function () {
      var _updatePlatform = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(parent, _ref11, _ref12, info) {
        var key, name, type, user, db;
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                key = _ref11.key, name = _ref11.name, type = _ref11.type;
                user = _ref12.user, db = _ref12.db;
                return _context10.abrupt("return", db.transaction( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
                  var plat;
                  return _regenerator["default"].wrap(function _callee9$(_context9) {
                    while (1) {
                      switch (_context9.prev = _context9.next) {
                        case 0:
                          _context9.next = 2;
                          return db.models.platform.findByPk(key);

                        case 2:
                          plat = _context9.sent;
                          if (name) plat.name = name;
                          if (type !== plat.type) plat.type = type;
                          _context9.next = 7;
                          return plat.save();

                        case 7:
                          _context9.next = 9;
                          return (0, _utils.createUpdateLog)(db, 'updatePlatform', plat, user.username);

                        case 9:
                          return _context9.abrupt("return", plat);

                        case 10:
                        case "end":
                          return _context9.stop();
                      }
                    }
                  }, _callee9);
                }))));

              case 3:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }));

      function updatePlatform(_x16, _x17, _x18, _x19) {
        return _updatePlatform.apply(this, arguments);
      }

      return updatePlatform;
    }(),
    deletePlatform: function () {
      var _deletePlatform = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(parent, _ref14, _ref15) {
        var key, user, db;
        return _regenerator["default"].wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                key = _ref14.key;
                user = _ref15.user, db = _ref15.db;
                return _context12.abrupt("return", db.transaction( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
                  var plat;
                  return _regenerator["default"].wrap(function _callee11$(_context11) {
                    while (1) {
                      switch (_context11.prev = _context11.next) {
                        case 0:
                          _context11.next = 2;
                          return db.models.platform.findByPk(key);

                        case 2:
                          plat = _context11.sent;
                          _context11.next = 5;
                          return (0, _utils.createLog)(db, 'deletePlatform', plat.dataValues, user.username);

                        case 5:
                          plat.destroy();

                        case 6:
                        case "end":
                          return _context11.stop();
                      }
                    }
                  }, _callee11);
                }))));

              case 3:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12);
      }));

      function deletePlatform(_x20, _x21, _x22) {
        return _deletePlatform.apply(this, arguments);
      }

      return deletePlatform;
    }(),
    createStudio: function () {
      var _createStudio = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(parent, data, _ref17, info) {
        var db, user;
        return _regenerator["default"].wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                db = _ref17.db, user = _ref17.user;
                return _context14.abrupt("return", db.transaction( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13() {
                  var studio;
                  return _regenerator["default"].wrap(function _callee13$(_context13) {
                    while (1) {
                      switch (_context13.prev = _context13.next) {
                        case 0:
                          studio = db.models.studio.create(data);
                          data.slug = studio.slug;
                          _context13.next = 4;
                          return (0, _utils.createLog)(db, 'createStudio', data, user.username);

                        case 4:
                          return _context13.abrupt("return", studio);

                        case 5:
                        case "end":
                          return _context13.stop();
                      }
                    }
                  }, _callee13);
                }))));

              case 2:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14);
      }));

      function createStudio(_x23, _x24, _x25, _x26) {
        return _createStudio.apply(this, arguments);
      }

      return createStudio;
    }(),
    updateStudio: function () {
      var _updateStudio = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16(parent, _ref19, _ref20, info) {
        var slug, name, user, db;
        return _regenerator["default"].wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                slug = _ref19.slug, name = _ref19.name;
                user = _ref20.user, db = _ref20.db;
                return _context16.abrupt("return", db.transaction( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15() {
                  var studio;
                  return _regenerator["default"].wrap(function _callee15$(_context15) {
                    while (1) {
                      switch (_context15.prev = _context15.next) {
                        case 0:
                          _context15.next = 2;
                          return db.models.studio.findByPk(slug);

                        case 2:
                          studio = _context15.sent;
                          studio.name = name;
                          _context15.next = 6;
                          return studio.save();

                        case 6:
                          _context15.next = 8;
                          return (0, _utils.createUpdateLog)(db, 'updateStudio', studio, user.username);

                        case 8:
                          return _context15.abrupt("return", studio);

                        case 9:
                        case "end":
                          return _context15.stop();
                      }
                    }
                  }, _callee15);
                }))));

              case 3:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16);
      }));

      function updateStudio(_x27, _x28, _x29, _x30) {
        return _updateStudio.apply(this, arguments);
      }

      return updateStudio;
    }(),
    deleteStudio: function () {
      var _deleteStudio = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18(parent, _ref22, _ref23, info) {
        var slug, name, user, db;
        return _regenerator["default"].wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                slug = _ref22.slug, name = _ref22.name;
                user = _ref23.user, db = _ref23.db;
                return _context18.abrupt("return", db.transaction( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17() {
                  var studio;
                  return _regenerator["default"].wrap(function _callee17$(_context17) {
                    while (1) {
                      switch (_context17.prev = _context17.next) {
                        case 0:
                          _context17.next = 2;
                          return db.models.studio.findByPk(slug);

                        case 2:
                          studio = _context17.sent;
                          _context17.next = 5;
                          return (0, _utils.createLog)(db, 'deleteStudio', studio.dataValues, user.username);

                        case 5:
                          studio.destroy();

                        case 6:
                        case "end":
                          return _context17.stop();
                      }
                    }
                  }, _callee17);
                }))));

              case 3:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18);
      }));

      function deleteStudio(_x31, _x32, _x33, _x34) {
        return _deleteStudio.apply(this, arguments);
      }

      return deleteStudio;
    }(),
    createSeries: function () {
      var _createSeries = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee20(parent, data, _ref25, info) {
        var db, user;
        return _regenerator["default"].wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                db = _ref25.db, user = _ref25.user;
                return _context20.abrupt("return", db.transaction( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee19() {
                  var series, slug;
                  return _regenerator["default"].wrap(function _callee19$(_context19) {
                    while (1) {
                      switch (_context19.prev = _context19.next) {
                        case 0:
                          _context19.next = 2;
                          return db.models.series.create(data);

                        case 2:
                          series = _context19.sent;
                          slug = series.dataValues.slug;

                          if (!data.cover) {
                            _context19.next = 10;
                            break;
                          }

                          _context19.next = 7;
                          return (0, _utils.img)(data.cover, 'series', slug);

                        case 7:
                          _context19.t0 = _context19.sent;
                          _context19.next = 11;
                          break;

                        case 10:
                          _context19.t0 = undefined;

                        case 11:
                          series.placeholder = _context19.t0;

                          if (!data.cover) {
                            _context19.next = 18;
                            break;
                          }

                          _context19.next = 15;
                          return (0, _utils.getImgColor)("series/".concat(slug));

                        case 15:
                          _context19.t1 = _context19.sent;
                          _context19.next = 19;
                          break;

                        case 18:
                          _context19.t1 = undefined;

                        case 19:
                          series.headerColor = _context19.t1;
                          _context19.next = 22;
                          return series.save();

                        case 22:
                          _context19.next = 24;
                          return (0, _utils.createLog)(db, 'createSeries', data, user.username);

                        case 24:
                          return _context19.abrupt("return", series);

                        case 25:
                        case "end":
                          return _context19.stop();
                      }
                    }
                  }, _callee19);
                }))));

              case 2:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20);
      }));

      function createSeries(_x35, _x36, _x37, _x38) {
        return _createSeries.apply(this, arguments);
      }

      return createSeries;
    }(),
    updateSeries: function () {
      var _updateSeries = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee22(parent, _ref27, _ref28, info) {
        var slug, name, cover, user, db;
        return _regenerator["default"].wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                slug = _ref27.slug, name = _ref27.name, cover = _ref27.cover;
                user = _ref28.user, db = _ref28.db;
                return _context22.abrupt("return", db.transaction( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee21() {
                  var series;
                  return _regenerator["default"].wrap(function _callee21$(_context21) {
                    while (1) {
                      switch (_context21.prev = _context21.next) {
                        case 0:
                          _context21.next = 2;
                          return db.models.series.findByPk(slug);

                        case 2:
                          series = _context21.sent;
                          if (name) series.name = name;

                          if (!cover) {
                            _context21.next = 11;
                            break;
                          }

                          _context21.next = 7;
                          return (0, _utils.img)(cover, 'series', slug);

                        case 7:
                          series.placeholder = _context21.sent;
                          _context21.next = 10;
                          return (0, _utils.getImgColor)("series/".concat(slug));

                        case 10:
                          series.headerColor = _context21.sent;

                        case 11:
                          _context21.next = 13;
                          return series.save();

                        case 13:
                          _context21.next = 15;
                          return (0, _utils.createUpdateLog)(db, 'updateSeries', series, user.username);

                        case 15:
                          return _context21.abrupt("return", series);

                        case 16:
                        case "end":
                          return _context21.stop();
                      }
                    }
                  }, _callee21);
                }))));

              case 3:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee22);
      }));

      function updateSeries(_x39, _x40, _x41, _x42) {
        return _updateSeries.apply(this, arguments);
      }

      return updateSeries;
    }(),
    deleteSeries: function () {
      var _deleteSeries = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee24(parent, _ref30, _ref31) {
        var slug, user, db;
        return _regenerator["default"].wrap(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                slug = _ref30.slug;
                user = _ref31.user, db = _ref31.db;
                return _context24.abrupt("return", db.transaction( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee23() {
                  var series;
                  return _regenerator["default"].wrap(function _callee23$(_context23) {
                    while (1) {
                      switch (_context23.prev = _context23.next) {
                        case 0:
                          _context23.next = 2;
                          return db.models.series.findByPk(slug);

                        case 2:
                          series = _context23.sent;
                          _context23.next = 5;
                          return (0, _utils.createLog)(db, 'deleteSeries', series.dataValues, user.username);

                        case 5:
                          _context23.next = 7;
                          return series.destroy();

                        case 7:
                        case "end":
                          return _context23.stop();
                      }
                    }
                  }, _callee23);
                }))));

              case 3:
              case "end":
                return _context24.stop();
            }
          }
        }, _callee24);
      }));

      function deleteSeries(_x43, _x44, _x45) {
        return _deleteSeries.apply(this, arguments);
      }

      return deleteSeries;
    }(),
    createGame: function () {
      var _createGame = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee26(parent, data, _ref33, info) {
        var db, user;
        return _regenerator["default"].wrap(function _callee26$(_context26) {
          while (1) {
            switch (_context26.prev = _context26.next) {
              case 0:
                db = _ref33.db, user = _ref33.user;
                return _context26.abrupt("return", db.transaction( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee25() {
                  var game;
                  return _regenerator["default"].wrap(function _callee25$(_context25) {
                    while (1) {
                      switch (_context25.prev = _context25.next) {
                        case 0:
                          _context25.next = 2;
                          return db.models.game.create(data);

                        case 2:
                          game = _context25.sent;
                          _context25.next = 5;
                          return Promise.all([game.setSeries(data.series), game.setPublishers(data.publishers), game.setPlatforms(data.platforms)]);

                        case 5:
                          if (!data.cover) {
                            _context25.next = 11;
                            break;
                          }

                          _context25.next = 8;
                          return (0, _utils.img)(data.cover, 'game', data.slug);

                        case 8:
                          _context25.t0 = _context25.sent;
                          _context25.next = 12;
                          break;

                        case 11:
                          _context25.t0 = '';

                        case 12:
                          game.placeholder = _context25.t0;

                          if (!data.cover) {
                            _context25.next = 19;
                            break;
                          }

                          _context25.next = 16;
                          return (0, _utils.getImgColor)("game/".concat(data.slug));

                        case 16:
                          _context25.t1 = _context25.sent;
                          _context25.next = 20;
                          break;

                        case 19:
                          _context25.t1 = undefined;

                        case 20:
                          game.headerColor = _context25.t1;
                          _context25.next = 23;
                          return game.save();

                        case 23:
                          _context25.next = 25;
                          return (0, _utils.createLog)(db, 'createGame', data, user.username);

                        case 25:
                          return _context25.abrupt("return", game);

                        case 26:
                        case "end":
                          return _context25.stop();
                      }
                    }
                  }, _callee25);
                }))));

              case 2:
              case "end":
                return _context26.stop();
            }
          }
        }, _callee26);
      }));

      function createGame(_x46, _x47, _x48, _x49) {
        return _createGame.apply(this, arguments);
      }

      return createGame;
    }(),
    updateGame: function () {
      var _updateGame = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee28(parent, args, _ref35, info) {
        var user, db;
        return _regenerator["default"].wrap(function _callee28$(_context28) {
          while (1) {
            switch (_context28.prev = _context28.next) {
              case 0:
                user = _ref35.user, db = _ref35.db;
                return _context28.abrupt("return", db.transaction( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee27() {
                  var slug, name, cover, releaseDate, _args$series, series, publishers, platforms, game;

                  return _regenerator["default"].wrap(function _callee27$(_context27) {
                    while (1) {
                      switch (_context27.prev = _context27.next) {
                        case 0:
                          slug = args.slug, name = args.name, cover = args.cover, releaseDate = args.releaseDate, _args$series = args.series, series = _args$series === void 0 ? [] : _args$series, publishers = args.publishers, platforms = args.platforms;
                          _context27.next = 3;
                          return db.models.game.findByPk(slug);

                        case 3:
                          game = _context27.sent;
                          game.name = name;
                          game.releaseDate = releaseDate;
                          game.setSeries(series);
                          game.setPublishers(publishers);
                          game.setPlatforms(platforms);

                          if (!cover) {
                            _context27.next = 16;
                            break;
                          }

                          _context27.next = 12;
                          return (0, _utils.img)(cover, 'game', slug);

                        case 12:
                          game.placeholder = _context27.sent;
                          _context27.next = 15;
                          return (0, _utils.getImgColor)("game/".concat(slug));

                        case 15:
                          series.headerColor = _context27.sent;

                        case 16:
                          _context27.next = 18;
                          return game.save();

                        case 18:
                          _context27.next = 20;
                          return (0, _utils.createUpdateLog)(db, 'updateGame', game, user.username);

                        case 20:
                          return _context27.abrupt("return", game);

                        case 21:
                        case "end":
                          return _context27.stop();
                      }
                    }
                  }, _callee27);
                }))));

              case 2:
              case "end":
                return _context28.stop();
            }
          }
        }, _callee28);
      }));

      function updateGame(_x50, _x51, _x52, _x53) {
        return _updateGame.apply(this, arguments);
      }

      return updateGame;
    }(),
    deleteGame: function () {
      var _deleteGame = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee30(parent, _ref37, _ref38) {
        var slug, user, db;
        return _regenerator["default"].wrap(function _callee30$(_context30) {
          while (1) {
            switch (_context30.prev = _context30.next) {
              case 0:
                slug = _ref37.slug;
                user = _ref38.user, db = _ref38.db;
                db.transaction( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee29() {
                  var game, log;
                  return _regenerator["default"].wrap(function _callee29$(_context29) {
                    while (1) {
                      switch (_context29.prev = _context29.next) {
                        case 0:
                          _context29.next = 2;
                          return db.models.game.findByPk(slug);

                        case 2:
                          game = _context29.sent;
                          _context29.t0 = _objectSpread;
                          _context29.t1 = _objectSpread({}, game.dataValues);
                          _context29.t2 = {};
                          _context29.next = 8;
                          return game.getSeries();

                        case 8:
                          _context29.t3 = _context29.sent;
                          _context29.next = 11;
                          return game.getPublishers();

                        case 11:
                          _context29.t4 = _context29.sent;
                          _context29.next = 14;
                          return game.getPlatforms();

                        case 14:
                          _context29.t5 = _context29.sent;
                          _context29.t6 = {
                            series: _context29.t3,
                            publishers: _context29.t4,
                            platforms: _context29.t5
                          };
                          log = (0, _context29.t0)(_context29.t1, _context29.t2, _context29.t6);
                          _context29.next = 19;
                          return (0, _utils.createLog)(db, 'deleteSeries', log, user.username);

                        case 19:
                          _context29.next = 21;
                          return game.destroy();

                        case 21:
                        case "end":
                          return _context29.stop();
                      }
                    }
                  }, _callee29);
                })));

              case 3:
              case "end":
                return _context30.stop();
            }
          }
        }, _callee30);
      }));

      function deleteGame(_x54, _x55, _x56) {
        return _deleteGame.apply(this, arguments);
      }

      return deleteGame;
    }(),
    createAnimation: function () {
      var _createAnimation = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee32(parent, data, _ref40, info) {
        var db, user;
        return _regenerator["default"].wrap(function _callee32$(_context32) {
          while (1) {
            switch (_context32.prev = _context32.next) {
              case 0:
                db = _ref40.db, user = _ref40.user;
                return _context32.abrupt("return", db.transaction( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee31() {
                  var anim;
                  return _regenerator["default"].wrap(function _callee31$(_context31) {
                    while (1) {
                      switch (_context31.prev = _context31.next) {
                        case 0:
                          _context31.next = 2;
                          return db.models.animation.create(data);

                        case 2:
                          anim = _context31.sent;
                          _context31.next = 5;
                          return anim.setStudios(data.studios);

                        case 5:
                          if (!data.cover) {
                            _context31.next = 11;
                            break;
                          }

                          _context31.next = 8;
                          return (0, _utils.img)(data.cover, 'anim', anim.id);

                        case 8:
                          _context31.t0 = _context31.sent;
                          _context31.next = 12;
                          break;

                        case 11:
                          _context31.t0 = '';

                        case 12:
                          anim.placeholder = _context31.t0;

                          if (!data.cover) {
                            _context31.next = 19;
                            break;
                          }

                          _context31.next = 16;
                          return (0, _utils.getImgColor)("anim/".concat(anim.id));

                        case 16:
                          _context31.t1 = _context31.sent;
                          _context31.next = 20;
                          break;

                        case 19:
                          _context31.t1 = undefined;

                        case 20:
                          anim.headerColor = _context31.t1;
                          _context31.next = 23;
                          return anim.save();

                        case 23:
                          _context31.next = 25;
                          return (0, _utils.createLog)(db, 'createAnimation', data, user.username);

                        case 25:
                          return _context31.abrupt("return", anim);

                        case 26:
                        case "end":
                          return _context31.stop();
                      }
                    }
                  }, _callee31);
                }))));

              case 2:
              case "end":
                return _context32.stop();
            }
          }
        }, _callee32);
      }));

      function createAnimation(_x57, _x58, _x59, _x60) {
        return _createAnimation.apply(this, arguments);
      }

      return createAnimation;
    }(),
    updateAnimation: function () {
      var _updateAnimation = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee34(parent, data, _ref42, info) {
        var db, user;
        return _regenerator["default"].wrap(function _callee34$(_context34) {
          while (1) {
            switch (_context34.prev = _context34.next) {
              case 0:
                db = _ref42.db, user = _ref42.user;
                return _context34.abrupt("return", db.transaction( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee33() {
                  var anim;
                  return _regenerator["default"].wrap(function _callee33$(_context33) {
                    while (1) {
                      switch (_context33.prev = _context33.next) {
                        case 0:
                          _context33.next = 2;
                          return db.models.animation.findByPk(data.id);

                        case 2:
                          anim = _context33.sent;
                          Object.entries(data).forEach(function (_ref44) {
                            var _ref45 = (0, _slicedToArray2["default"])(_ref44, 2),
                                key = _ref45[0],
                                value = _ref45[1];

                            anim[key] = value;
                          });
                          anim.setStudios(data.studios);

                          if (!data.cover) {
                            _context33.next = 12;
                            break;
                          }

                          _context33.next = 8;
                          return (0, _utils.img)(data.cover, 'anim', anim.id);

                        case 8:
                          anim.placeholder = _context33.sent;
                          _context33.next = 11;
                          return (0, _utils.getImgColor)("anim/".concat(anim.id));

                        case 11:
                          anim.headerColor = _context33.sent;

                        case 12:
                          _context33.next = 14;
                          return anim.save();

                        case 14:
                          _context33.next = 16;
                          return (0, _utils.createUpdateLog)(db, 'updateAnimation', anim, user.username);

                        case 16:
                          return _context33.abrupt("return", anim);

                        case 17:
                        case "end":
                          return _context33.stop();
                      }
                    }
                  }, _callee33);
                }))));

              case 2:
              case "end":
                return _context34.stop();
            }
          }
        }, _callee34);
      }));

      function updateAnimation(_x61, _x62, _x63, _x64) {
        return _updateAnimation.apply(this, arguments);
      }

      return updateAnimation;
    }(),
    deleteAnimation: function () {
      var _deleteAnimation = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee36(parent, _ref46, _ref47) {
        var id, user, db;
        return _regenerator["default"].wrap(function _callee36$(_context36) {
          while (1) {
            switch (_context36.prev = _context36.next) {
              case 0:
                id = _ref46.id;
                user = _ref47.user, db = _ref47.db;
                return _context36.abrupt("return", db.transaction( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee35() {
                  var anim, log;
                  return _regenerator["default"].wrap(function _callee35$(_context35) {
                    while (1) {
                      switch (_context35.prev = _context35.next) {
                        case 0:
                          _context35.next = 2;
                          return db.models.animation.findByPk(id);

                        case 2:
                          anim = _context35.sent;
                          _context35.t0 = _objectSpread;
                          _context35.t1 = _objectSpread({}, anim.dataValues);
                          _context35.t2 = {};
                          _context35.next = 8;
                          return anim.getStudios();

                        case 8:
                          _context35.t3 = _context35.sent;
                          _context35.t4 = {
                            studios: _context35.t3
                          };
                          log = (0, _context35.t0)(_context35.t1, _context35.t2, _context35.t4);
                          _context35.next = 13;
                          return (0, _utils.createLog)(db, 'deleteAnim', log, user.username);

                        case 13:
                          _context35.next = 15;
                          return anim.destroy();

                        case 15:
                        case "end":
                          return _context35.stop();
                      }
                    }
                  }, _callee35);
                }))));

              case 3:
              case "end":
                return _context36.stop();
            }
          }
        }, _callee36);
      }));

      function deleteAnimation(_x65, _x66, _x67) {
        return _deleteAnimation.apply(this, arguments);
      }

      return deleteAnimation;
    }(),
    updateAlbum: function () {
      var _updateAlbum = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee38(parent, data, _ref49, info) {
        var db, user, res;
        return _regenerator["default"].wrap(function _callee38$(_context38) {
          while (1) {
            switch (_context38.prev = _context38.next) {
              case 0:
                db = _ref49.db, user = _ref49.user, res = _ref49.res;
                return _context38.abrupt("return", db.transaction( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee37() {
                  var ost, triggerPost;
                  return _regenerator["default"].wrap(function _callee37$(_context37) {
                    while (1) {
                      switch (_context37.prev = _context37.next) {
                        case 0:
                          data.artists = data.artists ? data.artists.map(function (artist) {
                            return {
                              name: artist,
                              slug: (0, _utils.slugify)(artist)
                            };
                          }) : [];
                          _context37.next = 3;
                          return db.models.artist.bulkCreate(data.artists, {
                            ignoreDuplicates: true
                          });

                        case 3:
                          _context37.next = 5;
                          return db.models.ost.findByPk(data.id);

                        case 5:
                          ost = _context37.sent;
                          triggerPost = data.status !== ost.status.repeat(1) && data.status === 'show'; // implement better log lol lmao

                          _context37.next = 9;
                          return Promise.all([ost.update(data), ost.setArtists(data.artists.map(function (_ref51) {
                            var slug = _ref51.slug;
                            return slug;
                          })), ost.setClasses(data.classes || []), ost.setCategories(data.categories || []), ost.setPlatforms(data.platforms || []), ost.setGames(data.games || []), ost.setRelated(data.related || []), ost.setAnimations(data.animations || []), db.models.disc.destroy({
                            where: {
                              ostId: ost.dataValues.id
                            }
                          }).then(function () {
                            return (data.discs || []).map(function (disc) {
                              return ost.createDisc(disc);
                            });
                          }), db.models.store.destroy({
                            where: {
                              ostId: ost.dataValues.id
                            }
                          }).then(function () {
                            return (data.stores || []).map(function (store) {
                              return ost.createStore(store);
                            });
                          }), db.models.download.destroy({
                            where: {
                              ostId: ost.dataValues.id
                            }
                          }).then(function () {
                            return (data.downloads || []).map(function (download) {
                              return ost.createDownload(download, {
                                include: [db.models.link]
                              });
                            });
                          }), (0, _utils.createUpdateLog)(db, 'updateAlbum', ost, user.username)]);

                        case 9:
                          if (!data.cover) {
                            _context37.next = 18;
                            break;
                          }

                          _context37.next = 12;
                          return (0, _utils.img)(data.cover, 'album', ost.id);

                        case 12:
                          ost.placeholder = _context37.sent;
                          _context37.next = 15;
                          return (0, _utils.getImgColor)("album/".concat(ost.id));

                        case 15:
                          ost.headerColor = _context37.sent;
                          _context37.next = 18;
                          return ost.save();

                        case 18:
                          if (triggerPost) {
                            (0, _plugins.postReddit)(ost);
                            (0, _plugins.postDiscord)(ost.id);
                          }

                          res.unstable_revalidate("/album/".concat(ost.id));
                          return _context37.abrupt("return", ost);

                        case 21:
                        case "end":
                          return _context37.stop();
                      }
                    }
                  }, _callee37);
                }))));

              case 2:
              case "end":
                return _context38.stop();
            }
          }
        }, _callee38);
      }));

      function updateAlbum(_x68, _x69, _x70, _x71) {
        return _updateAlbum.apply(this, arguments);
      }

      return updateAlbum;
    }()
  }
};

var _default = (0, _resolversComposition.composeResolvers)(resolvers, resolversComposition);

exports["default"] = _default;