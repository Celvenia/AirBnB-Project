'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '123 Parish Dr.',
        city: 'Ewa Beach',
        state: 'Hawaii',
        country: 'US',
        lat: 12.12,
        lng: 12.12,
        name: 'House',
        description: 'This is an airbnb house',
        price: 100.12,
        avgRating: 4.9,
        previewImage: 'something.url'
      }

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      address: { [Op.in]: ['123 Parish Dr.'] }
    }, {});
  }
};
