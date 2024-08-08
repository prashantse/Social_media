'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wishlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Wishlist.belongsTo(models.User, {
        foreignKey: 'userId'
      });
      Wishlist.belongsTo(models.Product, {
        foreignKey: 'productId'
      });
      Wishlist.belongsTo(models.ProductVariant, {
        foreignKey: 'productVarientId'
      });
    }
  }
  Wishlist.init({
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    productVarientId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Wishlist',
  });
  return Wishlist;
};