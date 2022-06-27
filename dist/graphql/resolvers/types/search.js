"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _info = require("../../../config/info.json");

var resolvers = {
  VgmResult: {
    vgmdbUrl: function vgmdbUrl(parent) {
      return parent.vgmdb_url;
    },
    releaseDate: function releaseDate(parent) {
      var _parent$release_date;

      return (_parent$release_date = parent.release_date) === null || _parent$release_date === void 0 ? void 0 : _parent$release_date.replaceAll('.', '-');
    },
    categories: function categories(parent) {
      var _parent$category;

      return (_parent$category = parent.category) === null || _parent$category === void 0 ? void 0 : _parent$category.split(',').map(function (i) {
        return i.trim();
      }).filter(function (c) {
        return _info.categories.includes(c);
      });
    },
    classifications: function classifications(parent) {
      var _parent$classificatio;

      return (_parent$classificatio = parent.classification) === null || _parent$classificatio === void 0 ? void 0 : _parent$classificatio.split(',').map(function (i) {
        return i.trim();
      }).filter(function (c) {
        return _info.classifications.includes(c);
      });
    }
  }
};
var _default = resolvers;
exports["default"] = _default;