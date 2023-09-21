const { Op } = require('sequelize')

const { Announcement, User } = require('../models')
const { getOffset, getPagination } = require('../helpers/pagination-helper')
const { getUser } = require('../helpers/auth-helper')

const adminServices = {
  getAnnouncements: async (req, cb) => {
    try {
      const DEFAULT_LIMIT = 10
      const page = Number(req.query.page) || 1
      const limit = DEFAULT_LIMIT
      const offset = getOffset(limit, page)
      const announcements = await Announcement.findAndCountAll({
        order: [['createdAt', 'DESC']],
        limit,
        offset,
        raw: true
      })
      return cb(null, {
        announcements: announcements.rows,
        pagination: getPagination(limit, page, announcements.count)
      })
    } catch (err) {
      return cb(err)
    }
  },
  postAnnouncement: async (req, cb) => {
    try {
      const userId = getUser(req)?.id
      const { title, content } = req.body
      if (!title || !content) throw new Error('所有欄位都是必填！')
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
      let users
      if (keyword) {
        users = await User.findAndCountAll({
          where: { name: { [Op.substring]: keyword } },
          order: [['isAdmin', 'DESC'], ['email', 'ASC']],
          limit,
          offset,
          raw: true
        })
      } else {
        users = await User.findAndCountAll({
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
  }
}

module.exports = adminServices
