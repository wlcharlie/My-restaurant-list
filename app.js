const express = require('express')
const exphbs = require('express-handlebars')
const hbsHelpers = require('handlebars-helpers')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const routes = require('./routes')
require('./config/mongoose')

const app = express()
const helpers = hbsHelpers()
const port = 3000

app.engine('handlebars', exphbs({ helpers, defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

app.listen(port, () => {
  console.log(`IS WORKING! Head to http://localhost:${3000}`)
})