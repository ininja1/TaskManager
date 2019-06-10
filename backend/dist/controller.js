'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pg = require('pg');

var _pg2 = _interopRequireDefault(_pg);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var conString = "postgres://postgres:postgres@localhost:5432/taskmanager";
var client = new _pg2.default.Client(conString);
client.connect();

var methods = {
  //Pulls out all of the existing users
  getAll: async function getAll() {
    var _ref = await client.query('SELECT * FROM users'),
        rows = _ref.rows;

    var str = '';
    rows.forEach(function (obj) {
      for (var key in obj) {
        str += key + ' : ' + obj[key] + '\n';
      }
      str += '\n\n';
    });
    if (str.length <= 1) {
      throw new Error('There are no users');
    }
    return str;
  },

  //Pulls out all the UserInfo
  getUser: async function getUser(id) {
    var _ref2 = await client.query('SELECT * FROM users WHERE id=$1', [id]),
        rows = _ref2.rows;

    var str = '';
    for (var key in rows[0]) {
      str += key + ' : ' + rows[0][key] + '\n';
    }
    if (str.length <= 1) {
      throw new Error('The user with id: ' + id + ' doesn\'t exist');
    }
    return str;
  },

  //Pulls out the task array with id
  getTasks: async function getTasks(id) {
    var queryString = 'SELECT tasks FROM users WHERE (id = $1)';

    var _ref3 = await client.query(queryString, [id]),
        rows = _ref3.rows;

    try {
      var tasks = rows[0].tasks;
      return tasks;
    } catch (e) {
      throw new Error('There are no tasks with the id : ' + id);
    }
  },

  //Deletes user with id
  pushUser: async function pushUser(params) {
    var name = params.name,
        login = params.login,
        password = params.password,
        tasks = params.tasks;

    var queryString = 'INSERT INTO users (name, login, password, tasks) VALUES ($1, $2, $3, $4)';
    var result = await client.query(queryString, [name, login, password, tasks]);
    return result;
  },

  //Deletes user with id
  deleteUser: async function deleteUser(id) {
    var queryString = 'DELETE FROM users WHERE (id = $1)';
    var result = await client.query(queryString, [id]);
    return result;
  },

  //Provides pushing new task into the db(Gets the array of existing tasks and )
  pushTask: async function pushTask(id, task) {
    var tasks = await methods.getTasks(id);
    tasks.unshift(task);
    var queryString = 'UPDATE users SET tasks = $1 WHERE (id = $2)';
    var result = await client.query(queryString, [tasks, id]);
    return result;
  },

  //Deletes task with id of user and task in the task array
  deleteTask: async function deleteTask(id, index) {
    var tasks = await methods.getTasks(id);
    if (!tasks || tasks.length === 0) return 404;
    tasks.splice(index, 1);
    var queryString = 'UPDATE users SET tasks = $1 WHERE (id = $2)';
    var result = await client.query(queryString, [tasks, id]);
    return result;
  },

  //Updates task with current id
  updateTask: async function updateTask(id, index, newtask) {
    var tasks = await methods.getTasks(id);
    tasks.splice(index, 1, newtask);
    var queryString = 'UPDATE users SET tasks = $1 WHERE (id = $2)';
    var result = await client.query(queryString, [tasks, id]);
    return result;
  }
};

exports.default = methods;