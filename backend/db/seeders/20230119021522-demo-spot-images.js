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
        spotId: 1,
        url: 'https://res.cloudinary.com/dtzv3fsas/image/upload/v1677581893/medium_gzyzbb.jpg',
        preview: true,
      },
      {
        spotId: 2,
        url: 'https://res.cloudinary.com/dtzv3fsas/image/upload/v1677581891/5762e39f91058424008c987a_suiu83.jpg',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://res.cloudinary.com/dtzv3fsas/image/upload/v1677581891/62598f30-cb03-43ef-b80e-9d0d5b28ac51_ehm46u.jpg',
        preview: true,
      },
      {
        spotId: 4,
        url: 'https://res.cloudinary.com/dtzv3fsas/image/upload/v1677581890/050719_airbnbluxe_s00nfs.jpg',
        preview: true,
      },
      {
        spotId: 5,
        url: 'https://res.cloudinary.com/dtzv3fsas/image/upload/v1677581890/cliff-top-residence1-1100x733_h2dejd.jpg',
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
