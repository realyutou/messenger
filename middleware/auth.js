const { getUser, isAuthenticated } = require('../helpers/auth-helper')

const authenticatedUser = (req, res, next) => {
  if (isAuthenticated(req)) return next()
  req.flash('error_msg', '歡迎你，請先登入！')
  return res.redirect('/signin')
}

const authenticatedAdmin = (req, res, next) => {
  if (isAuthenticated(req)) {
    if (getUser(req).isAdmin) return next()
    req.flash('error_msg', '權限不足，請重新確認！')
    return res.redirect('/')
  } else {
    req.flash('error_msg', '歡迎你，請先登入！')
    return res.redirect('/signin')
  }
}

module.exports = {
  authenticatedUser,
  authenticatedAdmin
}
