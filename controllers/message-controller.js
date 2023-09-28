const messageService = require('../services/message-service')

const messageController = {
  getPublic: (req, res, next) => {
    messageService.getPublic(req, (err, data) => {
      err ? next(err) : res.render('chatroom', { messages: data.messages })
    })
  }
}

module.exports = messageController
