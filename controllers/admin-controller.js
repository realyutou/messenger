const adminService = require('../services/admin-service')

const adminController = {
  getAnnouncements: (req, res, next) => {
    adminService.getAnnouncements(req, (err, data) => {
      err
        ? next(err)
        : res.render('admin/announcements', {
          announcements: data.announcements,
          pagination: data.pagination
        })
    })
  },
  newAnnouncement: (req, res) => {
    return res.render('admin/announcement-form')
  }
}

module.exports = adminController
