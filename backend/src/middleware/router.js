'use strict';

import Router from 'koa-router';
import  methods from '../controller';

const router = new Router();

router
.get('/', async (ctx, next) => {
  ctx.body = 'Authorisation page';
})
.get('/app', async (ctx, next) => {
  ctx.body = 'Main page';
})
.get('/records', async (ctx, next) => {
  const records = await methods.getAll();
  if (records) {
    ctx.body = records;
  } else {
    ctx.status = 404;
  }
});


export function routes () { return router.routes() };