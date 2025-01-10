'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Proveedor extends Model {
    static associate(models) {
      // Asociaciones futuras (ejemplo: Proveedor tiene muchos Perfumes)
      Proveedor.hasMany(models.Perfume, {
        foreignKey: 'proveedor_id',
        as: 'perfumes',
      });
    }
  }

  Proveedor.init(
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      numero_contacto: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[0-9]{8,15}$/, // Validar formato numérico y longitud razonable
        },
      },
    },
    {
      sequelize,
      modelName: 'Proveedor',
      tableName: 'Proveedores',
    }
  );

  return Proveedor;
};