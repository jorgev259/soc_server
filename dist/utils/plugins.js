"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.discordClient = void 0;
exports.postDiscord = postDiscord;
exports.postReddit = postReddit;

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
  _runReddit = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
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
  return _runReddit.apply(this, arguments);
}

if (redditConfig) {
  runReddit();
}

var discordClient = new _discord.Client({
  intents: [_discord.Intents.FLAGS.GUILDS, _discord.Intents.FLAGS.GUILD_MESSAGES, _discord.Intents.FLAGS.GUILD_MEMBERS]
});
exports.discordClient = discordClient;
if (discordToken) discordClient.login(discordToken).then(function () {
  return console.log("Logged in as ".concat(discordClient.user.tag, "!"));
});

function postReddit(_x) {
  return _postReddit.apply(this, arguments);
}

function _postReddit() {
  _postReddit = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(instance) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _postReddit.apply(this, arguments);
}

function postDiscord(_x2) {
  return _postDiscord.apply(this, arguments);
}

function _postDiscord() {
  _postDiscord = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(id) {
    var guild;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!discordToken) {
              _context3.next = 7;
              break;
            }

            _context3.next = 3;
            return discordClient.guilds.fetch(process.env.GUILD);

          case 3:
            guild = _context3.sent;
            _context3.next = 6;
            return guild.channels.fetch();

          case 6:
            guild.channels.cache.find(function (c) {
              return c.name === 'last-added-soundtracks';
            }).send("https://www.sittingonclouds.net/album/".concat(id));

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _postDiscord.apply(this, arguments);
}