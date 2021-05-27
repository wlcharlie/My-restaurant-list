const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy

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

  passport.use(new FacebookStrategy({
    clientID: "331633704999179",
    clientSecret: "9653e820a005498544789224aff319d9",
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    // 要抓取使用者的資料，name似乎已經有了
    profileFields: ['displayName', 'email']
  },
    function (accessToken, refreshToken, profile, done) {
      const { name, email } = profile._json
      User.findOne({ email })
        .then(user => {
          if (user) {
            return done(null, user)
          }

          const testPassword = 123456

          User.create({
            name,
            email,
            password: testPassword
          })
            .then(user => done(null, user))
            .catch(err => done(err, false))
        })
    }
  ))

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