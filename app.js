const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')
// const restaurantList = require('./restaurant.json').results

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
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

app.get('/restaurants/:id', (req, res) => {
  const id = Number(req.params.id)
  Restaurant.find({ id }) //小筆記：回傳的是array
    .lean()
    .then(findRestaurant => {
      let theRestaurant = {}
      theRestaurant = findRestaurant[0]
      res.render('show', { theRestaurant })
    })
    .catch(error => console.log(error))
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  Restaurant.find({})
    .lean()
    .then(restaurants => res.render('index', { restaurants: restaurants.filter(info => info.name.toLowerCase().includes(keyword.toLowerCase()) || info.name_en.toLowerCase().includes(keyword.toLowerCase()) || info.category.includes(keyword)), keyword: keyword }))
    .catch(error => console.log(error))

  // res.render('index', { restaurant: restaurantList.filter(info => info.name.toLowerCase().includes(keyword.toLowerCase()) || info.category.includes(keyword)), keyword: keyword })
})

app.listen(port, () => {
  console.log(`IS WORKING! Head to http://localhost:${3000}`)
})