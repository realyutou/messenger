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
  }
}

module.exports = announcementController
