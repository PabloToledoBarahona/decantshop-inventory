module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Ventas', 'monto_pagado', {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 0,
    });
    await queryInterface.addColumn('Ventas', 'saldo', {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 0,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Ventas', 'monto_pagado');
    await queryInterface.removeColumn('Ventas', 'saldo');
  },
};