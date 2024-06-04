'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'refreshToken');
  },

  down: async (queryInterface, Sequelize) => {
    // To revert the removal of the column, you need to specify the data type and any other properties
    await queryInterface.addColumn('Users', 'refreshToken', {
      type: Sequelize.STRING, // Change this to the original data type of the column
      allowNull: true,        // Change this based on whether the column allowed null values
      // any other properties the column had before it was removed
    });
  }
};
