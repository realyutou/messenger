const announcementService = require('../services/announcement-service')

const announcementController = {
  getAnnouncements: (req, res, next) => {
    announcementService.getAnnouncements(req, (err, data) => {
      err
        ? next(err)
        : res.render('announcements', {
          announcements: data.announcements,
          pagination: data.pagination,
          keyword: data.keyword
        })
    })
  },
  getAnnouncement: (req, res, next) => {
    announcementService.getAnnouncement(req, (err, data) => {
      err ? next(err) : res.render('announcement', { announcement: data.announcement })
    })
  }
}

module.exports = announcementController
