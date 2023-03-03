'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
    {
      userId: 1,
      spotId: 1,
      review: 'this place is aesthetically pleasing',
      stars: 4.5
    },
    {
      userId: 1,
      spotId: 2,
      review: 'beautiful but expensive',
      stars: 2.5
    },
    {
      userId: 2,
      spotId: 2,
      review: 'this place is gloomy',
      stars: 1.5
    },
    {
      userId: 3,
      spotId: 3,
      review: 'from here, the attractions are quick to get to',
      stars: 3.7
    },
    {
      userId: 4,
      spotId: 3,
      review: 'this place is awesome',
      stars: 4.7
    },
    {
      userId: 5,
      spotId: 5,
      review: 'this place is super',
      stars: 5.0
    },
   {
      userId: 1,
      spotId: 4,
      review: 'so cozy, will definitely be back',
      stars: 4.2
    }

  ], {});
},
down: async (queryInterface, Sequelize) => {
  options.tableName = 'Reviews';
  const Op = Sequelize.Op;
  return queryInterface.bulkDelete(options, null, {});
}
};
