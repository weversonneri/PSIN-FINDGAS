// eslint-disable-next-line
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'latitude', {
      type: Sequelize.DECIMAL,
    });
    await queryInterface.addColumn('Users', 'longitude', {
      type: Sequelize.DECIMAL,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'latitude');
    await queryInterface.removeColumn('Users', 'longitude');
  },
};
