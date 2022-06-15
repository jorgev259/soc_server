"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getVGMDB;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _axios = require("axios");

var _cheerio = _interopRequireDefault(require("cheerio"));

var isValidUrl = function isValidUrl(s) {
  try {
    var testUrl = new URL(s);
    return !!testUrl;
  } catch (err) {
    return false;
  }
};

function getVGMDB(_x) {
  return _getVGMDB.apply(this, arguments);
}

function _getVGMDB() {
  _getVGMDB = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(search) {
    var url, _$$, _$$$childNodes$find, _yield$get, data, vgmdbUrl, _yield$get2, htmlBody, $, discs;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            url = isValidUrl(search) ? new URL(search).pathname.split('/').slice(-1) : search;
            _context.prev = 1;
            _context.next = 4;
            return (0, _axios.get)("https://api.nemoralni.site/albums/".concat(url), {
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'x-api-key': 'i-m-a-pig-i-don-t-fight-for-honor-i-fight-for-a-paycheck'
              }
            });

          case 4:
            _yield$get = _context.sent;
            data = _yield$get.data;
            vgmdbUrl = data.vgmdb_url;
            data.tracklist = [];
            _context.next = 10;
            return (0, _axios.get)(vgmdbUrl, {
              headers: {
                'Content-Type': 'text/html'
              }
            });

          case 10:
            _yield$get2 = _context.sent;
            htmlBody = _yield$get2.data;
            $ = _cheerio["default"].load(htmlBody);
            discs = $('#tracklist table');
            discs.each(function (i, d) {
              var list = '';
              var tbody = d.childNodes.find(function (n) {
                return n.type === 'tag';
              });
              var trows = tbody.childNodes.filter(function (n) {
                return n.type === 'tag' && n.name === 'tr';
              });
              trows.forEach(function (tRow, i2) {
                if (i2 > 0) list = "".concat(list, "\n");
                var tds = tRow.childNodes.filter(function (n) {
                  return n.type === 'tag' && n.name === 'td';
                });
                var td = tds[1].childNodes[0].data.trim();
                list = "".concat(list).concat(td);
              });
              data.tracklist.push({
                number: i,
                body: list
              });
            });
            data.subTitle = (_$$ = $('div > span.albumtitle[style="display:inline"]')[0]) === null || _$$ === void 0 ? void 0 : (_$$$childNodes$find = _$$.childNodes.find(function (n) {
              return n.type === 'text';
            })) === null || _$$$childNodes$find === void 0 ? void 0 : _$$$childNodes$find.data;
            return _context.abrupt("return", data);

          case 19:
            _context.prev = 19;
            _context.t0 = _context["catch"](1);

          case 21:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 19]]);
  }));
  return _getVGMDB.apply(this, arguments);
}