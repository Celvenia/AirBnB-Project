'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReviewImage extends Model {
    toSafeObject() {
      const {id, reviewId, url} = this
      return {id, reviewId, url}
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ReviewImage.belongsTo(models.Review, {foreignKey: 'id', onDelete: 'CASCADE',  hooks: true})
    }
  }
  ReviewImage.init({
    reviewId: DataTypes.INTEGER,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ReviewImage',
  });
  return ReviewImage;
};
