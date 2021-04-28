// eslint-disable-next-line
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        email: 'admin@mail.com',
        scope_id: 1,
        password_hash: 'admins',
        created_at: new Date().toDateString(),
        updated_at: new Date().toDateString(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
