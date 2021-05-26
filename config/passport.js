const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/user')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  // localStrategy為user+password，用參數將user用email取代
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
  }, (req, email, password, done) => {
    User.findOne({ email })
      .then(find => {
        if (!find) {
          return done(null, false, { message: '電子信箱尚未註冊!' })
        }

        if (find.password !== password) {
          return done(null, false, { message: '電子信箱或密碼輸入錯誤!' })
        }

        return done(null, user)
      })
  }))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}