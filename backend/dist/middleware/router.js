'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = routes;

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _koaRouter2.default();

router.get('/', async function (ctx, next) {
  ctx.body = 'Authorisation page';
}).get('/app', async function (ctx, next) {
  ctx.body = 'Main page';
});

function routes() {
  return router.routes();
};