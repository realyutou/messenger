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
      if (keyword.length > 30) throw new Error('姓名最多為 30 字！')
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
              hostId: host.id,
              guestId: { [Op.or]: usersId }
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
        keyword,
        count: data.count
      })
    } catch (err) {
      return cb(err)
    }
  },
  addFriend: async (req, cb) => {
    try {
      const hostId = getUser(req).id
      const guestId = Number(req.params.guestId)
      if (hostId === guestId) throw new Error('無法添加自己至通訊錄！')
      const [user, directory] = await Promise.all([
        User.findByPk(guestId),
        Directory.findOne({ where: { hostId, guestId } })
      ])
      if (!user) {
        const err = new Error('該使用者不存在！')
        err.status = 404
        throw err
      }
      if (directory) throw new Error('該使用者已是好友！')
      const newDirectory = await Directory.create({
        hostId,
        guestId
      })
      return cb(null, { directory: newDirectory, user })
    } catch (err) {
      return cb(err)
    }
  },
  removeFriend: async (req, cb) => {
    try {
      const hostId = getUser(req).id
      const guestId = Number(req.params.guestId)
      if (hostId === guestId) throw new Error('')
      const [user, directory] = await Promise.all([
        User.findByPk(guestId),
        Directory.findOne({ where: { hostId, guestId } })
      ])
      if (!user) {
        const err = new Error('該使用者不存在！')
        err.status = 404
        throw err
      }
      if (!directory) throw new Error('該使用者非好友！')
      const deletedDirectory = await directory.destroy()
      return cb(null, { directory: deletedDirectory, user })
    } catch (err) {
      return cb(err)
    }
  }
}

module.exports = directoryService
