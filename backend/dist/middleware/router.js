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

router
//Ready routes
.get('/', async function (ctx, next) {
  //Tested
  ctx.body = 'Authorisation page';
}).get('/app', async function (ctx, next) {
  //Tested
  ctx.body = 'Main page';
}).get('/records', async function (ctx, next) {
  //Tested
  try {
    var records = await _controller2.default.getAll();
    ctx.body = records;
  } catch (e) {
    ctx.status = 404;
    ctx.body = 'Records can\'t be found. An error "' + e.message + '" occured';
  }
}).get('/record/id=:id', async function (ctx, next) {
  //Tested
  try {
    var record = await _controller2.default.getUser(ctx.params.id);
    ctx.body = record;
  } catch (e) {
    ctx.status = 404;
    ctx.body = e.message;
  }
}).get('/tasks/id=:id', async function (ctx, next) {
  try {
    //Tested
    var tasks = await _controller2.default.getTasks(ctx.params.id);
    ctx.body = tasks;
  } catch (e) {
    ctx.status = 404;
    ctx.body = 'An error occured: "' + e.message + '"';
  }
}).get('*', async function (ctx, next) {
  ctx.body = 'The page for url: ' + ctx.url + ' is unreacheble';
  ctx.status = 404;
}).post('/user/name=:name&log=:log&pass=:pass', async function (ctx, next) {
  //Tested
  try {
    var result = await _controller2.default.pushUser(ctx.params);
    ctx.body = 'A new user is inserted';
  } catch (e) {
    ctx.status = 500;
    ctx.body = 'A new user can\'t be pushed. An error "' + e.message + '" occured';
  }
}).post('/task/id=:id&newtask=:newtask', async function (ctx, next) {
  //Tested
  try {
    var result = await _controller2.default.pushTask(ctx.params);
    ctx.body = result;
  } catch (e) {
    ctx.status = 500;
    ctx.body = '' + e.message;
  }
}).delete('/user/id=:id', async function (ctx, next) {
  //Tested
  try {
    var result = await _controller2.default.deleteUser(ctx.params.id);
    ctx.body = result;
  } catch (e) {
    ctx.status = 500;
    ctx.body = 'The user can\'t be deleted. An error "' + e.message + ' occured"';
  }
}).delete('/task/id=:id&ind=:ind', async function (ctx, next) {
  //Tested
  try {
    var result = await _controller2.default.deleteTask(ctx.params);
    ctx.body = result;
  } catch (e) {
    ctx.status = 500;
    ctx.body = e.message;
  }
}).put('/task/id=:id&ind=:ind&newtask=:newtask', async function (ctx, next) {
  //Tested
  try {
    var result = await _controller2.default.updateTask(ctx.params);
    ctx.body = result;
  } catch (e) {
    ctx.status = 500;
    ctx.body = '' + e.message;
  }
});

function routes() {
  return router.routes();
}