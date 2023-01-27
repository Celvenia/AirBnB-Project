'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: '1',
        url: 'test.url',
        preview: true,
      },
      {
        spotId: '1',
        url: 'test2.url',
        preview: true,
      },
      {
        spotId: '2',
        url: 'test3.url',
        preview: true,
      },
      {
        spotId: '4',
        url: 'test4.url',
        preview: true,
      },
      {
        spotId: '5',
        url: 'test5.url',
        preview: true,
      },
    ], {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, null, {});
  }
};
