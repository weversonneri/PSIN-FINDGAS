// eslint-disable-next-line
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'name', Sequelize.STRING);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'name');
  },
};
