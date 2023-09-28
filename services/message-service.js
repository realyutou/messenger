const messageHelper = require('../helpers/message-helper')
const { getUser } = require('../helpers/auth-helper')
const { Message, User } = require('../models')

const messageService = {
  getPublic: async (req, cb) => {
    try {
      const io = req.app.io
      const host = getUser(req)
      const messages = await Message.findAll({
        include: { model: User, attributes: { exclude: ['password'] } },
        raw: true,
        nest: true
      })
      io.once('connection', socket => {
        // When a user connected
        io.emit('message', messageHelper(host, '已連線'))

        // When a user disconnected
        socket.on('disconnect', () => {
          io.emit('message', messageHelper(host, '已離線'))
        })

        // When a user send a message
        socket.on('chatMsg', msg => {
          const message = messageHelper(host, msg)
          io.emit('message', message)
          Message.create({
            userId: message.host.id,
            text: message.text,
            time: message.time
          })
        })
      })
      return cb(null, { messages })
    } catch (err) {
      return cb(err)
    }
  }
}

module.exports = messageService
