'use strict'
const { faker } = require('@faker-js/faker')
const bcrypt = require('bcryptjs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const users = [{
      email: 'root@example.com',
      account: 'root',
      password: await bcrypt.hash('12345678', 10),
      name: faker.person.firstName(),
      avatar: faker.internet.avatar(),
      introduction: faker.lorem.paragraph({ min: 1, max: 3 }),
      text: faker.person.bio(),
      birthday: faker.date.birthdate({ min: 12, max: 40, mode: 'age' }),
      gender: '女',
      job: faker.person.jobTitle(),
      location: faker.location.city(),
      is_admin: true,
      created_at: new Date(),
      updated_at: new Date()
    }]

    for (let i = 1; i <= 5; i++) {
      users[i] = {
        email: `user${i}@example.com`,
        account: `user${i}`,
        password: await bcrypt.hash('12345678', 10),
        name: faker.person.firstName(),
        avatar: faker.internet.avatar(),
        introduction: faker.lorem.paragraph({ min: 1, max: 3 }),
        text: faker.person.bio(),
        birthday: faker.date.birthdate({ min: 12, max: 40, mode: 'age' }),
        gender: '男',
        job: faker.person.jobTitle(),
        location: faker.location.city(),
        is_admin: false,
        created_at: new Date(),
        updated_at: new Date()
      }
    }
    return await queryInterface.bulkInsert('Users', users)
  },

  async down (queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('Users', null, {})
  }
}
