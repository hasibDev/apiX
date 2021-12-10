'use strict'
const faker = require('faker')
const bcrypt = require("bcrypt")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash('123456', salt)

    await queryInterface.bulkInsert('users', [...Array(10)].map(() => ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password,
      createdAt: new Date(),
      updatedAt: new Date()

    })), {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {})
  }
}
