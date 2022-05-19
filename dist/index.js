"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _apolloServerExpress = require("apollo-server-express");

var _merge = require("@graphql-tools/merge");

var _graphqlUpload = require("graphql-upload");

var _apolloServerCore = require("apollo-server-core");

var _loadFiles = require("@graphql-tools/load-files");

var _path = _interopRequireDefault(require("path"));

var _express2 = require("iron-session/express");

var _startDB = _interopRequireDefault(require("./sequelize/startDB"));

var _resolvers = _interopRequireDefault(require("./graphql/resolvers"));

var db = _startDB["default"]["default"] || _startDB["default"];
var port = process.env.PORT || 4000;
var schemas = (0, _loadFiles.loadFilesSync)(_path["default"].join(__dirname, './graphql/schemas'));
var corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:4000', 'https://sittingonclouds.net', 'https://www,sittingonclouds.net'],
  credentials: true
};

function context(_x) {
  return _context.apply(this, arguments);
}

function _context() {
  _context = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
    var req, res, _ref2, username;

    return _regenerator["default"].wrap(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            req = _ref.req, res = _ref.res;
            _ref2 = req.session || {}, username = _ref2.username;
            _context2.t0 = db;
            _context2.t1 = req;
            _context2.t2 = res;
            _context2.t3 = username;
            _context2.t4 = username;

            if (!_context2.t4) {
              _context2.next = 11;
              break;
            }

            _context2.next = 10;
            return db.models.user.findByPk(username);

          case 10:
            _context2.t4 = _context2.sent;

          case 11:
            _context2.t5 = _context2.t4;
            return _context2.abrupt("return", {
              db: _context2.t0,
              req: _context2.t1,
              res: _context2.t2,
              username: _context2.t3,
              user: _context2.t5
            });

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee);
  }));
  return _context.apply(this, arguments);
}

var server = new _apolloServerExpress.ApolloServer({
  typeDefs: (0, _merge.mergeTypeDefs)(schemas),
  resolvers: (0, _merge.mergeResolvers)(_resolvers["default"]),
  context: context,
  plugins: [process.env.NODE_ENV === 'production' ? (0, _apolloServerCore.ApolloServerPluginLandingPageDisabled)() : (0, _apolloServerCore.ApolloServerPluginLandingPageGraphQLPlayground)()]
});
startServer();

function startServer() {
  return _startServer.apply(this, arguments);
}

function _startServer() {
  _startServer = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var app;
    return _regenerator["default"].wrap(function _callee2$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (process.env.NODE_ENV === 'production' || process.env.SYNC) db.sync();
            _context3.next = 3;
            return server.start();

          case 3:
            app = (0, _express["default"])();
            app.use((0, _graphqlUpload.graphqlUploadExpress)());
            app.use((0, _express2.ironSession)({
              password: process.env.IRONCLAD,
              cookieName: 'socuser'
            }));
            server.applyMiddleware({
              app: app,
              path: '/',
              cors: corsOptions
            });
            _context3.next = 9;
            return app.listen({
              port: port
            });

          case 9:
            console.log("\uD83D\uDE80 Server ready at http://localhost:".concat(port).concat(server.graphqlPath));

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee2);
  }));
  return _startServer.apply(this, arguments);
}