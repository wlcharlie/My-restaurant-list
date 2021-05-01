const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')


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
app.use(bodyParser.urlencoded({ extended: true }))

// R of CRUD
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
})

app.get('/create/new', (req, res) => {
  res.render('new')
})

app.post('/create', (req, res) => {
  const info = req.body

  let id = Math.floor(Math.random() * 100000 + 1)
  let check_id = []
  let checking = false

  Restaurant.find({})
    .lean()
    .then(restaurants => restaurants.forEach(a => check_id.push(a)))
    .then(checking = true)
    .catch(error => console.log(error))

  while (checking) {
    if (check_id.some(ele => ele === id)) {
      id = Math.floor(Math.random() * 100000 + 1)
    } else {
      checking = false
      Restaurant.create({
        id,
        name: info.name,
        name_en: info.name_en,
        category: info.category,
        image: info.image,
        location: info.location,
        phone: info.phone,
        google_map: info.google_map,
        rating: info.rating,
        description: info.description,
      })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))

    }
  }
})

// C of CRUD 
// app.get 進入到新增頁面
// app.post 提交後新增至資料庫，重新導向首頁
// U of CRUD
// app.get 進入到編輯頁面，與新增頁面類似
// app.post 提交後更新資料庫
// D of CRUD
// app.post 刪除後更新資料，重新導向至首頁





app.listen(port, () => {
  console.log(`IS WORKING! Head to http://localhost:${3000}`)
})