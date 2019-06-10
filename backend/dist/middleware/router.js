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
  ctx.body = 'Authorisation page';
}).get('/app', async function (ctx, next) {
  ctx.body = 'Main page';
}).get('/records', async function (ctx, next) {
  try {
    var records = await _controller2.default.getAll();
    ctx.body = records;
  } catch (e) {
    ctx.status = 404;
    ctx.body = 'Records can\'t be found. An error "' + e.message + '" occured';
  }
}).get('/record/id=:id', async function (ctx, next) {
  try {
    var record = await _controller2.default.getUser(ctx.params.id);
    ctx.body = record;
  } catch (e) {
    ctx.status = 404;
    ctx.body = e.message;
  }
}).get('/tasks/id=:id', async function (ctx, next) {
  try {
    var tasks = await _controller2.default.getTasks(ctx.params.id);
    ctx.body = tasks;
  } catch (e) {
    ctx.status = 404;
    ctx.body = 'An error occured: "' + e.message + '"';
  }
}).get('*', async function (ctx, next) {
  ctx.body = 'The page for url: ' + ctx.url + ' is unreacheble';
  ctx.status = 404;
}).post('/user', async function (ctx, next) {
  try {
    //const result = await methods.pushUser({name: 'Test', login: 'test10', password: '11111111', tasks: ['Test']});
    var result = await _controller2.default.pushUser(ctx.params);
    ctx.body = 'A new user is inserted';
  } catch (e) {
    ctx.status = 500;
    ctx.body = 'A new user can\'t be pushed. An error "' + e.message + '" occured';
  }
}).delete('/user/id=:id', async function (ctx, next) {
  try {
    //const result = await methods.deleteUser({id : 10, name: 'test8', login: 'postpost', password: '11111111'});
    var result = await _controller2.default.deleteUser(ctx.params.id);
    ctx.body = result;
  } catch (e) {
    ctx.status = 500;
    ctx.body = 'The user can\'t be deleted. An error "' + e.message + ' occured"';
  }
}).delete('/task', async function (ctx, next) {
  try {
    var result = await _controller2.default.deleteTask(2, 0);
    //const result = await methods.deleteTask(ctx.params);
    if (result === 404) {
      ctx.status = 404;
      result = 'Tasks are not found. Error 404';
    }
    ctx.body = result;
  } catch (e) {
    ctx.status = 500;
    ctx.body = e.message;
  }
}).put('/task', async function (ctx, next) {
  try {
    var result = await _controller2.default.updateTask(4, 0, 'Finish the curcash');
    //const result = await methods.pushTask(ctx.params);
    ctx.body = result;
  } catch (e) {
    ctx.status = 500;
    ctx.body = 'Task can\'t be updated';
  }
});

function routes() {
  return router.routes();
}