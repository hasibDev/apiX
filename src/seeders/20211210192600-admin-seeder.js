'use strict'
const bcrypt = require("bcrypt")
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const password = await bcrypt.hash('123456', 10)
    await queryInterface.bulkInsert('admins', [{
      firstName: 'Super',
      lastName: 'User',
      email: 'admin@example.com',
      password,
      guard: 'admins',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('admins', null, {})
  }
}
