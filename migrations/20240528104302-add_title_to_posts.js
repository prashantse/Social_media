'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Posts', 'title', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: "Title Of The Post"
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Posts', 'title');
  }
};
