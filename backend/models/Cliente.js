'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    static associate(models) {
      Cliente.hasMany(models.Venta, {
        foreignKey: 'cliente_id',
        as: 'ventas',
      });
    }
  }

  Cliente.init(
    {
      nombre_completo: { // Ajustar al nombre correcto
        type: DataTypes.STRING,
        allowNull: false,
      },
      numero_celular: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^[0-9]{8,15}$/, // Validar formato
        },
      },
      correo: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isEmail: true,
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