'use strict';
const moment = require('moment');
const generationHash = () => {
  let hash =[];
  let matrix = ['1','2','3','4','5','6','7','8','9','0'];
  let letters = ['a','b','c','d','e','f','g','j','x','z','A','B','C','D','E','F','G','J','X','Z'];
  for (let i=0; i < 12;i++) {
    hash.push(matrix[getRndInteger(0,9)])
    hash.push(letters[getRndInteger(0,19)])
  }
  hash = hash.reduce((res, item) => res + item, '')
  return hash;
}

const generationName = () => {
  let name =[];
  let matrix = ['1','2','3','4','5','6','7','8','9','0'];
  let letters = ['a','b','c','d','e','f','g','j','x','z','A','B','C','D','E','F','G','J','X','Z'];
  name.push(`r${matrix[getRndInteger(0,9)]}x_`)
  for (let i=0; i < 2;i++) {
    name.push(matrix[getRndInteger(0,9)])
    name.push(letters[getRndInteger(0,19)])
  }
  name = name.reduce((res, item) => res + item, '')
  return name;
}

const getRndInteger = (min,max) => {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

const generateRigs = () => {
  let ArrayRigs = [];
  let now = moment().format("YYYY-MM-DD HH:mm");
  for (let i = 0; i < 163; i++) {
    let last_online = moment().subtract(getRndInteger(1,23),'hours').subtract(getRndInteger(1,50),'days').format("YYYY-MM-DD HH:mm")
    let last_offline = moment(last_online).subtract(getRndInteger(1,2),'minutes').format("YYYY-MM-DD HH:mm")
    ArrayRigs.push({
      name_rig: generationName(),
      token: generationHash(),
      email: 'minerwatcher@com.ru',
      status:'on',
      // status: (getRndInteger(1,2) === 1) ? 'on' : 'off',
      temp_min: 60,
      temp_max: 75,
      last_online, // Последний раз когда карта была онлайн
      online_time: moment().subtract(2,'minutes').format("YYYY-MM-DD HH:mm"), // записываем  сюда время если карта при опросе была онлайн
      last_offline, // Последний раз когда карта была онлайн
      offline_time: moment().subtract(2,'minutes').format("YYYY-MM-DD HH:mm"), // записываем  сюда время если карта при опросе стала офлайн
      last_update: moment().subtract(1,'minutes').format("YYYY-MM-DD HH:mm"), // разница во времени
      // last_update: moment().subtract(getRndInteger(4,8),'minutes').format("YYYY-MM-DD HH:mm"),
      temp_arr: [getRndInteger(60,75),getRndInteger(60,75),getRndInteger(60,75),getRndInteger(60,75),getRndInteger(60,75),getRndInteger(60,75)].toString(),
      createdAt: now,
      updatedAt: now
    })
  }
  return ArrayRigs;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
      await queryInterface.bulkInsert('My_rigs',generateRigs())
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('My_rigs',null, {})
  }
};
