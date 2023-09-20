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
  },
  postAnnouncement: (req, res, next) => {
    adminService.postAnnouncement(req, (err, data) => {
      if (err) return next(err)
      req.flash('成功發布新公告！')
      return res.redirect('/admin/announcements')
    })
  }
}

module.exports = adminController
