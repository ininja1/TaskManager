'use strict';

import Router from 'koa-router';
import  methods from '../controller';

const router = new Router();

router
//Ready routes
.get('/', async (ctx, next) => { //Tested
  ctx.body = 'Authorisation page';
})
.get('/app', async (ctx, next) => { //Tested
  ctx.body = 'Main page';
})
.get('/records', async (ctx, next) => { //Tested
  try {
    const records = await methods.getAll();
    ctx.body = records;
  } catch(e) {
    ctx.status = 404;
    ctx.body = `Records can't be found. An error "${e.message}" occured`;
  }
})
.get('/record/id=:id', async (ctx, next) => { //Tested
  try {
    const record = await methods.getUser(ctx.params.id);
    ctx.body = record;
  } catch(e) {
    ctx.status = 404;
    ctx.body = e.message;
  }
})
.get('/tasks/id=:id', async (ctx, next) => {
  try { //Tested
    const tasks = await methods.getTasks(ctx.params.id);
    ctx.body = tasks;
  } catch(e) {
    ctx.status = 404;
    ctx.body = `An error occured: "${e.message}"`;
  }
})
.get('*', async (ctx, next) => {
  ctx.body = `The page for url: ${ctx.url} is unreacheble`;
  ctx.status = 404;
})
.post('/user/name=:name&log=:log&pass=:pass', async(ctx, next) => { //Tested
  try {
    const result = await methods.pushUser(ctx.params);
    ctx.body = `A new user is inserted`;
  } catch(e) {
    ctx.status = 500;
    ctx.body = `A new user can't be pushed. An error "${e.message}" occured`;
  }
})
.post('/task/id=:id&newtask=:newtask', async (ctx, next) => { //Tested
  try {
    const result = await methods.pushTask(ctx.params);
    ctx.body = result;
  } catch(e) {
    ctx.status = 500;
    ctx.body = `${e.message}`;
  }

})
.delete('/user/id=:id', async(ctx, next) => { //Tested
  try {
    const result = await methods.deleteUser(ctx.params.id);
    ctx.body = result;
  } catch(e) {
    ctx.status = 500;
    ctx.body = `The user can't be deleted. An error "${e.message} occured"`;
  }
})
.delete('/task/id=:id&ind=:ind', async (ctx, next) => { //Tested
  try {
    const result = await methods.deleteTask(ctx.params);
    ctx.body = result;
  } catch(e) {
    ctx.status = 500;
    ctx.body = e.message;
  }
})
.put('/task/id=:id&ind=:ind&newtask=:newtask', async (ctx, next) => { //Tested
  try {
    const result = await methods.updateTask(ctx.params);
    ctx.body = result;
  } catch(e) {
    ctx.status = 500;
    ctx.body = `${e.message}`;
  }
});


export function routes () { return router.routes() }