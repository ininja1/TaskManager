'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var mybase = [{
  id: 0,
  name: 'test',
  tasks: ['Test task 1', 'Test task 2', 'Test task 3']
}, {
  id: 1,
  name: 'Shems',
  tasks: ['Provide the communism ideas', 'Otchislit all of the govnocoders', 'Vzlomat vibori']
}];

var methods = {
  getRecords: async function getRecords() {
    var result = '';
    mybase.forEach(function (obj) {
      result += 'id : ' + obj.id + ' | name : ' + obj.name + ' | tasks: ' + obj.tasks + ' \n';
    });
    return result;
  },

  getRecord: async function getRecord(id) {
    var record = mybase[Number(id)];
    var result = 'id : ' + record.id + ' || name : ' + record.name;
    return result;
  }
};

exports.default = methods;