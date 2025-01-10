'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Vendedor extends Model {
    static associate(models) {
      // Relación: Vendedor tiene muchas Ventas
      Vendedor.hasMany(models.Venta, {
        foreignKey: 'vendedor_id',
        as: 'ventas',
      });
    }
  }

  Vendedor.init(
    {
      nombre_completo: { // Cambiado a 'nombre_completo' para coincidir con la tabla
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
        allowNull: true, // En caso de que no siempre se tenga correo
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