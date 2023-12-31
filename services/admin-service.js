const { Op } = require('sequelize')

const { Announcement, User } = require('../models')
const { getOffset, getPagination } = require('../helpers/pagination-helper')
const { getUser } = require('../helpers/auth-helper')

const adminServices = {
  postAnnouncement: async (req, cb) => {
    try {
      const userId = getUser(req)?.id
      const { title, content } = req.body
      if (!title || !content) throw new Error('所有欄位都是必填！')
      if (title.length > 100) throw new Error('標題最多為 100 字！')
      if (content.length > 1000) throw new Error('公告內容最多為 1000 字！')
      const newAnnouncement = await Announcement.create({
        title,
        content,
        userId
      })
      return cb(null, { announcement: newAnnouncement.toJSON() })
    } catch (err) {
      return cb(err)
    }
  },
  editAnnouncement: async (req, cb) => {
    try {
      const announcementId = req.params.id
      const announcement = await Announcement.findByPk(announcementId, { raw: true })
      if (!announcement) {
        const err = new Error('該公告不存在，請重新確認！')
        err.status = 404
        throw err
      }
      return cb(null, { announcement })
    } catch (err) {
      return cb(err)
    }
  },
  putAnnouncement: async (req, cb) => {
    try {
      const announcementId = req.params.id
      const userId = getUser(req)?.id
      const { title, content } = req.body
      if (!title || !content) throw new Error('所有欄位都是必填！')
      if (title.length > 100) throw new Error('標題最多為 100 字！')
      const announcement = await Announcement.findByPk(announcementId)
      if (!announcement) {
        const err = new Error('該公告不存在，請重新確認！')
        err.status = 404
        throw err
      }
      const updatedAnnouncement = await announcement.update({
        title: title || announcement.title,
        content: content || announcement.content,
        userId
      })
      return cb(null, { announcement: updatedAnnouncement.toJSON() })
    } catch (err) {
      return cb(err)
    }
  },
  deleteAnnouncement: async (req, cb) => {
    try {
      const announcementId = req.params.id
      const announcement = await Announcement.findByPk(announcementId)
      if (!announcement) {
        const err = new Error('該公告不存在，請重新確認！')
        err.status = 404
        throw err
      }
      const deletedAnnouncement = await announcement.destroy()
      return cb(null, { announcement: deletedAnnouncement.toJSON() })
    } catch (err) {
      return cb(err)
    }
  },
  getUsers: async (req, cb) => {
    try {
      const DEFAULT_LIMIT = 10
      const limit = DEFAULT_LIMIT
      const page = Number(req.query.page) || 1
      const offset = getOffset(limit, page)
      const { keyword } = req.query || ''
      if (keyword?.length > 30) throw new Error('姓名最多為 30 字！')
      let users
      if (keyword) {
        users = await User.findAndCountAll({
          where: { name: { [Op.substring]: keyword } },
          attributes: { exclude: ['password'] },
          order: [['isAdmin', 'DESC'], ['email', 'ASC']],
          limit,
          offset,
          raw: true
        })
      } else {
        users = await User.findAndCountAll({
          attributes: { exclude: ['password'] },
          order: [['isAdmin', 'DESC'], ['email', 'ASC']],
          limit,
          offset,
          raw: true
        })
      }
      return cb(null, {
        users: users.rows,
        pagination: getPagination(limit, page, users.count),
        keyword
      })
    } catch (err) {
      return cb(err)
    }
  },
  patchUser: async (req, cb) => {
    try {
      const { account } = req.params
      if (account === 'root') {
        const err = new Error('無法變更 root 權限')
        err.status = 403
        throw err
      }
      const user = await User.findOne({ where: { account } })
      if (!user) {
        const err = new Error('使用者不存在！')
        err.status = 404
        throw err
      }
      let updatedUser
      if (user.isAdmin) {
        updatedUser = await user.update({ isAdmin: false })
      } else {
        updatedUser = await user.update({ isAdmin: true })
      }
      return cb(null, { user: updatedUser.toJSON() })
    } catch (err) {
      return cb(err)
    }
  }
}

module.exports = adminServices
