'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.belongsTo(models.User, { foreignKey: 'userId' });
      Post.hasMany(models.Comment, { foreignKey: 'postId' });
      Post.hasMany(models.Like, { foreignKey: 'postId' });
      Post.hasMany(models.Share, { foreignKey: 'postId' });
    }
  }
  Post.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    contentType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mediaUrl: {
       type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Post',
    timestamps: true
  });
  return Post;
};
