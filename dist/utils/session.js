"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withSessionSsr = exports.withSessionApi = void 0;

var _next = require("iron-session/next");

var options = {
  password: process.env.IRONCLAD,
  cookieName: 'socuser'
};

var withSessionApi = function withSessionApi(handler) {
  return (0, _next.withIronSessionApiRoute)(handler, options);
};

exports.withSessionApi = withSessionApi;

var withSessionSsr = function withSessionSsr(handler) {
  return (0, _next.withIronSessionSsr)(handler, options);
};

exports.withSessionSsr = withSessionSsr;