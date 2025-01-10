module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Perfumes', 'proveedor_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Proveedores', // Nombre de la tabla Proveedores
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Perfumes', 'proveedor_id');
  },
};