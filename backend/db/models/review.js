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
      Review.belongsTo(models.Spot, {foreignKey: 'id'})
      Review.belongsTo(models.User, {foreignKey: 'id'})
      // Review.hasMany(models.ReviewImage, {foreignKey: 'id'})
    }
  }
  Review.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    spotId:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    review: DataTypes.STRING,
    stars: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
