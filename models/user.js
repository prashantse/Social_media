'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Post, { foreignKey: 'userId' });
      User.hasMany(models.Comment, { foreignKey: 'userId' });
      User.hasMany(models.Like, { foreignKey: 'userId' });
      User.hasMany(models.Share, { foreignKey: 'userId' });
      User.belongsToMany(models.User, { as: 'Followers', through: 'Follows', foreignKey: 'followeeId' });
      User.belongsToMany(models.User, { as: 'Followees', through: 'Follows', foreignKey: 'followerId' });
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profileImage: {
      type: DataTypes.STRING
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: true
    },
    firstTimeLogin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    bio: {
      type: DataTypes.STRING
    },
    refreshToken:{
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'User',
    timestamps: true
  });
  return User;
};
