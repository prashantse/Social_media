'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Addresses', 'addressType', {
      type: Sequelize.ENUM('Home','Office'),
      allowNull: false,
      defaultValue: 'Home'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Addresses', 'addressType');
  }
};
