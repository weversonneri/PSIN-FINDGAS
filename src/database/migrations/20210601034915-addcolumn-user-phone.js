// eslint-disable-next-line
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'phone', {
      type: Sequelize.STRING,
      defaultValue: '',
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'phone');
  },
};
