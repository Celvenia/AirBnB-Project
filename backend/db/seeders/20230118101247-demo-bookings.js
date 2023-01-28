'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        spotId: 1,
        startDate: new Date(2023, 1, 25), //  Feb 25 2023
        endDate: new Date(2023, 2, 4), //    March 04 2023 10:30 new Date(2023, 2, 4, 10, 30),
      },
      {
        userId: 2,
        spotId: 1,
        startDate: new Date(2023, 5, 3), //  June 03 2023
        endDate: new Date(2023, 5, 4), //    June 04 2023
      },
      {
        userId: 1,
        spotId: 1,
        startDate: new Date(2023, 0, 3), //  Jan 03 2023
        endDate: new Date(2023, 0, 4), //    Jan 04 2023 Past date
      },
      {
        userId: 1,
        spotId: 2,
        startDate: new Date(2023, 7, 3), //  August 03 2023
        endDate: new Date(2023, 7, 4), //    August 04 2023
      },
      {
        userId: 2,
        spotId: 3,
        startDate: new Date(2023, 8, 3), //  September 03 2023
        endDate: new Date(2023, 8, 4), //    September 04 2023
      },
      {
        userId: 2,
        spotId: 4,
        startDate: new Date(2023, 8, 3), //  September 03 2023
        endDate: new Date(2023, 8, 4), //    September 04 2023
      },
      {
        userId: 2,
        spotId: 5,
        startDate: new Date(2023, 8, 3), //  September 03 2023
        endDate: new Date(2023, 8, 4), //    September 04 2023
      }

    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
  const Op = Sequelize.Op;
  return queryInterface.bulkDelete(options, null, {});
  }
};
