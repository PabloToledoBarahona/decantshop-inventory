'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Venta extends Model {
    static associate(models) {
      // Relación: Venta pertenece a un Cliente
      Venta.belongsTo(models.Cliente, {
        foreignKey: 'cliente_id',
        as: 'cliente',
      });
    }
  }

  Venta.init(
    {
      fecha: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      monto_total: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      estado: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      detalles: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Venta',
      tableName: 'Ventas',
      timestamps: true,
    }
  );

  return Venta;
};