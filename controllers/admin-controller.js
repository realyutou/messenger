const adminService = require('../services/admin-service')

const adminController = {
  getAnnouncements: (req, res, next) => {
    adminService.getAnnouncements(req, (err, data) => {
      err ? next(err) : res.render('admin/announcements', { announcements: data.announcements })
    })
  }
}

module.exports = adminController
