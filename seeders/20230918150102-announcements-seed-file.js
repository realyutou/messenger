'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const userId = await queryInterface.sequelize.query(
      "SELECT id FROM Users WHERE account='root';",
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    return await queryInterface.bulkInsert('Announcements', [{
      title: '歡迎加入 HELLO! 即時通。',
      content: '歡迎加入 HELLO! 即時通。',
      user_id: userId[0].id,
      created_at: new Date(),
      updated_at: new Date()
    }])
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('Announcements', null, {})
  }
}
