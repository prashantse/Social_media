'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.hasMany(models.Product, {
        foreignKey: 'categoryId'
      });
      Category.belongsTo(models.User, {
        foreignKey: 'addedBy'
      });
      Category.hasMany(models.Category, {
        foreignKey: 'parantId'
      });

    }
  }
  Category.init({
    categoryName: DataTypes.STRING,
    addedBy:DataTypes.INTEGER,
    parantId:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};