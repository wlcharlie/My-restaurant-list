const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const hbsHelpers = require('handlebars-helpers')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('connect-flash')

const routes = require('./routes')
require('./config/mongoose')

const app = express()
const helpers = hbsHelpers()
const port = 3000

app.engine('handlebars', exphbs({ helpers, defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(session({
  secret: "testfortest",
  resave: false,
  saveUninitialized: true
}))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))


app.use(flash())
app.use((req, res, next) => {
  res.locals.successMsg = req.flash('successMsg')
  res.locals.warningMsg = req.flash('warningMsg')
  next()
})

app.use(routes)

app.listen(port, () => {
  console.log(`IS WORKING! Head to http://localhost:${3000}`)
})