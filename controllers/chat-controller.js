const messageHelper = require('../helpers/message-helper')
const { getUser } = require('../helpers/auth-helper')

const chatController = {
  getChatroom: (req, res) => {
    const io = req.app.io
    const host = getUser(req)
    io.once('connection', socket => {
      // When a user connected
      io.emit('message', messageHelper(host, '已連線'))

      // When a user disconnected
      socket.on('disconnect', () => {
        io.emit('message', messageHelper(host, '已離線'))
      })

      // When a user send a message
      socket.on('chatMsg', msg => {
        io.emit('message', messageHelper(host, msg))
      })
    })
    return res.render('chatroom')
  }
}

module.exports = chatController
