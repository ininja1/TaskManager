'use strict';

const Koa = require('koa');

const app = new Koa();
app.use(await (ctx, next) => {
  ctx.body = 'Hello, Koa!';
});

app.listen(8080);