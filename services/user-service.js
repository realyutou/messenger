// Include packages and define related variables
const bcrypt = require('bcryptjs')

const { User } = require('../models')
const { getUser } = require('../helpers/auth-helper')
const { imgurFileHandler } = require('../helpers/file-helper')

const userService = {
  signUp: async (req, cb) => {
    try {
      const { name, email, account, password, passwordCheck } = req.body
      if (!name || !email || !account || !password || !passwordCheck) throw new Error('所有欄位都是必填！')
      const [userA, userB, hash] = await Promise.all([
        User.findOne({ where: { email } }),
        User.findOne({ where: { account } }),
        bcrypt.hash(password, 10)
      ])
      if (userA) throw new Error('該電子信箱已被使用！')
      if (userB) throw new Error('該帳號已被使用！')
      const newUser = await User.create({
        name,
        email,
        account,
        password: hash
      })
      return cb(null, { user: newUser.toJSON() })
    } catch (err) {
      return cb(err)
    }
  },
  getUser: async (req, cb) => {
    try {
      const host = getUser(req)
      const guestAccount = req.params.account
      const user = await User.findOne({
        where: { account: guestAccount },
        attributes: { exclude: ['password'] },
        raw: true
      })
      if (!user) {
        const err = new Error('該使用者不存在！')
        err.status = 404
        throw err
      }
      return cb(null, { user, hostAccount: host.account })
    } catch (err) {
      return cb(err)
    }
  },
  putUser: async (req, cb) => {
    try {
      const host = getUser(req)
      if (host.account !== req.params.account) {
        const err = new Error('不能編輯其他人的資料！')
        err.status = 403
        throw err
      }
      const { name, email, account, password, introduction, text, birthday, gender, job, location } = req.body
      const avatar = req.file ? await imgurFileHandler(req.file) : null
      const hash = password ? await bcrypt.hash(password, 10) : null
      if (account !== host.account) {
        const user = await User.findOne({ where: { account } })
        if (user) throw new Error('該帳號已被使用！')
      }
      if (email !== host.email) {
        const user = await User.findOne({ where: { email } })
        if (user) throw new Error('該電子信箱已被使用！')
      }
      const user = await User.findByPk(host.id)
      const updatedUser = await user.update({
        name: name || user.name,
        email: email || user.email,
        account: account || user.account,
        password: hash || user.password,
        introduction: introduction || user.introduction,
        text: text || user.text,
        birthday: birthday || user.birthday,
        gender: gender || user.gender,
        job: job || user.job,
        location: location || user.location,
        avatar: avatar || user.avatar
      })
      return cb(null, { user: updatedUser.toJSON() })
    } catch (err) {
      return cb(err)
    }
  }
}

module.exports = userService
