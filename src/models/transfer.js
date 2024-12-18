'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transfer extends Model {
    static associate(models) {
      // Asociar Transfer con Decant usando un alias único
      Transfer.belongsTo(models.Decant, { foreignKey: 'decant_id', as: 'relatedDecant' });
    }
  }

  Transfer.init(
    {
      decant_id: DataTypes.INTEGER,
      origen: DataTypes.STRING,
      destino: DataTypes.STRING,
      fecha: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Transfer',
    }
  );

  return Transfer;
};