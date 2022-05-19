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
                return _context2.abrupt("return", db.transaction( /*#__PURE__*/function () {
                  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(transaction) {
                    var pub;
                    return _regenerator["default"].wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.next = 2;
                            return db.models.publisher.create(data, {
                              transaction: transaction
                            });

                          case 2:
                            pub = _context.sent;
                            data.id = pub.id;
                            _context.next = 6;
                            return (0, _utils.createLog)(db, 'createPublisher', data, user.username, transaction);

                          case 6:
                            return _context.abrupt("return", pub);

                          case 7:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x5) {
                    return _ref2.apply(this, arguments);
                  };
                }()));

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
        var id, name, user, db, pub;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                id = _ref3.id, name = _ref3.name;
                user = _ref4.user, db = _ref4.db;
                _context4.next = 4;
                return db.models.publisher.findByPk(id);

              case 4:
                pub = _context4.sent;
                pub.name = name;
                return _context4.abrupt("return", db.transaction( /*#__PURE__*/function () {
                  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(transaction) {
                    return _regenerator["default"].wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            _context3.next = 2;
                            return pub.save({
                              transaction: transaction
                            });

                          case 2:
                            _context3.next = 4;
                            return (0, _utils.createUpdateLog)(db, 'updatePublisher', pub, user.username, transaction);

                          case 4:
                            return _context3.abrupt("return", pub);

                          case 5:
                          case "end":
                            return _context3.stop();
                        }
                      }
                    }, _callee3);
                  }));

                  return function (_x10) {
                    return _ref5.apply(this, arguments);
                  };
                }()));

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function updatePublisher(_x6, _x7, _x8, _x9) {
        return _updatePublisher.apply(this, arguments);
      }

      return updatePublisher;
    }(),
    deletePublisher: function () {
      var _deletePublisher = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(parent, _ref6, _ref7) {
        var id, user, db, pub;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                id = _ref6.id;
                user = _ref7.user, db = _ref7.db;
                _context6.next = 4;
                return db.models.publisher.findByPk(id);

              case 4:
                pub = _context6.sent;
                return _context6.abrupt("return", db.transaction( /*#__PURE__*/function () {
                  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(transaction) {
                    return _regenerator["default"].wrap(function _callee5$(_context5) {
                      while (1) {
                        switch (_context5.prev = _context5.next) {
                          case 0:
                            _context5.next = 2;
                            return pub.destroy({
                              transaction: transaction
                            });

                          case 2:
                            _context5.next = 4;
                            return (0, _utils.createLog)(db, 'deletePublisher', pub.dataValues, user.username, transaction);

                          case 4:
                          case "end":
                            return _context5.stop();
                        }
                      }
                    }, _callee5);
                  }));

                  return function (_x14) {
                    return _ref8.apply(this, arguments);
                  };
                }()));

              case 6:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      function deletePublisher(_x11, _x12, _x13) {
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
                return _context8.abrupt("return", db.transaction( /*#__PURE__*/function () {
                  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(transaction) {
                    var plat;
                    return _regenerator["default"].wrap(function _callee7$(_context7) {
                      while (1) {
                        switch (_context7.prev = _context7.next) {
                          case 0:
                            plat = db.models.platform.create(data, {
                              transaction: transaction
                            });
                            data.id = plat.id;
                            _context7.next = 4;
                            return (0, _utils.createLog)(db, 'createPlatform', data, user.username, transaction);

                          case 4:
                            return _context7.abrupt("return", plat);

                          case 5:
                          case "end":
                            return _context7.stop();
                        }
                      }
                    }, _callee7);
                  }));

                  return function (_x19) {
                    return _ref10.apply(this, arguments);
                  };
                }()));

              case 2:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function createPlatform(_x15, _x16, _x17, _x18) {
        return _createPlatform.apply(this, arguments);
      }

      return createPlatform;
    }(),
    updatePlatform: function () {
      var _updatePlatform = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(parent, _ref11, _ref12, info) {
        var key, name, type, user, db, plat;
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                key = _ref11.key, name = _ref11.name, type = _ref11.type;
                user = _ref12.user, db = _ref12.db;
                _context10.next = 4;
                return db.models.platform.findByPk(key);

              case 4:
                plat = _context10.sent;
                if (name) plat.name = name;
                if (type !== plat.type) plat.type = type;
                return _context10.abrupt("return", db.transaction( /*#__PURE__*/function () {
                  var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(transaction) {
                    return _regenerator["default"].wrap(function _callee9$(_context9) {
                      while (1) {
                        switch (_context9.prev = _context9.next) {
                          case 0:
                            _context9.next = 2;
                            return plat.save({
                              transaction: transaction
                            });

                          case 2:
                            _context9.next = 4;
                            return (0, _utils.createUpdateLog)(db, 'updatePlatform', plat, user.username, transaction);

                          case 4:
                            return _context9.abrupt("return", plat);

                          case 5:
                          case "end":
                            return _context9.stop();
                        }
                      }
                    }, _callee9);
                  }));

                  return function (_x24) {
                    return _ref13.apply(this, arguments);
                  };
                }()));

              case 8:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }));

      function updatePlatform(_x20, _x21, _x22, _x23) {
        return _updatePlatform.apply(this, arguments);
      }

      return updatePlatform;
    }(),
    deletePlatform: function () {
      var _deletePlatform = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(parent, _ref14, _ref15) {
        var key, user, db, plat;
        return _regenerator["default"].wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                key = _ref14.key;
                user = _ref15.user, db = _ref15.db;
                _context12.next = 4;
                return db.models.platform.findByPk(key);

              case 4:
                plat = _context12.sent;
                return _context12.abrupt("return", db.transaction( /*#__PURE__*/function () {
                  var _ref16 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(transaction) {
                    return _regenerator["default"].wrap(function _callee11$(_context11) {
                      while (1) {
                        switch (_context11.prev = _context11.next) {
                          case 0:
                            _context11.next = 2;
                            return plat.destroy({
                              transaction: transaction
                            });

                          case 2:
                            _context11.next = 4;
                            return (0, _utils.createLog)(db, 'deletePlatform', plat.dataValues, user.username, transaction);

                          case 4:
                          case "end":
                            return _context11.stop();
                        }
                      }
                    }, _callee11);
                  }));

                  return function (_x28) {
                    return _ref16.apply(this, arguments);
                  };
                }()));

              case 6:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12);
      }));

      function deletePlatform(_x25, _x26, _x27) {
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
                return _context14.abrupt("return", db.transaction( /*#__PURE__*/function () {
                  var _ref18 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(transaction) {
                    var studio;
                    return _regenerator["default"].wrap(function _callee13$(_context13) {
                      while (1) {
                        switch (_context13.prev = _context13.next) {
                          case 0:
                            studio = db.models.studio.create(data, {
                              transaction: transaction
                            });
                            data.slug = studio.slug;
                            _context13.next = 4;
                            return (0, _utils.createLog)(db, 'createStudio', data, user.username, transaction);

                          case 4:
                            return _context13.abrupt("return", studio);

                          case 5:
                          case "end":
                            return _context13.stop();
                        }
                      }
                    }, _callee13);
                  }));

                  return function (_x33) {
                    return _ref18.apply(this, arguments);
                  };
                }()));

              case 2:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14);
      }));

      function createStudio(_x29, _x30, _x31, _x32) {
        return _createStudio.apply(this, arguments);
      }

      return createStudio;
    }(),
    updateStudio: function () {
      var _updateStudio = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16(parent, _ref19, _ref20, info) {
        var slug, name, user, db, studio;
        return _regenerator["default"].wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                slug = _ref19.slug, name = _ref19.name;
                user = _ref20.user, db = _ref20.db;
                _context16.next = 4;
                return db.models.studio.findByPk(slug);

              case 4:
                studio = _context16.sent;
                studio.name = name;
                return _context16.abrupt("return", db.transaction( /*#__PURE__*/function () {
                  var _ref21 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(transaction) {
                    return _regenerator["default"].wrap(function _callee15$(_context15) {
                      while (1) {
                        switch (_context15.prev = _context15.next) {
                          case 0:
                            _context15.next = 2;
                            return studio.save({
                              transaction: transaction
                            });

                          case 2:
                            _context15.next = 4;
                            return (0, _utils.createUpdateLog)(db, 'updateStudio', studio, user.username, transaction);

                          case 4:
                            return _context15.abrupt("return", studio);

                          case 5:
                          case "end":
                            return _context15.stop();
                        }
                      }
                    }, _callee15);
                  }));

                  return function (_x38) {
                    return _ref21.apply(this, arguments);
                  };
                }()));

              case 7:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16);
      }));

      function updateStudio(_x34, _x35, _x36, _x37) {
        return _updateStudio.apply(this, arguments);
      }

      return updateStudio;
    }(),
    deleteStudio: function () {
      var _deleteStudio = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee18(parent, _ref22, _ref23, info) {
        var slug, name, user, db, studio;
        return _regenerator["default"].wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                slug = _ref22.slug, name = _ref22.name;
                user = _ref23.user, db = _ref23.db;
                _context18.next = 4;
                return db.models.studio.findByPk(slug);

              case 4:
                studio = _context18.sent;
                return _context18.abrupt("return", db.transaction( /*#__PURE__*/function () {
                  var _ref24 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee17(transaction) {
                    return _regenerator["default"].wrap(function _callee17$(_context17) {
                      while (1) {
                        switch (_context17.prev = _context17.next) {
                          case 0:
                            studio.destroy({
                              transaction: transaction
                            });
                            _context17.next = 3;
                            return (0, _utils.createLog)(db, 'deleteStudio', studio.dataValues, user.username, transaction);

                          case 3:
                          case "end":
                            return _context17.stop();
                        }
                      }
                    }, _callee17);
                  }));

                  return function (_x43) {
                    return _ref24.apply(this, arguments);
                  };
                }()));

              case 6:
              case "end":
                return _context18.stop();
            }
          }
        }, _callee18);
      }));

      function deleteStudio(_x39, _x40, _x41, _x42) {
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
                return _context20.abrupt("return", db.transaction( /*#__PURE__*/function () {
                  var _ref26 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee19(transaction) {
                    var series, slug;
                    return _regenerator["default"].wrap(function _callee19$(_context19) {
                      while (1) {
                        switch (_context19.prev = _context19.next) {
                          case 0:
                            _context19.next = 2;
                            return db.models.series.create(data, {
                              transaction: transaction
                            });

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
                            return series.save({
                              transaction: transaction
                            });

                          case 22:
                            _context19.next = 24;
                            return (0, _utils.createLog)(db, 'createSeries', data, user.username, transaction);

                          case 24:
                            return _context19.abrupt("return", series);

                          case 25:
                          case "end":
                            return _context19.stop();
                        }
                      }
                    }, _callee19);
                  }));

                  return function (_x48) {
                    return _ref26.apply(this, arguments);
                  };
                }()));

              case 2:
              case "end":
                return _context20.stop();
            }
          }
        }, _callee20);
      }));

      function createSeries(_x44, _x45, _x46, _x47) {
        return _createSeries.apply(this, arguments);
      }

      return createSeries;
    }(),
    updateSeries: function () {
      var _updateSeries = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee22(parent, _ref27, _ref28, info) {
        var slug, name, cover, user, db, series;
        return _regenerator["default"].wrap(function _callee22$(_context22) {
          while (1) {
            switch (_context22.prev = _context22.next) {
              case 0:
                slug = _ref27.slug, name = _ref27.name, cover = _ref27.cover;
                user = _ref28.user, db = _ref28.db;
                _context22.next = 4;
                return db.models.series.findByPk(slug);

              case 4:
                series = _context22.sent;
                if (name) series.name = name;

                if (!cover) {
                  _context22.next = 13;
                  break;
                }

                _context22.next = 9;
                return (0, _utils.img)(cover, 'series', slug);

              case 9:
                series.placeholder = _context22.sent;
                _context22.next = 12;
                return (0, _utils.getImgColor)("series/".concat(slug));

              case 12:
                series.headerColor = _context22.sent;

              case 13:
                return _context22.abrupt("return", db.transaction( /*#__PURE__*/function () {
                  var _ref29 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee21(transaction) {
                    return _regenerator["default"].wrap(function _callee21$(_context21) {
                      while (1) {
                        switch (_context21.prev = _context21.next) {
                          case 0:
                            _context21.next = 2;
                            return series.save({
                              transaction: transaction
                            });

                          case 2:
                            _context21.next = 4;
                            return (0, _utils.createUpdateLog)(db, 'updateSeries', series, user.username, transaction);

                          case 4:
                            return _context21.abrupt("return", series);

                          case 5:
                          case "end":
                            return _context21.stop();
                        }
                      }
                    }, _callee21);
                  }));

                  return function (_x53) {
                    return _ref29.apply(this, arguments);
                  };
                }()));

              case 14:
              case "end":
                return _context22.stop();
            }
          }
        }, _callee22);
      }));

      function updateSeries(_x49, _x50, _x51, _x52) {
        return _updateSeries.apply(this, arguments);
      }

      return updateSeries;
    }(),
    deleteSeries: function () {
      var _deleteSeries = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee24(parent, _ref30, _ref31) {
        var slug, user, db, series;
        return _regenerator["default"].wrap(function _callee24$(_context24) {
          while (1) {
            switch (_context24.prev = _context24.next) {
              case 0:
                slug = _ref30.slug;
                user = _ref31.user, db = _ref31.db;
                _context24.next = 4;
                return db.models.series.findByPk(slug);

              case 4:
                series = _context24.sent;
                return _context24.abrupt("return", db.transaction( /*#__PURE__*/function () {
                  var _ref32 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee23(transaction) {
                    return _regenerator["default"].wrap(function _callee23$(_context23) {
                      while (1) {
                        switch (_context23.prev = _context23.next) {
                          case 0:
                            _context23.next = 2;
                            return series.destroy({
                              transaction: transaction
                            });

                          case 2:
                            _context23.next = 4;
                            return (0, _utils.createLog)(db, 'deleteSeries', series.dataValues, user.username, transaction);

                          case 4:
                          case "end":
                            return _context23.stop();
                        }
                      }
                    }, _callee23);
                  }));

                  return function (_x57) {
                    return _ref32.apply(this, arguments);
                  };
                }()));

              case 6:
              case "end":
                return _context24.stop();
            }
          }
        }, _callee24);
      }));

      function deleteSeries(_x54, _x55, _x56) {
        return _deleteSeries.apply(this, arguments);
      }

      return deleteSeries;
    }(),
    createGame: function () {
      var _createGame = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee26(parent, data, _ref33, info) {
        var db, user, game;
        return _regenerator["default"].wrap(function _callee26$(_context26) {
          while (1) {
            switch (_context26.prev = _context26.next) {
              case 0:
                db = _ref33.db, user = _ref33.user;
                _context26.next = 3;
                return db.models.game.create(data);

              case 3:
                game = _context26.sent;
                return _context26.abrupt("return", db.transaction( /*#__PURE__*/function () {
                  var _ref34 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee25(transaction) {
                    return _regenerator["default"].wrap(function _callee25$(_context25) {
                      while (1) {
                        switch (_context25.prev = _context25.next) {
                          case 0:
                            _context25.next = 2;
                            return Promise.all([game.setSeries(data.series, {
                              transaction: transaction
                            }), game.setPublishers(data.publishers, {
                              transaction: transaction
                            }), game.setPlatforms(data.platforms, {
                              transaction: transaction
                            })]);

                          case 2:
                            if (!data.cover) {
                              _context25.next = 8;
                              break;
                            }

                            _context25.next = 5;
                            return (0, _utils.img)(data.cover, 'game', data.slug);

                          case 5:
                            _context25.t0 = _context25.sent;
                            _context25.next = 9;
                            break;

                          case 8:
                            _context25.t0 = '';

                          case 9:
                            game.placeholder = _context25.t0;

                            if (!data.cover) {
                              _context25.next = 16;
                              break;
                            }

                            _context25.next = 13;
                            return (0, _utils.getImgColor)("game/".concat(data.slug));

                          case 13:
                            _context25.t1 = _context25.sent;
                            _context25.next = 17;
                            break;

                          case 16:
                            _context25.t1 = undefined;

                          case 17:
                            game.headerColor = _context25.t1;
                            _context25.next = 20;
                            return game.save({
                              transaction: transaction
                            });

                          case 20:
                            _context25.next = 22;
                            return (0, _utils.createLog)(db, 'createGame', data, user.username, transaction);

                          case 22:
                            return _context25.abrupt("return", game);

                          case 23:
                          case "end":
                            return _context25.stop();
                        }
                      }
                    }, _callee25);
                  }));

                  return function (_x62) {
                    return _ref34.apply(this, arguments);
                  };
                }()));

              case 5:
              case "end":
                return _context26.stop();
            }
          }
        }, _callee26);
      }));

      function createGame(_x58, _x59, _x60, _x61) {
        return _createGame.apply(this, arguments);
      }

      return createGame;
    }(),
    updateGame: function () {
      var _updateGame = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee28(parent, args, _ref35, info) {
        var user, db, slug, name, cover, releaseDate, _args$series, series, publishers, platforms, game;

        return _regenerator["default"].wrap(function _callee28$(_context28) {
          while (1) {
            switch (_context28.prev = _context28.next) {
              case 0:
                user = _ref35.user, db = _ref35.db;
                slug = args.slug, name = args.name, cover = args.cover, releaseDate = args.releaseDate, _args$series = args.series, series = _args$series === void 0 ? [] : _args$series, publishers = args.publishers, platforms = args.platforms;
                _context28.next = 4;
                return db.models.game.findByPk(slug);

              case 4:
                game = _context28.sent;
                game.name = name;
                game.releaseDate = releaseDate;

                if (!cover) {
                  _context28.next = 14;
                  break;
                }

                _context28.next = 10;
                return (0, _utils.img)(cover, 'game', slug);

              case 10:
                game.placeholder = _context28.sent;
                _context28.next = 13;
                return (0, _utils.getImgColor)("game/".concat(slug));

              case 13:
                series.headerColor = _context28.sent;

              case 14:
                return _context28.abrupt("return", db.transaction( /*#__PURE__*/function () {
                  var _ref36 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee27(transaction) {
                    return _regenerator["default"].wrap(function _callee27$(_context27) {
                      while (1) {
                        switch (_context27.prev = _context27.next) {
                          case 0:
                            game.setSeries(series, {
                              transaction: transaction
                            });
                            game.setPublishers(publishers, {
                              transaction: transaction
                            });
                            game.setPlatforms(platforms, {
                              transaction: transaction
                            });
                            _context27.next = 5;
                            return game.save({
                              transaction: transaction
                            });

                          case 5:
                            _context27.next = 7;
                            return (0, _utils.createUpdateLog)(db, 'updateGame', game, user.username, transaction);

                          case 7:
                            return _context27.abrupt("return", game);

                          case 8:
                          case "end":
                            return _context27.stop();
                        }
                      }
                    }, _callee27);
                  }));

                  return function (_x67) {
                    return _ref36.apply(this, arguments);
                  };
                }()));

              case 15:
              case "end":
                return _context28.stop();
            }
          }
        }, _callee28);
      }));

      function updateGame(_x63, _x64, _x65, _x66) {
        return _updateGame.apply(this, arguments);
      }

      return updateGame;
    }(),
    deleteGame: function () {
      var _deleteGame = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee30(parent, _ref37, _ref38) {
        var slug, user, db, game, log;
        return _regenerator["default"].wrap(function _callee30$(_context30) {
          while (1) {
            switch (_context30.prev = _context30.next) {
              case 0:
                slug = _ref37.slug;
                user = _ref38.user, db = _ref38.db;
                _context30.next = 4;
                return db.models.game.findByPk(slug);

              case 4:
                game = _context30.sent;
                _context30.t0 = _objectSpread;
                _context30.t1 = _objectSpread({}, game.dataValues);
                _context30.t2 = {};
                _context30.next = 10;
                return game.getSeries();

              case 10:
                _context30.t3 = _context30.sent;
                _context30.next = 13;
                return game.getPublishers();

              case 13:
                _context30.t4 = _context30.sent;
                _context30.next = 16;
                return game.getPlatforms();

              case 16:
                _context30.t5 = _context30.sent;
                _context30.t6 = {
                  series: _context30.t3,
                  publishers: _context30.t4,
                  platforms: _context30.t5
                };
                log = (0, _context30.t0)(_context30.t1, _context30.t2, _context30.t6);
                return _context30.abrupt("return", db.transaction( /*#__PURE__*/function () {
                  var _ref39 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee29(transaction) {
                    return _regenerator["default"].wrap(function _callee29$(_context29) {
                      while (1) {
                        switch (_context29.prev = _context29.next) {
                          case 0:
                            _context29.next = 2;
                            return game.destroy({
                              transaction: transaction
                            });

                          case 2:
                            _context29.next = 4;
                            return (0, _utils.createLog)(db, 'deleteSeries', log, user.username, transaction);

                          case 4:
                          case "end":
                            return _context29.stop();
                        }
                      }
                    }, _callee29);
                  }));

                  return function (_x71) {
                    return _ref39.apply(this, arguments);
                  };
                }()));

              case 20:
              case "end":
                return _context30.stop();
            }
          }
        }, _callee30);
      }));

      function deleteGame(_x68, _x69, _x70) {
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
                return _context32.abrupt("return", db.transaction( /*#__PURE__*/function () {
                  var _ref41 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee31(transaction) {
                    var anim;
                    return _regenerator["default"].wrap(function _callee31$(_context31) {
                      while (1) {
                        switch (_context31.prev = _context31.next) {
                          case 0:
                            _context31.next = 2;
                            return db.models.animation.create(data, {
                              transaction: transaction
                            });

                          case 2:
                            anim = _context31.sent;
                            _context31.next = 5;
                            return anim.setStudios(data.studios, {
                              transaction: transaction
                            });

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
                            return anim.save({
                              transaction: transaction
                            });

                          case 23:
                            _context31.next = 25;
                            return (0, _utils.createLog)(db, 'createAnimation', data, user.username, transaction);

                          case 25:
                            return _context31.abrupt("return", anim);

                          case 26:
                          case "end":
                            return _context31.stop();
                        }
                      }
                    }, _callee31);
                  }));

                  return function (_x76) {
                    return _ref41.apply(this, arguments);
                  };
                }()));

              case 2:
              case "end":
                return _context32.stop();
            }
          }
        }, _callee32);
      }));

      function createAnimation(_x72, _x73, _x74, _x75) {
        return _createAnimation.apply(this, arguments);
      }

      return createAnimation;
    }(),
    updateAnimation: function () {
      var _updateAnimation = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee34(parent, data, _ref42, info) {
        var db, user, anim;
        return _regenerator["default"].wrap(function _callee34$(_context34) {
          while (1) {
            switch (_context34.prev = _context34.next) {
              case 0:
                db = _ref42.db, user = _ref42.user;
                _context34.next = 3;
                return db.models.animation.findByPk(data.id);

              case 3:
                anim = _context34.sent;
                Object.entries(data).forEach(function (_ref43) {
                  var _ref44 = (0, _slicedToArray2["default"])(_ref43, 2),
                      key = _ref44[0],
                      value = _ref44[1];

                  anim[key] = value;
                });

                if (!data.cover) {
                  _context34.next = 12;
                  break;
                }

                _context34.next = 8;
                return (0, _utils.img)(data.cover, 'anim', anim.id);

              case 8:
                anim.placeholder = _context34.sent;
                _context34.next = 11;
                return (0, _utils.getImgColor)("anim/".concat(anim.id));

              case 11:
                anim.headerColor = _context34.sent;

              case 12:
                return _context34.abrupt("return", db.transaction( /*#__PURE__*/function () {
                  var _ref45 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee33(transaction) {
                    return _regenerator["default"].wrap(function _callee33$(_context33) {
                      while (1) {
                        switch (_context33.prev = _context33.next) {
                          case 0:
                            anim.setStudios(data.studios, {
                              transaction: transaction
                            });
                            _context33.next = 3;
                            return anim.save({
                              transaction: transaction
                            });

                          case 3:
                            _context33.next = 5;
                            return (0, _utils.createUpdateLog)(db, 'updateAnimation', anim, user.username, transaction);

                          case 5:
                            return _context33.abrupt("return", anim);

                          case 6:
                          case "end":
                            return _context33.stop();
                        }
                      }
                    }, _callee33);
                  }));

                  return function (_x81) {
                    return _ref45.apply(this, arguments);
                  };
                }()));

              case 13:
              case "end":
                return _context34.stop();
            }
          }
        }, _callee34);
      }));

      function updateAnimation(_x77, _x78, _x79, _x80) {
        return _updateAnimation.apply(this, arguments);
      }

      return updateAnimation;
    }(),
    deleteAnimation: function () {
      var _deleteAnimation = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee36(parent, _ref46, _ref47) {
        var id, user, db, anim, log;
        return _regenerator["default"].wrap(function _callee36$(_context36) {
          while (1) {
            switch (_context36.prev = _context36.next) {
              case 0:
                id = _ref46.id;
                user = _ref47.user, db = _ref47.db;
                _context36.next = 4;
                return db.models.animation.findByPk(id);

              case 4:
                anim = _context36.sent;
                _context36.t0 = _objectSpread;
                _context36.t1 = _objectSpread({}, anim.dataValues);
                _context36.t2 = {};
                _context36.next = 10;
                return anim.getStudios();

              case 10:
                _context36.t3 = _context36.sent;
                _context36.t4 = {
                  studios: _context36.t3
                };
                log = (0, _context36.t0)(_context36.t1, _context36.t2, _context36.t4);
                return _context36.abrupt("return", db.transaction( /*#__PURE__*/function () {
                  var _ref48 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee35(transaction) {
                    return _regenerator["default"].wrap(function _callee35$(_context35) {
                      while (1) {
                        switch (_context35.prev = _context35.next) {
                          case 0:
                            _context35.next = 2;
                            return anim.destroy({
                              transaction: transaction
                            });

                          case 2:
                            _context35.next = 4;
                            return (0, _utils.createLog)(db, 'deleteAnim', log, user.username, transaction);

                          case 4:
                          case "end":
                            return _context35.stop();
                        }
                      }
                    }, _callee35);
                  }));

                  return function (_x85) {
                    return _ref48.apply(this, arguments);
                  };
                }()));

              case 14:
              case "end":
                return _context36.stop();
            }
          }
        }, _callee36);
      }));

      function deleteAnimation(_x82, _x83, _x84) {
        return _deleteAnimation.apply(this, arguments);
      }

      return deleteAnimation;
    }(),
    updateAlbum: function () {
      var _updateAlbum = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee38(parent, data, _ref49, info) {
        var db, user, res, ost, triggerPost;
        return _regenerator["default"].wrap(function _callee38$(_context38) {
          while (1) {
            switch (_context38.prev = _context38.next) {
              case 0:
                db = _ref49.db, user = _ref49.user, res = _ref49.res;
                _context38.next = 3;
                return db.models.ost.findByPk(data.id);

              case 3:
                ost = _context38.sent;
                triggerPost = data.status !== ost.status.repeat(1) && data.status === 'show';
                data.artists = data.artists ? data.artists.map(function (artist) {
                  return {
                    name: artist,
                    slug: (0, _utils.slugify)(artist)
                  };
                }) : [];
                return _context38.abrupt("return", db.transaction( /*#__PURE__*/function () {
                  var _ref50 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee37(transaction) {
                    return _regenerator["default"].wrap(function _callee37$(_context37) {
                      while (1) {
                        switch (_context37.prev = _context37.next) {
                          case 0:
                            _context37.next = 2;
                            return db.models.artist.bulkCreate(data.artists, {
                              ignoreDuplicates: true,
                              transaction: transaction
                            });

                          case 2:
                            _context37.next = 4;
                            return Promise.all([ost.update(data, {
                              transaction: transaction
                            }), ost.setArtists(data.artists.map(function (_ref51) {
                              var slug = _ref51.slug;
                              return slug;
                            }), {
                              transaction: transaction
                            }), ost.setClasses(data.classes || [], {
                              transaction: transaction
                            }), ost.setCategories(data.categories || [], {
                              transaction: transaction
                            }), ost.setPlatforms(data.platforms || [], {
                              transaction: transaction
                            }), ost.setGames(data.games || []), {
                              transaction: transaction
                            }, ost.setRelated(data.related || [], {
                              transaction: transaction
                            }), ost.setAnimations(data.animations || [], {
                              transaction: transaction
                            }), db.models.disc.destroy({
                              where: {
                                ostId: ost.dataValues.id
                              },
                              transaction: transaction
                            }).then(function () {
                              return (data.discs || []).map(function (disc) {
                                return ost.createDisc(disc, {
                                  transaction: transaction
                                });
                              });
                            }), db.models.store.destroy({
                              where: {
                                ostId: ost.dataValues.id
                              },
                              transaction: transaction
                            }).then(function () {
                              return (data.stores || []).map(function (store) {
                                return ost.createStore(store, {
                                  transaction: transaction
                                });
                              });
                            }), db.models.download.destroy({
                              where: {
                                ostId: ost.dataValues.id
                              },
                              transaction: transaction
                            }).then(function () {
                              return (data.downloads || []).map(function (download) {
                                return ost.createDownload(download, {
                                  include: [db.models.link],
                                  transaction: transaction
                                });
                              });
                            }), (0, _utils.createUpdateLog)(db, 'updateAlbum', ost, user.username, transaction)]);

                          case 4:
                            if (!data.cover) {
                              _context37.next = 13;
                              break;
                            }

                            _context37.next = 7;
                            return (0, _utils.img)(data.cover, 'album', ost.id);

                          case 7:
                            ost.placeholder = _context37.sent;
                            _context37.next = 10;
                            return (0, _utils.getImgColor)("album/".concat(ost.id));

                          case 10:
                            ost.headerColor = _context37.sent;
                            _context37.next = 13;
                            return ost.save({
                              transaction: transaction
                            });

                          case 13:
                            if (triggerPost) {
                              (0, _plugins.postReddit)(ost);
                              (0, _plugins.postDiscord)(ost.id);
                            } // res.unstable_revalidate(`/album/${ost.id}`)


                            return _context37.abrupt("return", ost);

                          case 15:
                          case "end":
                            return _context37.stop();
                        }
                      }
                    }, _callee37);
                  }));

                  return function (_x90) {
                    return _ref50.apply(this, arguments);
                  };
                }()));

              case 7:
              case "end":
                return _context38.stop();
            }
          }
        }, _callee38);
      }));

      function updateAlbum(_x86, _x87, _x88, _x89) {
        return _updateAlbum.apply(this, arguments);
      }

      return updateAlbum;
    }()
  }
};

var _default = (0, _resolversComposition.composeResolvers)(resolvers, resolversComposition);

exports["default"] = _default;