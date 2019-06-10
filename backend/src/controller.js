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
      return tasks;
    } catch(e) {
      throw new Error(`There are no tasks with the id : ${id}`);
    }
    },

  //Deletes user with id
  pushUser : async (params) => {
    const { name, login, password, tasks } = params;
    const queryString = `INSERT INTO users (name, login, password, tasks) VALUES ($1, $2, $3, $4)`;
    const result = await client.query(queryString, [name, login, password, tasks]);
    return result;
  },

  //Deletes user with id
  deleteUser : async(id) => {
    const queryString = `DELETE FROM users WHERE (id = $1)`;
    const result = await client.query(queryString, [id]);
    return result;
  },

  //Provides pushing new task into the db(Gets the array of existing tasks and )
  pushTask : async(id, task) => { 
    const tasks = await methods.getTasks(id);
    tasks.unshift(task);
    const queryString = `UPDATE users SET tasks = $1 WHERE (id = $2)`;
    const result = await client.query(queryString, [tasks, id]);
    return result;
  },

  //Deletes task with id of user and task in the task array
  deleteTask : async(id, index) => {
    const tasks = await methods.getTasks(id);
    if (!tasks || tasks.length === 0) return 404;
    tasks.splice(index, 1);
    const queryString = `UPDATE users SET tasks = $1 WHERE (id = $2)`;
    const result = await client.query(queryString, [tasks, id]);
    return result;
  },

  //Updates task with current id
  updateTask : async (id, index, newtask) => {
    const tasks = await methods.getTasks(id);
    tasks.splice(index, 1, newtask);
    const queryString = `UPDATE users SET tasks = $1 WHERE (id = $2)`;
    const result = await client.query(queryString, [tasks, id]);
    return result;
  }  
};

export default methods;