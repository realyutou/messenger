const { Announcement } = require('../models')

const adminServices = {
  getAnnouncements: async (req, cb) => {
    try {
      const announcements = await Announcement.findAll({ raw: true })
      return cb(null, { announcements })
    } catch (err) {
      return cb(err)
    }
  }
}

module.exports = adminServices
