'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Addresses', 'phoneNo', {
      type: Sequelize.BIGINT,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Addresses', 'phoneNo', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
};