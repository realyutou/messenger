const { Op } = require('sequelize')

const { Announcement, User } = require('../models')
const { getOffset, getPagination } = require('../helpers/pagination-helper')

const announcementService = {
  getAnnouncements: async (req, cb) => {
    try {
      const DEFAULT_LIMIT = 10
      const page = Number(req.query.page) || 1
      const limit = DEFAULT_LIMIT
      const offset = getOffset(limit, page)
      const { keyword } = req.query || ''
      if (keyword?.length > 100) throw new Error('標題最多為 100 字！')
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
  },
  getAnnouncement: async (req, cb) => {
    try {
      const announcementId = req.params.id
      const announcement = await Announcement.findByPk(announcementId, {
        include: [{ model: User, attributes: { exclude: ['password'] } }],
        raw: true,
        nest: true
      })
      if (!announcement) {
        const err = new Error('該公告不存在，請重新確認！')
        err.status = 404
        throw err
      }
      return cb(null, { announcement })
    } catch (err) {
      return cb(err)
    }
  }
}

module.exports = announcementService
