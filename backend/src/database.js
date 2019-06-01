'use strict';

const mybase = [{
  id: 0,
  name: 'test',
  tasks: ['Test task 1', 'Test task 2', 'Test task 3']
}, 
{
  id: 1,
  name: 'Shems',
  tasks: ['Provide the communism ideas' , 'Otchislit all of the govnocoders', 'Vzlomat vibori']
}];

const methods = {
  getRecords: async () => {
    let result = ``;
    mybase.forEach(obj => {
      result += `id : ${obj.id} | name : ${obj.name} | tasks: ${obj.tasks} \n`;
    });
    return result;
  },

  getRecord : async (id) => {
    const record = mybase[Number(id)];
      const result = `id : ${record.id} | name : ${record.name} | ${record.tasks}`;
      return result;
  },
};

export default methods;