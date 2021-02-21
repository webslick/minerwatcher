'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class My_rigs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  My_rigs.init({
    name_rig: DataTypes.STRING,
    token: DataTypes.STRING,
    email: DataTypes.STRING,
    status: DataTypes.STRING,
    temp_min: DataTypes.INTEGER,
    temp_max: DataTypes.INTEGER,
    last_online: DataTypes.DATE,
    online_time: DataTypes.DATE,
    last_offline: DataTypes.DATE,
    offline_time: DataTypes.DATE,
    last_update: DataTypes.DATE,
    temp_arr: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'My_rigs',
  });
  return My_rigs;
};