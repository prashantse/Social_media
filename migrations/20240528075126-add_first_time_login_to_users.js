'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'firstTimeLogin', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true // Set default value to true (user is logging in for the first time)
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'firstTimeLogin');
  }
};
