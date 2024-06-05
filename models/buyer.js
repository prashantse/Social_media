'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Buyer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Buyer.belongsTo(models.User, {
        foreignKey: 'userId'
      });
      Buyer.belongsTo(models.Product, {
        foreignKey: 'productId'
      });
    }
  }
  Buyer.init({
    productId:{ type:DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:'products',
        key:'id'
      }
    },
    userId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:'users',
        key:'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Buyer',
  });
  return Buyer;
};