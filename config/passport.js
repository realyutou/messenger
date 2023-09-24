// Include packages and define related variables
const passport = require('passport')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcryptjs')

const { User } = require('../models')

// LocalStrategy
passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, cb) => {
  try {
    const user = await User.findOne({ where: { email }, raw: true })
    if (!user) {
      const err = new Error('此電子郵件尚未註冊！')
      err.status = 404
      throw err
    }
    const result = await bcrypt.compare(password, user.password)
    if (!result) throw new Error('密碼錯誤！')
    delete user.password
    return cb(null, user)
  } catch (err) {
    return cb(err)
  }
}))

// Serialize and deserialize
passport.serializeUser((user, cb) => {
  return cb(null, user.id)
})
passport.deserializeUser(async (id, cb) => {
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
      include: [{ model: User, as: 'Friends', attributes: { exclude: ['password'] } }]
    })
    return cb(null, user.toJSON())
  } catch (err) {
    return cb(err)
  }
})

module.exports = passport
