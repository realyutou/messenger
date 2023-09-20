const { Announcement } = require('../models')
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
      return cb(null, { announcement: newAnnouncement })
    } catch (err) {
      return cb(err)
    }
  }
}

module.exports = adminServices
