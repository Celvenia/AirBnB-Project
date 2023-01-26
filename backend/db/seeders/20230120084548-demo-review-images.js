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
      url: 'something1.url',
    },
    {
      reviewId: 1,
      url: 'something2.url',
    },
    {
      reviewId: 1,
      url: 'something3.url',
    },
    // {
    //   reviewId: 2,
    //   url: 'something4.url',
    // },
    // {
    //   reviewId: 2,
    //   url: 'something5.url',
    // },
    // {
    //   reviewId: 2,
    //   url: 'something6.url',
    // },

  ], {});
},
down: async (queryInterface, Sequelize) => {
  options.tableName = 'ReviewImages';
  const Op = Sequelize.Op;
  return queryInterface.bulkDelete(options, {
    id: { [Op.in]: [1,2,3] }
  }, {});
}
};
