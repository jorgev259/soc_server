"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PLACEHOLDER = void 0;
exports.clearKeys = clearKeys;
exports.getPageList = exports.getImgColor = exports.getImageUrl = exports.getFullPageList = exports.createUpdateLog = exports.createLog = void 0;
exports.getRandomInt = getRandomInt;
exports.prepareForm = exports.img = void 0;
exports.processImage = processImage;
exports.slugify = exports.skipAds = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slugify = _interopRequireDefault(require("slugify"));

var _formSerialize = _interopRequireDefault(require("form-serialize"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

var _sharp = _interopRequireDefault(require("sharp"));

var PLACEHOLDER = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAECAIAAADETxJQAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAMUlEQVQImWN4fGrVhZ0z/v+5zZAc5yfOwGCtrsbg4em/f7ZvZ7w2Q15Vi6e1iggPAwBwDg7L//0+xAAAAABJRU5ErkJggg==';
exports.PLACEHOLDER = PLACEHOLDER;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var getImageUrl = function getImageUrl(id) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'album';
  return "https://cdn.sittingonclouds.net/".concat(type, "/").concat(id, ".png");
};

exports.getImageUrl = getImageUrl;

var skipAds = function skipAds(user) {
  return user && user.permissions.includes('SKIP_ADS');
};

exports.skipAds = skipAds;

var getFullPageList = function getFullPageList(count, limit) {
  return (0, _toConsumableArray2["default"])(Array(Math.ceil(count / limit))).map(function (v, i) {
    return i + 1;
  });
};

exports.getFullPageList = getFullPageList;

var getPageList = function getPageList(fullPageList, pageLimit, page) {
  var pageList = [[]];
  fullPageList.forEach(function (n) {
    pageList[pageList.length - 1].push(n);
    if (n % pageLimit === 0) pageList.push([]);
  });
  var currentListIndex = pageList.findIndex(function (l) {
    return l.includes(parseInt(page));
  });
  var currentList = pageList[currentListIndex];
  return {
    pageList: pageList,
    currentList: currentList,
    currentListIndex: currentListIndex
  };
};

exports.getPageList = getPageList;

function clearKeys(keys, baseIds) {
  var remove = keys.reduce(function (acum, key) {
    var values = baseIds.map(function (baseId) {
      return document.getElementById("".concat(baseId).concat(key)).value;
    });
    if (values.every(function (value) {
      return !value;
    })) acum.push(key);
    return acum;
  }, []);
  return keys.filter(function (k) {
    return !remove.includes(k);
  });
}

var slugify = function slugify(text) {
  return (0, _slugify["default"])(text, {
    lower: true,
    strict: true
  });
};

exports.slugify = slugify;

var prepareForm = function prepareForm(e) {
  var data = (0, _formSerialize["default"])(e.target, {
    hash: true
  });
  data.releaseDate = new Date(data.releaseDate).toISOString().substring(0, 10);
  if (data.artists) data.artists = data.artists.split(',').map(function (e) {
    return e.trim();
  });
  data.discs = data.discs.map(function (d, i) {
    var payload = d;
    payload.number = i;
    return payload;
  });
  if (data.downloads) data.downloads.forEach(function (link) {
    link.small = link.small === 'on';
  });
  if (e.target.elements.cover.files[0] !== undefined) data.cover = e.target.elements.cover.files[0];
  return data;
};

exports.prepareForm = prepareForm;

function colorToHex(color) {
  var hexadecimal = color.toString(16);
  return hexadecimal.length === 1 ? '0' + hexadecimal : hexadecimal;
}

function convertRGBtoHex(red, green, blue) {
  return '#' + colorToHex(red) + colorToHex(green) + colorToHex(blue);
}

var getImgColor = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(filePath) {
    var pathString, _yield$sharp$stats, dominant, r, g, b;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            pathString = _path["default"].join('/var/www/soc_img/img', "".concat(filePath, ".png"));
            _context.next = 3;
            return _fsExtra["default"].exists(pathString);

          case 3:
            if (_context.sent) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", null);

          case 5:
            _context.next = 7;
            return (0, _sharp["default"])(pathString).stats();

          case 7:
            _yield$sharp$stats = _context.sent;
            dominant = _yield$sharp$stats.dominant;
            r = dominant.r, g = dominant.g, b = dominant.b;
            return _context.abrupt("return", convertRGBtoHex(r, g, b));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getImgColor(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.getImgColor = getImgColor;

var img = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(streamItem, folder, id) {
    var _yield$streamItem, createReadStream, pathString, fullPath;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return streamItem;

          case 2:
            _yield$streamItem = _context3.sent;
            createReadStream = _yield$streamItem.createReadStream;
            pathString = _path["default"].join('/var/www/soc_img/img', folder);
            fullPath = _path["default"].join(pathString, "".concat(id, ".png"));
            _context3.next = 8;
            return _fsExtra["default"].ensureDir(pathString);

          case 8:
            return _context3.abrupt("return", new Promise(function (resolve, reject) {
              var writeStream = _fsExtra["default"].createWriteStream(fullPath);

              createReadStream().pipe(writeStream).on('finish', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.t0 = resolve;
                        _context2.next = 3;
                        return processImage(fullPath);

                      case 3:
                        _context2.t1 = _context2.sent;
                        return _context2.abrupt("return", (0, _context2.t0)(_context2.t1));

                      case 5:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }))).on('error', reject);
            }));

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function img(_x2, _x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.img = img;

function processImage(_x5) {
  return _processImage.apply(this, arguments);
}

function _processImage() {
  _processImage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(imagePath) {
    var sharpImg, meta, placeholderImgWidth, imgAspectRatio, placeholderImgHeight, buffer;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            sharpImg = (0, _sharp["default"])(imagePath);
            _context4.next = 3;
            return sharpImg.metadata();

          case 3:
            meta = _context4.sent;
            placeholderImgWidth = 20;
            imgAspectRatio = meta.width / meta.height;
            placeholderImgHeight = Math.round(placeholderImgWidth / imgAspectRatio);
            _context4.next = 9;
            return sharpImg.resize(placeholderImgWidth, placeholderImgHeight).toBuffer();

          case 9:
            buffer = _context4.sent;
            return _context4.abrupt("return", "data:image/".concat(meta.format, ";base64,").concat(buffer.toString('base64')));

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _processImage.apply(this, arguments);
}

var createLog = function createLog(db, action, data, username, transaction) {
  return db.models.log.create({
    action: action,
    data: JSON.stringify(data),
    username: username
  }, {
    transaction: transaction
  });
};

exports.createLog = createLog;

var createUpdateLog = function createUpdateLog(db, action, row, username) {
  return createLog(db, action, {
    old: row._previousDataValues,
    "new": row.dataValues
  }, username);
};

exports.createUpdateLog = createUpdateLog;