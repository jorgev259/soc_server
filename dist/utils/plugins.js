"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _discord = require("discord.js");

// const Reddit = require('reddit')
var redditConfig = process.env.REDDIT;
var discordToken = process.env.DISCORD; // let reddit
// const flairs = []

function runReddit() {
  return _runReddit.apply(this, arguments);
}

function _runReddit() {
  _runReddit = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _runReddit.apply(this, arguments);
}

if (redditConfig) {
  runReddit();
}

var discordClient;

if (discordToken) {
  discordClient = new _discord.Client({
    intents: [_discord.Intents.FLAGS.GUILD_MESSAGES]
  });
  discordClient.login(discordToken);
}

module.exports = {
  postReddit: function () {
    var _postReddit = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(instance) {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function postReddit(_x) {
      return _postReddit.apply(this, arguments);
    }

    return postReddit;
  }(),
  postDiscord: function () {
    var _postDiscord = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(id) {
      var guild;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!discordClient) {
                _context2.next = 7;
                break;
              }

              _context2.next = 3;
              return discordClient.guilds.fetch('496366337036255242');

            case 3:
              guild = _context2.sent;
              _context2.next = 6;
              return guild.channels.fetch();

            case 6:
              guild.channels.cache.find(function (c) {
                return c.name === 'last-added-soundtracks';
              }).send("https://www.sittingonclouds.net/album/".concat(id));

            case 7:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function postDiscord(_x2) {
      return _postDiscord.apply(this, arguments);
    }

    return postDiscord;
  }()
};