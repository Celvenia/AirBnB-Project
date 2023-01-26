'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    toSafeObject() {
      const {id, userId, spotId, review, stars} = this
      return {id, userId, spotId, review, stars}
    }

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.Spot, {foreignKey: 'spotId', onDelete: 'CASCADE'})
      Review.belongsTo(models.User, {foreignKey: 'userId', onDelete: 'CASCADE'})
      Review.hasMany(models.ReviewImage, {foreignKey: 'reviewId', onDelete: 'CASCADE'})
    }
  }
  Review.init({
    userId: {
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE'

    },
    spotId:{
      type: DataTypes.INTEGER,
      onDelete: 'CASCADE'
    },
    review: {
      type:DataTypes.STRING,
    },
    stars: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Review',
    // defaultScope: {
    //   attributes: {
    //     exclude: ["createdAt", "updatedAt"]
    //   }
    // },
  });
  return Review;
};
