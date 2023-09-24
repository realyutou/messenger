const { Op } = require('sequelize')

const { getUser } = require('../helpers/auth-helper')
const { getOffset, getPagination } = require('../helpers/pagination-helper')
const { User, Directory } = require('../models')

const directoryService = {
  getDirectory: async (req, cb) => {
    try {
      const host = getUser(req)
      const DEFAULT_LIMIT = 10
      const limit = DEFAULT_LIMIT
      const page = Number(req.query.page) || 1
      const offset = getOffset(limit, page)
      const keyword = req.query.keyword || ''
      let data
      if (keyword) {
        const users = await User.findAll({
          where: { name: { [Op.substring]: keyword } },
          attributes: ['id'],
          raw: true
        })
        if (users.length) {
          const usersId = Array.from(users, (user) => user.id)
          data = await Directory.findAndCountAll({
            where: {
              [Op.and]: [
                { hostId: host.id },
                { guestId: { [Op.or]: usersId } }
              ]
            },
            include: { model: User, as: 'Friends', attributes: { exclude: ['password'] } },
            limit,
            offset,
            raw: true,
            nest: true
          })
        } else {
          data = {
            count: 0,
            rows: []
          }
        }
      } else {
        data = await Directory.findAndCountAll({
          where: { hostId: host.id },
          include: { model: User, as: 'Friends', attributes: { exclude: ['password'] } },
          limit,
          offset,
          raw: true,
          nest: true
        })
      }
      const directories = data.rows
      return cb(null, {
        directories,
        pagination: getPagination(limit, page, data.count),
        host,
        keyword,
        count: data.count
      })
    } catch (err) {
      return cb(err)
    }
  }
}

module.exports = directoryService
