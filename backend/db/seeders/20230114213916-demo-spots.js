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
        address: '123 Wonder Blvd.',
        city: 'Paradise Island',
        state: 'Themyscira',
        country: 'US',
        lat: 11.11,
        lng: 11.11,
        name: 'House#1',
        description: 'This is the 1st airbnb house',
        price: 100.11,
      },
      {
        ownerId: 2,
        address: '210 Batcave Pl.',
        city: 'Gotham City',
        state: 'New York',
        country: 'US',
        lat: 22.22,
        lng: 22.22,
        name: 'House#2',
        description: 'This is the 2nd airbnb house',
        price: 200,
      },
      {
        ownerId: 3,
        address: '321 Flash Dr.',
        city: 'Central City',
        state: 'Missouri',
        country: 'US',
        lat: 33.33,
        lng: 33.33,
        name: 'House#3',
        description: 'This is the 3rd airbnb house',
        price: 39.99,
      },
      {
        ownerId: 4,
        address: '432 Mandalorian Way.',
        city: 'Metairie',
        state: 'Louisiana',
        country: 'US',
        lat: 44.44,
        lng: 44.44,
        name: 'House#4',
        description: 'This is the 4th airbnb house',
        price: 400,
      },
      {
        ownerId: 5,
        address: '543 SupermanLois Ln.',
        city: 'Metropolis',
        state: 'Illinois',
        country: 'US',
        lat: 55.55,
        lng: 55.55,
        name: 'House#5',
        description: 'This is the 5th airbnb house',
        price: 500,
      },

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {});
  }
};
