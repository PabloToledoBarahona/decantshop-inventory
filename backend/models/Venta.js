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

      // Relación: Venta pertenece a un Vendedor
      Venta.belongsTo(models.Vendedor, {
        foreignKey: 'vendedor_id',
        as: 'vendedor',
      });

      // Relación ventasDecants
      Venta.belongsToMany(models.Decant, {
        through: 'VentasDecants',
        foreignKey: 'venta_id',
        otherKey: 'decant_id',
        as: 'decants',
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