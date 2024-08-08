'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductVariant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {


    }
  }
  ProductVariant.init({
    value: DataTypes.STRING,
    variantName: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'ProductVariant',
  });
  return ProductVariant;
};