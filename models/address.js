'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Address.belongsTo(models.User, {
        foreignKey: 'userId'
      });
      Address.hasMany(models.Order, {
        foreignKey: 'addressId'
      });
    }
  }
  Address.init({
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING,
    country: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    phoneNo: DataTypes.INTEGER,
    addressType:  DataTypes.ENUM('Home', 'Office'),
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};