'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Addresses', 'phoneNo', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Addresses', 'phoneNo', {
      type: Sequelize.ENUM('Home','Office'),
      allowNull: false,
    });
  },
};