'use strict';

// const { Model, Validator } = require('sequelize');
// const bcrypt = require('bcryptjs');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    toSafeObject() {
      const {id, ownerId, address, city, state, country, lat, lng, name, description, price, avgRating, previewImage } = this
      return {id, ownerId, address, city, state, country, lat, lng, name, description, price, avgRating, previewImage }
    }

    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, {foreignKey: 'id', as: 'Owner'})
      Spot.hasMany(models.Review, {foreignKey: 'spotId', onDelete: 'CASCADE'})
      Spot.hasMany(models.SpotImage, {foreignKey: 'spotId', onDelete: 'CASCADE'})
      Spot.hasMany(models.Booking, {foreignKey: 'spotId', onDelete: 'CASCADE'})
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER
    },
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    lat: DataTypes.DECIMAL,
    lng: DataTypes.DECIMAL,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    previewImage: DataTypes.STRING 
  }, {
    sequelize,
    modelName: 'Spot',
      // defaultScope: {
      //   attributes: {
      //     exclude: ["createdAt", "updatedAt"]
      //   }
      // },
  });
  return Spot;
};
