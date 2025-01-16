'use strict';

module.exports = (sequelize, DataTypes) => {
  const VentasDecants = sequelize.define('VentasDecants', {
    venta_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Ventas',
        key: 'id',
      },
    },
    decant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Decants',
        key: 'id',
      },
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precio_unitario: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  });

  return VentasDecants;
};