'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('ProductVariants', 'variantName', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('ProductVariants', 'variantName', {
      type: Sequelize.ENUM('Home','Office'),
      allowNull: false,
    });
  },
};