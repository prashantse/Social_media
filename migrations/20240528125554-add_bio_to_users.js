'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'bio', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "hay I am  auser and i am living a wonderfull Life"
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'bio');
  }
};
