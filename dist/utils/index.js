"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PLACEHOLDER = void 0;
exports.clearKeys = clearKeys;
exports.getPageList = exports.getImageUrl = exports.getFullPageList = void 0;
exports.getRandomInt = getRandomInt;
exports.slugify = exports.skipAds = exports.prepareForm = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slugify = _interopRequireDefault(require("slugify"));

var _formSerialize = _interopRequireDefault(require("form-serialize"));

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