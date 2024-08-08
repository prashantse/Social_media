'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Categories', 'parantId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'Categories',
        key: 'id',
      },
      onUpdate: 'NO ACTION',
      onDelete: 'NO ACTION',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Categories', 'parantId');
  }
};