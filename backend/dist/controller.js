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
    var _ref = await client.query('SELECT * FROM users'),
        rows = _ref.rows;

    var str = '';
    rows.forEach(function (obj) {
      for (var key in obj) {
        str += key + ' : ' + obj[key] + '\n';
      }
      str += '\n\n';
    });
    return str;
  },

  getUser: async function getUser(id) {
    var _ref2 = await client.query('SELECT * FROM users WHERE id=$1', [id]),
        rows = _ref2.rows;

    var str = '';
    for (var key in rows[0]) {
      str += key + ' : ' + rows[0][key] + '\n';
    }
    return str;
  }
};

exports.default = methods;