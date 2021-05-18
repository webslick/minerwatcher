'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Temp_rigs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Temp_rigs.init({
    toogle_total_temp: DataTypes.STRING,
    total_temp_min: DataTypes.INTEGER,
    total_temp_max: DataTypes.INTEGER,
    site_status_has_block: DataTypes.STRING,
    mode_auto: DataTypes.STRING,
    status_mode: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Temp_rigs',
  });
  return Temp_rigs;
};