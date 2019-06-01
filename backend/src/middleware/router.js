import Router from 'koa-router';

const router = new Router();

router
.get('/', async (ctx, next) => {
  ctx.body = 'Authorisation page';
})
.get('/app', async (ctx, next) => {
  ctx.body = 'Main page';
});

export function routes () { return router.routes() };