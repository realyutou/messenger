const adminService = require('../services/admin-service')
const announcementService = require('../services/announcement-service')

const adminController = {
  getAnnouncements: (req, res, next) => {
    announcementService.getAnnouncements(req, (err, data) => {
      err
        ? next(err)
        : res.render('admin/announcements', {
          announcements: data.announcements,
          pagination: data.pagination,
          keyword: data.keyword
        })
    })
  },
  newAnnouncement: (req, res) => {
    return res.render('admin/new-announcement')
  },
  postAnnouncement: (req, res, next) => {
    adminService.postAnnouncement(req, (err, data) => {
      if (err) return next(err)
      req.flash('success_msg', '成功發布新公告！')
      return res.redirect('/admin/announcements')
    })
  },
  editAnnouncement: (req, res, next) => {
    adminService.editAnnouncement(req, (err, data) => {
      err ? next(err) : res.render('admin/edit-announcement', { announcement: data.announcement })
    })
  },
  putAnnouncement: (req, res, next) => {
    adminService.putAnnouncement(req, (err, data) => {
      if (err) return next(err)
      req.flash('success_msg', '公告更新成功！')
      return res.redirect(`/announcements/${data.announcement.id}`)
    })
  },
  deleteAnnouncement: (req, res, next) => {
    adminService.deleteAnnouncement(req, (err, data) => {
      if (err) return next(err)
      req.flash('success_msg', '成功刪除該則公告！')
      return res.redirect('/admin/announcements')
    })
  },
  getUsers: (req, res, next) => {
    adminService.getUsers(req, (err, data) => {
      err
        ? next(err)
        : res.render('admin/users', {
          users: data.users,
          pagination: data.pagination,
          keyword: data.keyword
        })
    })
  },
  patchUser: (req, res, next) => {
    adminService.patchUser(req, (err, data) => {
      if (err) return next(err)
      req.flash('success_msg', '成功變更該使用者權限！')
      return res.redirect('/admin/users')
    })
  }
}

module.exports = adminController
