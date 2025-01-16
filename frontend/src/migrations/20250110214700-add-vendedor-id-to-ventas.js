'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Ventas', 'vendedor_id', {
      type: Sequelize.INTEGER,
      allowNull: true, // Permitir valores nulos temporalmente
      references: {
        model: 'Vendedores',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Ventas', 'vendedor_id');
  },
};