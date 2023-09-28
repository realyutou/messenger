const messageHelper = require('../helpers/message-helper')
const { getUser } = require('../helpers/auth-helper')
const { Message, User } = require('../models')

const messageService = {
  getChatroom: async (req, cb) => {
    try {
      const io = req.app.io
      const host = getUser(req)
      const guestId = req.params.guestId ? Number(req.params.guestId) : null
      let roomId
      if (guestId) {
        const user = await User.findByPk(guestId)
        if (!user) {
          const err = new Error('該使用者不存在！')
          err.status = 404
          throw err
        }
        if (guestId > host.id) {
          roomId = `${host.id}${guestId}`
        } else if (guestId === host.id) {
          throw new Error('無法與自己聊天！')
        } else {
          roomId = `${guestId}${host.id}`
        }
      } else {
        roomId = 'public'
      }
      const messages = await Message.findAll({
        where: { roomId },
        include: { model: User, attributes: { exclude: ['password'] } },
        raw: true,
        nest: true
      })
      io.once('connection', socket => {
        socket.join(roomId)
        // When a user connected
        io.to(roomId).emit('message', messageHelper(host, '已連線'))
        // When a user disconnected
        socket.on('disconnect', () => {
          io.to(roomId).emit('message', messageHelper(host, '已離線'))
        })

        // When a user send a message
        socket.on('chatMsg', msg => {
          const message = messageHelper(host, msg)
          io.to(roomId).emit('message', message)
          Message.create({
            userId: message.host.id,
            text: message.text,
            time: message.time,
            roomId
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
