'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Decant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relación: Decant pertenece a Perfume
      Decant.belongsTo(models.Perfume, {
        foreignKey: 'perfume_id',
        as: 'perfume', // Alias
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
      tableName: 'Decants', // Opcional si quieres forzar el nombre de la tabla
      timestamps: true, // Para createdAt y updatedAt
    }
  );

  return Decant;
};