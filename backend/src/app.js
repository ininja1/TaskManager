'use strict';
import Koa from 'koa';
import fs from 'fs';
import config from './config.js';
import err from './middleware/error.js';
import { routes } from './middleware/router.js';

const app = new Koa();

app.use(err);
app.use(routes());

app.listen(config.port);