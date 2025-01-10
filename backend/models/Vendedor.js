'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Vendedor extends Model {
    static associate(models) {
      // Asociaciones futuras (ejemplo: Vendedor tiene muchas Ventas)
      Vendedor.hasMany(models.Venta, {
        foreignKey: 'vendedor_id',
        as: 'ventas',
      });
    }
  }

  Vendedor.init(
    {
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      numero_celular: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[0-9]{8,15}$/, // Validar formato numérico y longitud razonable
        },
      },
      correo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true, // Validar formato de correo
        },
      },
    },
    {
      sequelize,
      modelName: 'Vendedor',
      tableName: 'Vendedores',
    }
  );

  return Vendedor;
};