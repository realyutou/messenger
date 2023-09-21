const { Op } = require('sequelize')

const { Announcement } = require('../models')
const { getOffset, getPagination } = require('../helpers/pagination-helper')

const announcementService = {
  getAnnouncements: async (req, cb) => {
    try {
      const DEFAULT_LIMIT = 10
      const page = Number(req.query.page) || 1
      const limit = DEFAULT_LIMIT
      const offset = getOffset(limit, page)
      const { keyword } = req.query || ''
      let announcements
      if (keyword) {
        announcements = await Announcement.findAndCountAll({
          where: { title: { [Op.substring]: keyword } },
          order: [['createdAt', 'DESC']],
          limit,
          offset,
          raw: true
        })
      } else {
        announcements = await Announcement.findAndCountAll({
          order: [['createdAt', 'DESC']],
          limit,
          offset,
          raw: true
        })
      }
      return cb(null, {
        announcements: announcements.rows,
        pagination: getPagination(limit, page, announcements.count),
        keyword
      })
    } catch (err) {
      return cb(err)
    }
  }
}

module.exports = announcementService
