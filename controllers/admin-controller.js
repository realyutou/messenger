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
    return res.render('admin/new-announcement')
  },
  postAnnouncement: (req, res, next) => {
    adminService.postAnnouncement(req, (err, data) => {
      if (err) return next(err)
      req.flash('成功發布新公告！')
      return res.redirect('/admin/announcements')
    })
  },
  editAnnouncement: (req, res, next) => {
    adminService.editAnnouncement(req, (err, data) => {
      err ? next(err) : res.render('admin/edit-announcement', { announcement: data.announcement })
    })
  }
}

module.exports = adminController
