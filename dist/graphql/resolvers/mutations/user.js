"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _apolloServerErrors = require("apollo-server-errors");

var _generatePassword = _interopRequireDefault(require("generate-password"));

var _resolversComposition = require("@graphql-tools/resolvers-composition");

var _luxon = require("luxon");

var _sequelize = require("sequelize");

var _path = _interopRequireDefault(require("path"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _sharp = _interopRequireDefault(require("sharp"));

var _forgor = require("../../../utils/forgor");

var _resolvers = require("../../../utils/resolvers");

var _plaiceholder = require("plaiceholder");

var resolversComposition = {
  'Mutation.*': (0, _resolvers.hasRole)('MANAGE_USER'),
  'Mutation.updatePass': [],
  'Mutation.createForgorLink': [],
  'Mutation.updateUser': [_resolvers.isAuthed],
  'Mutation.registerUser': []
};

var streamToString = function streamToString(stream) {
  var chunks = [];
  return new Promise(function (resolve, reject) {
    stream.on('data', function (chunk) {
      return chunks.push(Buffer.from(chunk));
    });
    stream.on('error', function (err) {
      return reject(err);
    });
    stream.on('end', function () {
      return resolve(Buffer.concat(chunks));
    });
  });
};

function cropPFP(_x, _x2, _x3) {
  return _cropPFP.apply(this, arguments);
}

function _cropPFP() {
  _cropPFP = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(streamItem, username, imgId) {
    var _yield$streamItem, createReadStream, pathString, fullPath, image, sharpImage, metadata, width, height, result, base64;

    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return streamItem;

          case 2:
            _yield$streamItem = _context12.sent;
            createReadStream = _yield$streamItem.createReadStream;
            pathString = '/var/www/soc_img/img/user';
            fullPath = _path["default"].join(pathString, "".concat(username, "_").concat(imgId, ".png"));
            _context12.next = 8;
            return _fsExtra["default"].ensureDir(pathString);

          case 8:
            _context12.next = 10;
            return streamToString(createReadStream());

          case 10:
            image = _context12.sent;
            sharpImage = (0, _sharp["default"])(image);
            _context12.next = 14;
            return sharpImage.metadata();

          case 14:
            metadata = _context12.sent;
            width = metadata.width, height = metadata.height;

            if (width !== height) {
              sharpImage = sharpImage.extract(width > height ? {
                left: Math.floor((width - height) / 2),
                top: 0,
                width: height,
                height: height
              } : {
                left: 0,
                top: Math.floor((height - width) / 2),
                width: width,
                height: width
              });
            }

            _context12.next = 19;
            return sharpImage.resize({
              width: 200,
              height: 200
            }).png().toFile(fullPath);

          case 19:
            _context12.next = 21;
            return (0, _plaiceholder.getPlaiceholder)(fullPath);

          case 21:
            result = _context12.sent;
            base64 = result.base64;
            return _context12.abrupt("return", base64);

          case 24:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));
  return _cropPFP.apply(this, arguments);
}

var resolvers = {
  Mutation: {
    registerUser: function () {
      var _registerUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_, _ref, _ref2) {
        var username, email, pfp, db;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                username = _ref.username, email = _ref.email, pfp = _ref.pfp;
                db = _ref2.db;
                return _context2.abrupt("return", db.transaction( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
                  var password, user, imgId;
                  return _regenerator["default"].wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return Promise.all([db.models.user.findByPk(username).then(function (result) {
                            if (result) throw new _apolloServerErrors.UserInputError('Username already in use');
                          }), db.models.user.findOne({
                            where: {
                              email: email
                            }
                          }).then(function (result) {
                            if (result) throw new _apolloServerErrors.UserInputError('Email already in use');
                          })]);

                        case 2:
                          password = _generatePassword["default"].generate({
                            length: 30,
                            numbers: true,
                            upercase: true,
                            strict: true
                          });
                          _context.t0 = db.models.user;
                          _context.t1 = username;
                          _context.t2 = email;
                          _context.next = 8;
                          return _bcrypt["default"].hash(password, 10);

                        case 8:
                          _context.t3 = _context.sent;
                          _context.t4 = {
                            username: _context.t1,
                            email: _context.t2,
                            password: _context.t3
                          };
                          _context.next = 12;
                          return _context.t0.create.call(_context.t0, _context.t4);

                        case 12:
                          user = _context.sent;

                          if (!pfp) {
                            _context.next = 21;
                            break;
                          }

                          imgId = Date.now();
                          _context.next = 17;
                          return cropPFP(pfp, username, imgId);

                        case 17:
                          user.placeholder = _context.sent;
                          user.imgId = imgId;
                          _context.next = 22;
                          break;

                        case 21:
                          user.placeholder = 'data:image/webp;base64,UklGRlQAAABXRUJQVlA4IEgAAACwAQCdASoEAAQAAUAmJZgCdAEO9p5AAPa//NFYLcn+a7b+3z7ynq/qXv+iG0yH/y1D9eBf9pqWugq9G0RnxmxwsjaA2bW8AAA=';

                        case 22:
                          _context.next = 24;
                          return user.save();

                        case 24:
                          _context.next = 26;
                          return (0, _forgor.createForgor)(user, db);

                        case 26:
                          return _context.abrupt("return", true);

                        case 27:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee);
                }))));

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function registerUser(_x4, _x5, _x6) {
        return _registerUser.apply(this, arguments);
      }

      return registerUser;
    }(),
    updateUserRoles: function () {
      var _updateUserRoles = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(parent, _ref4, _ref5, info) {
        var username, roles, db, payload, user;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                username = _ref4.username, roles = _ref4.roles;
                db = _ref5.db, payload = _ref5.payload;
                _context3.next = 4;
                return db.models.user.findByPk(username);

              case 4:
                user = _context3.sent;
                user.setRoles(roles);
                _context3.next = 8;
                return user.save();

              case 8:
                return _context3.abrupt("return", true);

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function updateUserRoles(_x7, _x8, _x9, _x10) {
        return _updateUserRoles.apply(this, arguments);
      }

      return updateUserRoles;
    }(),
    deleteUser: function () {
      var _deleteUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(parent, _ref6, _ref7, info) {
        var username, db, payload, user;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                username = _ref6.username;
                db = _ref7.db, payload = _ref7.payload;
                _context4.next = 4;
                return db.models.user.findByPk(username);

              case 4:
                user = _context4.sent;

                if (user) {
                  _context4.next = 7;
                  break;
                }

                throw new _apolloServerErrors.UserInputError('Not Found');

              case 7:
                user.destroy();
                return _context4.abrupt("return", 1);

              case 9:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      function deleteUser(_x11, _x12, _x13, _x14) {
        return _deleteUser.apply(this, arguments);
      }

      return deleteUser;
    }(),
    createForgorLink: function () {
      var _createForgorLink = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(_, _ref8, _ref9) {
        var key, db, user;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                key = _ref8.key;
                db = _ref9.db;
                _context5.next = 4;
                return db.models.user.findOne({
                  where: (0, _defineProperty2["default"])({}, _sequelize.Op.or, [{
                    username: key
                  }, {
                    email: key
                  }])
                });

              case 4:
                user = _context5.sent;

                if (user) {
                  _context5.next = 7;
                  break;
                }

                throw new _apolloServerErrors.UserInputError('Not Found');

              case 7:
                _context5.next = 9;
                return (0, _forgor.createForgor)(user, db);

              case 9:
                return _context5.abrupt("return", true);

              case 10:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function createForgorLink(_x15, _x16, _x17) {
        return _createForgorLink.apply(this, arguments);
      }

      return createForgorLink;
    }(),
    updatePass: function () {
      var _updatePass = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(_, _ref10, _ref11) {
        var key, pass, db, row, now, expires;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                key = _ref10.key, pass = _ref10.pass;
                db = _ref11.db;
                _context7.next = 4;
                return db.models.forgor.findByPk(key);

              case 4:
                row = _context7.sent;

                if (row) {
                  _context7.next = 7;
                  break;
                }

                throw new _apolloServerErrors.ForbiddenError();

              case 7:
                now = _luxon.DateTime.now();
                expires = _luxon.DateTime.fromJSDate(row.expires);

                if (!(now > expires)) {
                  _context7.next = 11;
                  break;
                }

                throw new _apolloServerErrors.ForbiddenError();

              case 11:
                return _context7.abrupt("return", db.transaction( /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
                  var user;
                  return _regenerator["default"].wrap(function _callee6$(_context6) {
                    while (1) {
                      switch (_context6.prev = _context6.next) {
                        case 0:
                          _context6.next = 2;
                          return db.models.user.findByPk(row.username);

                        case 2:
                          user = _context6.sent;
                          _context6.next = 5;
                          return _bcrypt["default"].hash(pass, 10);

                        case 5:
                          user.password = _context6.sent;
                          _context6.next = 8;
                          return user.save();

                        case 8:
                          _context6.next = 10;
                          return row.destroy();

                        case 10:
                          return _context6.abrupt("return", true);

                        case 11:
                        case "end":
                          return _context6.stop();
                      }
                    }
                  }, _callee6);
                }))));

              case 12:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      function updatePass(_x18, _x19, _x20) {
        return _updatePass.apply(this, arguments);
      }

      return updatePass;
    }(),
    updateUser: function () {
      var _updateUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(_, _ref13, _ref14) {
        var username, email, password, pfp, db, user, pathString, imgId;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                username = _ref13.username, email = _ref13.email, password = _ref13.password, pfp = _ref13.pfp;
                db = _ref14.db, user = _ref14.user;
                if (username) user.username = username;
                if (email) user.email = email;

                if (!password) {
                  _context8.next = 8;
                  break;
                }

                _context8.next = 7;
                return _bcrypt["default"].hash(password, 10);

              case 7:
                user.password = _context8.sent;

              case 8:
                if (!pfp) {
                  _context8.next = 17;
                  break;
                }

                pathString = '/var/www/soc_img/img/user';
                _context8.next = 12;
                return _fsExtra["default"].remove(_path["default"].join(pathString, "".concat(user.username, "_").concat(user.imgId, ".png")));

              case 12:
                imgId = Date.now();
                _context8.next = 15;
                return cropPFP(pfp, username, imgId);

              case 15:
                user.placeholder = _context8.sent;
                user.imgId = imgId;

              case 17:
                _context8.next = 19;
                return user.save();

              case 19:
                return _context8.abrupt("return", true);

              case 20:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8);
      }));

      function updateUser(_x21, _x22, _x23) {
        return _updateUser.apply(this, arguments);
      }

      return updateUser;
    }(),
    createRole: function () {
      var _createRole = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(parent, args, _ref15) {
        var db, user, payload;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                db = _ref15.db, user = _ref15.user, payload = _ref15.payload;
                return _context9.abrupt("return", db.models.role.create(args));

              case 2:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9);
      }));

      function createRole(_x24, _x25, _x26) {
        return _createRole.apply(this, arguments);
      }

      return createRole;
    }(),
    updateRole: function () {
      var _updateRole = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(parent, _ref16, _ref17) {
        var key, name, permissions, db, payload, role;
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                key = _ref16.key, name = _ref16.name, permissions = _ref16.permissions;
                db = _ref17.db, payload = _ref17.payload;
                _context10.next = 4;
                return db.models.role.findByPk(key);

              case 4:
                role = _context10.sent;

                if (role) {
                  _context10.next = 7;
                  break;
                }

                throw new _apolloServerErrors.UserInputError('Not Found');

              case 7:
                if (!(role.name !== name)) {
                  _context10.next = 10;
                  break;
                }

                _context10.next = 10;
                return db.query("UPDATE roles SET name = \"".concat(name, "\" WHERE name = \"").concat(key, "\""));

              case 10:
                role.permissions = permissions;
                _context10.next = 13;
                return role.save();

              case 13:
                return _context10.abrupt("return", role);

              case 14:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }));

      function updateRole(_x27, _x28, _x29) {
        return _updateRole.apply(this, arguments);
      }

      return updateRole;
    }(),
    deleteRole: function () {
      var _deleteRole = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(parent, _ref18, _ref19) {
        var name, db, user, payload, role;
        return _regenerator["default"].wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                name = _ref18.name;
                db = _ref19.db, user = _ref19.user, payload = _ref19.payload;
                _context11.next = 4;
                return db.models.role.findByPk(name);

              case 4:
                role = _context11.sent;

                if (role) {
                  _context11.next = 7;
                  break;
                }

                throw new _apolloServerErrors.UserInputError('Not Found');

              case 7:
                _context11.next = 9;
                return role.destroy();

              case 9:
                return _context11.abrupt("return", name);

              case 10:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }));

      function deleteRole(_x30, _x31, _x32) {
        return _deleteRole.apply(this, arguments);
      }

      return deleteRole;
    }()
  }
};

var _default = (0, _resolversComposition.composeResolvers)(resolvers, resolversComposition);

exports["default"] = _default;