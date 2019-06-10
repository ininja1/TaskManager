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
      return tasks.join(', ');
    } catch (e) {
      throw new Error('There are no tasks with the id : ' + id);
    }
  },

  //Pushes new user
  pushUser: async function pushUser(params) {
    var name = params.name,
        log = params.log,
        pass = params.pass;

    var queryString = 'INSERT INTO users (name, login, password) VALUES ($1, $2, $3)';
    var result = await client.query(queryString, [name, log, pass]);
    return result;
  },

  //Pushes new task with precise id
  pushTask: async function pushTask(params) {
    var id = params.id,
        newtask = params.newtask;

    var tasks = await methods.getTasks(id);
    if (tasks) {
      tasks.push(newtask);
    } else {
      tasks = [newtask];
    }
    var queryString = 'UPDATE users SET tasks = $1 WHERE (id = $2)';
    var result = client.query(queryString, [tasks, Number(id)]);
    return result;
  },

  //Deletes user with id
  deleteUser: async function deleteUser(id) {
    var queryString = 'DELETE FROM users WHERE (id = $1)';
    var result = await client.query(queryString, [id]);
    return result;
  },

  //Deletes task with id of user and task in the task array
  deleteTask: async function deleteTask(params) {
    var id = params.id,
        ind = params.ind;

    var tasks = await methods.getTasks(id);
    if (typeof task === 'null' || tasks.length === 0) {
      throw new Error('There are not tasks with the users id : ' + id);
    };
    tasks.splice(ind, 1);
    var queryString = 'UPDATE users SET tasks = $1 WHERE (id = $2)';
    var result = await client.query(queryString, [tasks, id]);
    return result;
  },

  //Updates task with current id
  updateTask: async function updateTask(params) {
    var id = params.id,
        ind = params.ind,
        newtask = params.newtask;

    var tasks = await methods.getTasks(id);
    if (tasks) {
      tasks.splice(ind, 1, newtask);
    } else {
      throw new Error('Tasks are absent with id: ' + id);
    }
    var queryString = 'UPDATE users SET tasks = $1 WHERE (id = $2)';
    var result = await client.query(queryString, [tasks, id]);
    return result;
  }
};

exports.default = methods;