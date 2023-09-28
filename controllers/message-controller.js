const messageService = require('../services/message-service')

const messageController = {
  getChatroom: (req, res, next) => {
    messageService.getChatroom(req, (err, data) => {
      err ? next(err) : res.render('chatroom', { messages: data.messages })
    })
  }
}

module.exports = messageController
