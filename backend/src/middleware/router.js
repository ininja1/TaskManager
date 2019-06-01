'use strict';

import Router from 'koa-router';
import Body from 'koa-body';
import convert from 'koa-convert';
import  methods from '../database.js';

const router = new Router();
const koaBody = convert(new Body());

router
.get('/', async (ctx, next) => {
  ctx.body = 'Authorisation page';
})
.get('/app', async (ctx, next) => {
  ctx.body = 'Main page';
})
.get('/records', async (ctx, next) => {
  const records = await methods.getRecords();
  if (records) {
    ctx.body = records;
  } else {
    ctx.status = 404;
  }
})
.get('/record/:id', async (ctx, next) => {
  const record = await methods.getRecord(ctx.params.id);
  if (record) {
    ctx.body = record;
  } else {
    ctx.status = 404;
  }
});

export function routes () { return router.routes() };