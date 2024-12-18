'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Decant extends Model {
    static associate(models) {
      Decant.belongsTo(models.Perfume, {
        foreignKey: 'perfume_id',
        as: 'associatedPerfume', // Alias único para evitar conflictos
      });
    }
  }

  Decant.init(
    {
      perfume_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      maleta_destino: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Decant',
      tableName: 'Decants',
      timestamps: true,
    }
  );

  return Decant;
};