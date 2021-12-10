'use strict'

const faker = require('faker')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('categories', [...Array(10)].map((v, i) => ({

      name: faker.commerce.department(),
      description: faker.commerce.productDescription(),
      createdAt: new Date(),
      updatedAt: new Date()

    })), {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('categories', null, {})
  }
}
