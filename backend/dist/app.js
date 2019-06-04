'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _config = require('./config.js');

var _config2 = _interopRequireDefault(_config);

var _error = require('./middleware/error.js');

var _error2 = _interopRequireDefault(_error);

var _router = require('./middleware/router.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _koa2.default();

app.use(_error2.default);
app.use((0, _router.routes)());
app.use((0, _koaStatic2.default)('./build'));

app.listen(_config2.default.port);