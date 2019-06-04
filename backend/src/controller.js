'use strict';

import pg from 'pg';

const conString = "postgres://postgres:postgres@localhost:5432/taskmanager";
const client = new pg.Client(conString);
client.connect();

const methods = {
  getAll: async () => {
    const { rows } = await client.query('SELECT * FROM users');
    let str = '';
    rows.forEach(obj => {
     for (let key in obj) {
        str += `${key} : ${obj[key]}\n`;
      }
      str += '\n\n';
    })
      return str;
    },

  getUser : async (id) => {
    const { rows } = await client.query('SELECT * FROM users WHERE id=$1', [id]);
    let str = '';
    for (let key in rows[0]) {
      str += `${key} : ${rows[0][key]}\n`;
    }
    return str;
    }
};

export default methods;