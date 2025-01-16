'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Proveedor extends Model {
    /**
     * Helper method for defining associations.
     * Este método define relaciones del modelo
     */
    static associate(models) {
      // Relación: Proveedor tiene muchos Perfumes
      Proveedor.hasMany(models.Perfume, {
        foreignKey: 'proveedor_id',
        as: 'perfumes', // Alias para la relación
      });
    }
  }

  Proveedor.init(
    {
      nombre_proveedor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      numero_contacto: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[0-9]{8,15}$/,
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'Proveedor',
      tableName: 'Proveedores',
      timestamps: true,
    }
  );

  return Proveedor;
};