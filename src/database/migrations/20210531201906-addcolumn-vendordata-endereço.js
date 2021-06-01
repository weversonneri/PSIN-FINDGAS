// eslint-disable-next-line
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('vendor_data', 'address', {
      type: Sequelize.STRING,
      defaultValue: '',
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('vendor_data', 'address');
  },
};
