const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json').results
const port = 3000

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