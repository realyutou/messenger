const directoryService = require('../services/directory-service')

const directoryController = {
  getDirectory: (req, res, next) => {
    directoryService.getDirectory(req, (err, data) => {
      err
        ? next(err)
        : res.render('directory', {
          host: data.host,
          hostAccount: data.host.account,
          directories: data.directories,
          pagination: data.pagination,
          keyword: data.keyword,
          count: data.count
        })
    })
  }
}

module.exports = directoryController
