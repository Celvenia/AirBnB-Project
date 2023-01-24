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
        startDate: new Date(2023, 2, 3, 10, 30), //  Feb 03 2023 10:30
        endDate: new Date(2023, 2, 4, 10, 30), //    Feb 04 2023 10:30
      },
      {
        userId: 2,
        spotId: 1,
        startDate: new Date(2023, 5, 3, 10, 30), //  Feb 03 2023 10:30
        endDate: new Date(2023, 5, 4, 10, 30), //    Feb 04 2023 10:30
      },
      {
        userId: 3,
        spotId: 1,
        startDate: new Date(2023, 6, 3, 10, 30), //  Feb 03 2023 10:30
        endDate: new Date(2023, 6, 4, 10, 30), //    Feb 04 2023 10:30
      },
      {
        userId: 4,
        spotId: 2,
        startDate: new Date(2023, 7, 3, 10, 30), //  Feb 03 2023 10:30
        endDate: new Date(2023, 7, 4, 10, 30), //    Feb 04 2023 10:30
      },
      {
        userId: 5,
        spotId: 2,
        startDate: new Date(2023, 8, 3, 10, 30), //  Feb 03 2023 10:30
        endDate: new Date(2023, 8, 4, 10, 30), //    Feb 04 2023 10:30
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
