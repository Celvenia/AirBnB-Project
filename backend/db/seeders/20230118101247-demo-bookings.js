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
        startDate: new Date(2023, 0, 20, 10, 30), //  Jan 03 2023 10:30 Within timeframe of booking
        endDate: new Date(2023, 1, 4, 10, 30), //    Feb 04 2023 10:30
      },
      {
        userId: 2,
        spotId: 1,
        startDate: new Date(2023, 5, 3, 10, 30), //  June 03 2023 10:30
        endDate: new Date(2023, 5, 4, 10, 30), //    June 04 2023 10:30
      },
      {
        userId: 1,
        spotId: 1,
        startDate: new Date(2023, 0, 3, 10, 30), //  Jan 03 2023 10:30
        endDate: new Date(2023, 0, 4, 10, 30), //    Jan 04 2023 10:30 Past date
      },
      {
        userId: 1,
        spotId: 2,
        startDate: new Date(2023, 7, 3, 10, 30), //  August 03 2023 10:30
        endDate: new Date(2023, 7, 4, 10, 30), //    August 04 2023 10:30
      },
      {
        userId: 2,
        spotId: 2,
        startDate: new Date(2023, 8, 3, 10, 30), //  September 03 2023 10:30
        endDate: new Date(2023, 8, 4, 10, 30), //    September 04 2023 10:30
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
  const Op = Sequelize.Op;
  return queryInterface.bulkDelete(options, {
    id: { [Op.in]: [1,2,3,4,5] }
  }, {});
  }
};
