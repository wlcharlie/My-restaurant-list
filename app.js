const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const restaurantList = require('./restaurant.json').results

const app = express()
const port = 3000

mongoose.connect('mongodb://localhost/restaurant-list', {
  useNewUrlParser: true, useUnifiedTopology: true
})

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!!')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurant: restaurantList })
})

app.get('/restaurants/:id', (req, res) => {
  res.render('show', { restaurant: restaurantList.find(click => click.id.toString() === req.params.id) })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  res.render('index', { restaurant: restaurantList.filter(info => info.name.toLowerCase().includes(keyword.toLowerCase()) || info.category.includes(keyword)), keyword: keyword })
})

app.listen(port, () => {
  console.log(`IS WORKING! Head to http://localhost:${3000}`)
})