'use strict';

import pg from 'pg';

const conString = "postgres://postgres:postgres@localhost:5432/taskmanager";
const client = new pg.Client(conString);
client.connect();

const methods = {
  //Pulls out all of the existing users
  getAll: async () => {
    const { rows } = await client.query('SELECT * FROM users');
    let str = '';
    rows.forEach(obj => {
     for (let key in obj) {
        str += `${key} : ${obj[key]}\n`;
      }
      str += '\n\n';
    })
      if (str.length <= 1) {
        throw new Error(`There are no users`);
      }
      return str;
    },

  //Pulls out all the UserInfo
  getUser : async (id) => {
    const { rows } = await client.query('SELECT * FROM users WHERE id=$1', [id]);
    let str = '';
    for (let key in rows[0]) {
      str += `${key} : ${rows[0][key]}\n`;
    }
    if (str.length <= 1) {
      throw new Error(`The user with id: ${id} doesn't exist`);
    }
    return str;
    },

    //Pulls out the task array with id
    getTasks : async(id) => {
    const queryString = `SELECT tasks FROM users WHERE (id = $1)`;
    const { rows } = await client.query(queryString, [id]);
    try {
      const tasks = rows[0].tasks;
      return tasks.join(', ');
    } catch(e) {
      throw new Error(`There are no tasks with the id : ${id}`);
    }
    },

  //Pushes new user
  pushUser : async (params) => {
    const { name, log, pass} = params;
    const queryString = `INSERT INTO users (name, login, password) VALUES ($1, $2, $3)`;
    const result = await client.query(queryString, [name, log, pass]);
    return result;
  },

  //Pushes new task with precise id
  pushTask : async (params) => {
    const { id, newtask } = params;
    let tasks = await methods.getTasks(id);
    if (tasks) {
      tasks.push(newtask);
    } else {
      tasks = [newtask];
    }
    const queryString = `UPDATE users SET tasks = $1 WHERE (id = $2)`;
    const result = client.query(queryString, [tasks, Number(id)]);
    return result;
  },

  //Deletes user with id
  deleteUser : async(id) => {
    const queryString = `DELETE FROM users WHERE (id = $1)`;
    const result = await client.query(queryString, [id]);
    return result;
  },

  //Deletes task with id of user and task in the task array
  deleteTask : async(params) => {
    const { id, ind } = params;
    const tasks = await methods.getTasks(id);
    if (typeof task === 'null' || tasks.length === 0) {
      throw new Error(`There are not tasks with the users id : ${id}`);
    };
    tasks.splice(ind, 1);
    const queryString = `UPDATE users SET tasks = $1 WHERE (id = $2)`;
    const result = await client.query(queryString, [tasks, id]);
    return result;
  },

  //Updates task with current id
  updateTask : async (params) => {
    const { id, ind, newtask } = params;
    let tasks = await methods.getTasks(id);
    if (tasks) {
      tasks.splice(ind, 1, newtask);
    } else {
      throw new Error(`Tasks are absent with id: ${id}`);
    }
    const queryString = `UPDATE users SET tasks = $1 WHERE (id = $2)`;
    const result = await client.query(queryString, [tasks, id]);
    return result;
  }  
};

export default methods;