const directoryService = require('../services/directory-service')

const directoryController = {
  getDirectory: (req, res, next) => {
    directoryService.getDirectory(req, (err, data) => {
      err
        ? next(err)
        : res.render('directory', {
          directories: data.directories,
          pagination: data.pagination,
          keyword: data.keyword,
          count: data.count
        })
    })
  },
  addFriend: (req, res, next) => {
    directoryService.addFriend(req, (err, data) => {
      if (err) return next(err)
      req.flash('success_msg', `成功添加 ${data.user.name} 至通訊錄！`)
      return res.redirect(`/users/${data.user.account}`)
    })
  }
}

module.exports = directoryController
