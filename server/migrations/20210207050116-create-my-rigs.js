'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('My_rigs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name_rig: {
        type: Sequelize.STRING
      },
      token: {
        type: Sequelize.STRING,
        unique: true
      },
      email: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING
      },
      toogle_status_on: {
        type: Sequelize.BOOLEAN
      },
      toogle_status_off: {
        type: Sequelize.BOOLEAN
      },
      temp_min: {
        type: Sequelize.INTEGER
      },
      temp_max: {
        type: Sequelize.INTEGER
      },
      online_time: {
        type: Sequelize.DATE
      },
      offline_time: {
        type: Sequelize.DATE
      },
      last_update: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('My_rigs');
  }
};