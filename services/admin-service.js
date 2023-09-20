const { Announcement } = require('../models')
const { getOffset, getPagination } = require('../helpers/pagination-helper')

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
  }
}

module.exports = adminServices
