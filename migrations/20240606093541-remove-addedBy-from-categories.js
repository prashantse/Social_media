'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Categories', 'addedBy');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Categories', 'addedBy', {
      type: Sequelize.TEXT,
      allowNull: false
    });
  }
};
