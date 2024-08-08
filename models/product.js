'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.User, {
        foreignKey: 'sellerId'
      });
      Product.belongsTo(models.Brand, {
        foreignKey: 'brandId'
      });
      Product.belongsTo(models.Category, {
        foreignKey: 'categoryId'
      });
      Product.belongsTo(models.ProductVariant, {
        foreignKey: 'variantId'
      });
    }
  }
  Product.init({
    name: DataTypes.STRING,
    variantId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'ProductVariants',
        key: 'id',
      },
    },
    sellerId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    brandId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Brands',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',

    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Categories',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    price: {
      type: DataTypes.FLOAT,
      validate: {
        min: 0
      },
      allowNull: false
    },
    productsImagesAndVideos: DataTypes.ARRAY(DataTypes.STRING),
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Categories',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },

    stock: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};