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
      review: 'this place is amazing',
      stars: 5
    }
  //  {
  //     userId: 1,
  //     spotId: 1,
  //     review: 'so cozy, will definitely be back',
  //     stars: 4
  //   }

  ], {});
},
down: async (queryInterface, Sequelize) => {
  options.tableName = 'Reviews';
  const Op = Sequelize.Op;
  return queryInterface.bulkDelete(options, {
    id: { [Op.in]: [1] }
  }, {});
}
};
