'use strict';

const Koa = require('koa');
const config = require('./config');

const app = new Koa();
app.use(async (ctx, next) => {
  ctx.body = 'Hello, Koa!';
  console.log(ctx);
});

app.listen(config.port);