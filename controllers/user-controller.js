const userService = require('../services/user-service')
const { getUser } = require('../helpers/auth-helper')

const userController = {
  signUpPage: (req, res) => {
    res.render('signup')
  },
  signUp: (req, res, next) => {
    userService.signUp(req, (err, data) => {
      if (err) return next(err)
      req.flash('success_msg', '註冊成功，請登入！')
      return res.redirect('/signin')
    })
  },
  signInPage: (req, res) => {
    res.render('signin')
  },
  signIn: (req, res) => {
    req.flash('success_msg', '登入成功！')
    res.redirect('/')
  },
  logout: (req, res) => {
    req.logout(() => {
      req.flash('success_msg', '登出成功！')
      return res.redirect('/signin')
    })
  },
  getUser: (req, res, next) => {
    userService.getUser(req, (err, data) => {
      err ? next(err) : res.render('user', { user: data.user, hostAccount: data.hostAccount })
    })
  },
  searchUser: (req, res) => {
    const hostAccount = getUser(req).account
    const { keyword } = req.query
    keyword ? res.redirect(`/users/${keyword}`) : res.render('search-user', { hostAccount })
  },
  editUser: (req, res, next) => {
    const hostAccount = getUser(req).account
    const guestAccount = req.params.account
    if (hostAccount !== guestAccount) {
      const err = new Error('不能編輯其他人的資料！')
      err.status = 403
      return next(err)
    }
    userService.getUser(req, (err, data) => {
      err ? next(err) : res.render('edit-profile', { user: data.user })
    })
  },
  putUser: (req, res, next) => {
    userService.putUser(req, (err, data) => {
      if (err) return next(err)
      req.flash('success_msg', '成功更新個人資料！')
      return res.redirect(`/users/${data.user.account}`)
    })
  }
}

module.exports = userController
