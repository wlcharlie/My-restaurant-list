//確保使用者有登入才能使用其他服務
module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('warningMsg', '請先登入')
    res.redirect('/users/login')
  }
}