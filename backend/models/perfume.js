'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Perfume extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relación: Perfume tiene muchos Decants
      Perfume.hasMany(models.Decant, {
        foreignKey: 'perfume_id',
        as: 'decants', // Alias para la relación
      });

      // Relación: Perfume pertenece a un Proveedor
      Perfume.belongsTo(models.Proveedor, {
        foreignKey: 'proveedor_id',
        as: 'proveedor', // Alias para la relación
      });
    }
  }

  Perfume.init(
    {
      name: DataTypes.STRING,
      total_ml: DataTypes.INTEGER,
      remaining_ml: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Perfume',
      tableName: 'Perfumes',
      timestamps: true,
    }
  );

  return Perfume;
};