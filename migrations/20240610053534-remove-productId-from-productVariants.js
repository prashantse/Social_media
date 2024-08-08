
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('ProductVariants', 'productId');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('ProductVariants', 'productId', {
      type: Sequelize.TEXT,
      allowNull: false
    });
  }
};
