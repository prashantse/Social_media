'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Brands', 'addedBy');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Brands', 'addedBy', {
      type: Sequelize.TEXT,
      allowNull: false
    });
  }
};

