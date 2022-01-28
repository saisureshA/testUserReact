'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      userName: 'John',
      surName: 'Doe',
      givenName: 'John Doe',
      dob: '1643385512323 ',  
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userName: 'Mark',
      surName: 'zuckerberg',
      givenName: 'mark zuckerberg',
      dob: '1643385512323 ',  
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
