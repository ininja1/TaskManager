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
  getAll: async function getAll() {
    var data = await client.query('SELECT * FROM users');
    return data.rows;
  }
};

exports.default = methods;