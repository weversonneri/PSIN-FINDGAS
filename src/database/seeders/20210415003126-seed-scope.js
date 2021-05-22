// eslint-disable-next-line
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('scopes', [
      {
        id: 1,
        name: 'ADMIN',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        name: 'VENDOR',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        name: 'USER',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('scopes', null, {});
  },
};
