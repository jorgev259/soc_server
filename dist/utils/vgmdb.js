"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getVGMDB;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

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

function makeRequest(_x) {
  return _makeRequest.apply(this, arguments);
}

function _makeRequest() {
  _makeRequest = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(url) {
    var _yield$get, data;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _axios.get)("https://api.nemoralni.site/albums/".concat(url), {
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'x-api-key': 'i-m-a-pig-i-don-t-fight-for-honor-i-fight-for-a-paycheck'
              }
            });

          case 3:
            _yield$get = _context.sent;
            data = _yield$get.data;
            return _context.abrupt("return", data);

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));
  return _makeRequest.apply(this, arguments);
}

function getVGMDB(_x2) {
  return _getVGMDB.apply(this, arguments);
}

function _getVGMDB() {
  _getVGMDB = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(search) {
    var _$$, _$$$childNodes$find;

    var url, data, vgmdbUrl, _yield$get2, htmlBody, $, discs, creditsNodes;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            url = isValidUrl(search) ? new URL(search).pathname.split('/').slice(-1) : search;
            _context2.next = 3;
            return makeRequest(url);

          case 3:
            data = _context2.sent;

            if (data) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", {});

          case 6:
            vgmdbUrl = data.vgmdb_url;
            data.tracklist = [];
            _context2.next = 10;
            return (0, _axios.get)(vgmdbUrl, {
              headers: {
                'Content-Type': 'text/html'
              }
            });

          case 10:
            _yield$get2 = _context2.sent;
            htmlBody = _yield$get2.data;
            $ = _cheerio["default"].load(htmlBody);
            discs = $('#tracklist table');
            discs.each(function (i, d) {
              var _d$parent$attribs$sty;

              if ((_d$parent$attribs$sty = d.parent.attribs.style) !== null && _d$parent$attribs$sty !== void 0 && _d$parent$attribs$sty.includes('display: none')) return true;
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
            creditsNodes = $('#collapse_credits tr.maincred');
            data.artists = [];
            creditsNodes.each(function (i, c) {
              var _labelNode$children$f, _labelNode$children$f2, _labelNode$children$f3, _data$artists;

              var _c$children$filter = c.children.filter(function (n) {
                return n.type === 'tag';
              }),
                  _c$children$filter2 = (0, _slicedToArray2["default"])(_c$children$filter, 2),
                  labelNode = _c$children$filter2[0],
                  nameNode = _c$children$filter2[1];

              var creditLabel = labelNode === null || labelNode === void 0 ? void 0 : (_labelNode$children$f = labelNode.children.find(function (c) {
                return c.children;
              })) === null || _labelNode$children$f === void 0 ? void 0 : (_labelNode$children$f2 = _labelNode$children$f.children.find(function (c) {
                return c.children;
              })) === null || _labelNode$children$f2 === void 0 ? void 0 : (_labelNode$children$f3 = _labelNode$children$f2.children.find(function (s) {
                var _s$attribs$style;

                return s.attribs["class"] === 'artistname' && ((_s$attribs$style = s.attribs.style) === null || _s$attribs$style === void 0 ? void 0 : _s$attribs$style.includes('display:inline'));
              })) === null || _labelNode$children$f3 === void 0 ? void 0 : _labelNode$children$f3.children[0].data;
              if (!['Vocals', 'Composer', 'Arranger'].includes(creditLabel)) return true;
              var artistNodes = nameNode.children.filter(function (a) {
                return a.type === 'tag' || a.data.trim() !== ',';
              }).map(findArtist).filter(function (a) {
                return a.length > 0;
              });

              (_data$artists = data.artists).push.apply(_data$artists, (0, _toConsumableArray2["default"])(artistNodes.filter(function (a) {
                return !data.artists.includes(a);
              })));
            });
            return _context2.abrupt("return", data);

          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getVGMDB.apply(this, arguments);
}

function findArtist(node) {
  if (node.type === 'text') return node.data.replace(', ', '').trim();
  var result = node.children.find(function (ch) {
    return ch.type === 'text' ? ch : ch.attribs.style === 'display:inline' && ch.attribs["class"] === 'artistname';
  });
  if (!result) return '';
  return result.type === 'text' ? result.data : result.children[0].data;
}