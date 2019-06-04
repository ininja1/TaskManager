'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = routes;

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _controller = require('../controller');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _koaRouter2.default();

router.get('/', async function (ctx, next) {
  ctx.body = 'Authorisation page';
}).get('/app', async function (ctx, next) {
  ctx.body = 'Main page';
}).get('/records', async function (ctx, next) {
  var records = await _controller2.default.getAll();
  if (records) {
    ctx.body = records;
  } else {
    ctx.status = 404;
  }
});

function routes() {
  return router.routes();
};