'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
 
    static associate(models) {
      Cart.belongsTo(models.User, {
        foreignKey: 'userId'
      });
      Cart.belongsTo(models.Product, {
        foreignKey: 'productId'
      });
      Cart.belongsTo(models.ProductVariant, {
        foreignKey: 'productVarientId'
      });
    }
  }
  Cart.init({
    quantity: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    productVarientId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};