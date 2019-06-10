'use strict';

import Router from 'koa-router';
import  methods from '../controller';

const router = new Router();

router
//Ready routes
.get('/', async (ctx, next) => {
  ctx.body = 'Authorisation page';
})
.get('/app', async (ctx, next) => {
  ctx.body = 'Main page';
})
.get('/records', async (ctx, next) => {
  try {
    const records = await methods.getAll();
    ctx.body = records;
  } catch(e) {
    ctx.status = 404;
    ctx.body = `Records can't be found. An error "${e.message}" occured`;
  }
})
.get('/record/id=:id', async (ctx, next) => {
  try {
    const record = await methods.getUser(ctx.params.id);
    ctx.body = record;
  } catch(e) {
    ctx.status = 404;
    ctx.body = e.message;
  }
})
.get('/tasks/id=:id', async (ctx, next) => {
  try {
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
.post('/user', async(ctx, next) => {
  try {
    //const result = await methods.pushUser({name: 'Test', login: 'test10', password: '11111111', tasks: ['Test']});
    const result = await methods.pushUser(ctx.params);
    ctx.body = `A new user is inserted`;
  } catch(e) {
    ctx.status = 500;
    ctx.body = `A new user can't be pushed. An error "${e.message}" occured`;
  }
})
.delete('/user/id=:id', async(ctx, next) => {
  try {
    //const result = await methods.deleteUser({id : 10, name: 'test8', login: 'postpost', password: '11111111'});
    const result = await methods.deleteUser(ctx.params.id);
    ctx.body = result;
  } catch(e) {
    ctx.status = 500;
    ctx.body = `The user can't be deleted. An error "${e.message} occured"`;
  }
})
.delete('/task', async (ctx, next) => {
  try {
    let result = await methods.deleteTask(2, 0);
    //const result = await methods.deleteTask(ctx.params);
    if (result === 404) {
      ctx.status = 404;
      result = 'Tasks are not found. Error 404'
    }
    ctx.body = result;
  } catch(e) {
    ctx.status = 500;
    ctx.body = e.message;
  }
})
.put('/task', async (ctx, next) => {
  try {
    const result = await methods.updateTask(4, 0, 'Finish the curcash');
    //const result = await methods.pushTask(ctx.params);
    ctx.body = result;
  } catch(e) {
    ctx.status = 500;
    ctx.body = `Task can't be updated`;
  }
});


export function routes () { return router.routes() }