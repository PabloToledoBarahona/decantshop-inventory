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
        onDelete: 'SET NULL', // Establece el proveedor como null si se elimina
        onUpdate: 'CASCADE', // Actualiza automáticamente la relación
      });
    }
  }

  Perfume.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      total_ml: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0, // Validar que no sea negativo
        },
      },
      remaining_ml: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [['nuevo', 'parcial', 'vendido']], // Solo permite estos valores
        },
      },
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