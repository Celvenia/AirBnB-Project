'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, [
    {
      reviewId: 1,
      url: 'https://res.cloudinary.com/dtzv3fsas/image/upload/v1677582118/611be0c6a4b07b0018adf76f_wutngr.jpg',
      preview: true,
    },
    {
      reviewId: 1,
      url: 'https://res.cloudinary.com/dtzv3fsas/image/upload/v1677582118/f581f0b4-760e-4c7c-ac16-396ad777a2ba_mgrvlf.jpg',
      preview: true,
    },
    {
      reviewId: 1,
      url: 'https://res.cloudinary.com/dtzv3fsas/image/upload/v1677582118/im-85242_z50oog.jpg',
      preview: true
    },
    {
      reviewId: 2,
      url: 'https://res.cloudinary.com/dtzv3fsas/image/upload/v1677582118/airbnb_20luxe_sj4jkf.jpg',
    },
    {
      reviewId: 3,
      url: 'https://res.cloudinary.com/dtzv3fsas/image/upload/v1677582117/Best-Airbnbs-in-the-World-Featured-Image_rdtauu.jpg',
    },
    {
      reviewId: 4,
      url: 'https://res.cloudinary.com/dtzv3fsas/image/upload/v1677581893/medium_gzyzbb.jpg',
    },
    {
      reviewId: 5,
      url: 'https://res.cloudinary.com/dtzv3fsas/image/upload/v1677582117/Best-Airbnbs-in-the-World-Featured-Image_rdtauu.jpg',
    },
    {
      reviewId: 6,
      url: 'https://res.cloudinary.com/dtzv3fsas/image/upload/v1677581893/medium_gzyzbb.jpg',
    },
    {
      reviewId: 7,
      url: 'https://res.cloudinary.com/dtzv3fsas/image/upload/v1677581892/luxury-vacation-rental-sites-02_lguhml.png',
    },

  ], {});
},
down: async (queryInterface, Sequelize) => {
  options.tableName = 'ReviewImages';
  const Op = Sequelize.Op;
  return queryInterface.bulkDelete(options, null, {});
}
};
