'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      TransactionDetail.belongsTo(models.Order, {
        foreignKey: 'orderId'
      });
    }
  }
  TransactionDetail.init({
    paymentMethod: DataTypes.STRING,
    paymentStatus: DataTypes.STRING,
    transactionId: DataTypes.STRING,
    orderId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TransactionDetail',
  });
  return TransactionDetail;
};