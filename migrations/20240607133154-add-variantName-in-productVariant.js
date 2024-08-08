
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('ProductVariants', 'variantName', {
      type: Sequelize.ENUM('Home','Office'),
      allowNull: false,
      defaultValue: 'Home'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('ProductVariants', 'variantName');
  }
};
// npx sequelize-cli migration:generate --name add-variantName-in-productVariant