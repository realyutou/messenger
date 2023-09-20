// Include packages and define related variables
const bcrypt = require('bcryptjs')

const { User } = require('../models')

const userService = {
  signUp: async (req, cb) => {
    try {
      const { name, email, account, password, passwordCheck } = req.body
      if (!name || !email || !account || !password || !passwordCheck) throw new Error('所有欄位都是必填！')
      if (name.length > 30) throw new Error('請設定 30 字以內的姓名！')
      if (account.length > 20) throw new Error('請設定 20 字以內的帳號！')
      if (password !== passwordCheck) throw new Error('密碼與確認密碼不符合！')
      if (password.length < 5 || password.length > 20) throw new Error('請設定 5 ~ 20 字的密碼！')
      const [userA, userB] = await Promise.all([User.findOne({ where: { email } }), User.findOne({ where: { account } })])
      if (userA) throw new Error('電子郵件已被使用！')
      if (userB) throw new Error('帳號已被使用！')

      const hash = await bcrypt.hash(password, 10)
      const newUser = await User.create({
        name,
        email,
        account,
        password: hash
      })
      return cb(null, { user: newUser })
    } catch (err) {
      return cb(err)
    }
  }
}

module.exports = userService
