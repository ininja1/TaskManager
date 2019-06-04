'use strict';

import Koa from 'koa';
import koa_static from 'koa-static';
import config from './config.js';
import err from './middleware/error.js';
import { routes } from './middleware/router.js';

const app = new Koa();

app.use(err);
app.use(routes());
app.use(koa_static('./build'));

app.listen(config.port);