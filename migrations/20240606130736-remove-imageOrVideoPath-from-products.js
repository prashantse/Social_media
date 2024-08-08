'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // No need to define up migration as data migration is handled in the previous step
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Products', 'imageOrVideoPath');
  }
};
