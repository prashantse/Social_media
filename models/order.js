'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.User, {
        foreignKey:'sellerId'
      });
      Order.belongsTo(models.User, {
        foreignKey: 'buyerId'
      });

      Order.belongsTo(models.Address, {
        foreignKey: 'addressId'
      });

    }
  }
  Order.init({
    status: DataTypes.STRING,
    sellerId: DataTypes.INTEGER,
    buyerId: DataTypes.INTEGER,
    
    orderNumber: DataTypes.INTEGER,
    totalAmount: DataTypes.FLOAT,
    discount: DataTypes.FLOAT,
    grossAmount: DataTypes.FLOAT,
    shippingCharge: DataTypes.FLOAT,
    netAmount: DataTypes.FLOAT,
    paymentStatus: DataTypes.STRING,
    addressId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};