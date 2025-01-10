'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Perfumes', 'proveedor_id', {
      type: Sequelize.INTEGER,
      allowNull: true, // Permitir valores NULL al principio
      references: {
        model: 'Proveedores', // Nombre de la tabla de proveedores
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL', // Si se elimina el proveedor, esta columna será NULL
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Perfumes', 'proveedor_id');
  },
};