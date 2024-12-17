'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Decant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Decant.init({
    perfume_id: DataTypes.INTEGER,
    cantidad: DataTypes.INTEGER,
    maleta_destino: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Decant',
  });
  return Decant;
};