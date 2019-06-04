'use strict';

import pg from 'pg';

const conString = "postgres://postgres:postgres@localhost:5432/taskmanager";
const client = new pg.Client(conString);
client.connect();

const methods = {
  getAll: async () => {
    const data = await client.query('SELECT * FROM users');
    return data.rows;
  }
};

export default methods;