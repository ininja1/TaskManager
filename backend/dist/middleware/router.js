'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = routes;

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _koaBody = require('koa-body');

var _koaBody2 = _interopRequireDefault(_koaBody);

var _koaConvert = require('koa-convert');

var _koaConvert2 = _interopRequireDefault(_koaConvert);

var _database = require('../database.js');

var _database2 = _interopRequireDefault(_database);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _koaRouter2.default();
var koaBody = (0, _koaConvert2.default)(new _koaBody2.default());

router.get('/', async function (ctx, next) {
  ctx.body = 'Authorisation page';
}).get('/app', async function (ctx, next) {
  ctx.body = 'Main page';
}).get('/records', async function (ctx, next) {
  var records = await _database2.default.getRecords();
  if (records) {
    ctx.body = records;
  } else {
    ctx.status = 404;
  }
}).get('/record/:id', async function (ctx, next) {
  var record = await _database2.default.getRecord(ctx.params.id);
  if (record) {
    ctx.body = record;
  } else {
    ctx.status = 404;
  }
});

function routes() {
  return router.routes();
};