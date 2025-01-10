'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    static associate(models) {
      // Asociaciones futuras (ejemplo: Cliente tiene muchas Ventas)
      Cliente.hasMany(models.Venta, {
        foreignKey: 'cliente_id',
        as: 'ventas',
      });
    }
  }

  Cliente.init(
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
        allowNull: true,
        validate: {
          isEmail: true, // Validar formato de correo
        },
      },
    },
    {
      sequelize,
      modelName: 'Cliente',
      tableName: 'Clientes',
    }
  );

  return Cliente;
};