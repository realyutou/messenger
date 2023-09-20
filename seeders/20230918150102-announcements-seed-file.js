'use strict'
const { faker } = require('@faker-js/faker')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const userId = await queryInterface.sequelize.query(
      "SELECT id FROM Users WHERE account='root';",
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    const announcements = Array.from({ length: 50 }, (_, i) => ({
      title: faker.lorem.sentence({ min: 3, max: 5 }),
      content: faker.lorem.paragraph(),
      user_id: userId[0].id,
      created_at: new Date(),
      updated_at: new Date()
    }))
    return await queryInterface.bulkInsert('Announcements', announcements)
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('Announcements', null, {})
  }
}
