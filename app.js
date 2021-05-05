const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Restaurant = require('./models/restaurant')
const methodOverride = require('method-override')

const app = express()
const port = 3000

mongoose.connect('mongodb://localhost/restaurant-list', {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false
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
app.use(methodOverride('_method'))

// R of CRUD
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

//小筆記：回傳的是array
app.get('/restaurants/:id', (req, res) => {
  const id = Number(req.params.id)
  Restaurant.find({ id })
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

// CREATE
// 嘗試用已知方法判斷有無重複id(自定義的id，非db的_id)
// 為避免非同步下的迴圈死路，將資料拉出來判定
app.get('/create/new', (req, res) => {
  res.render('new')
})

app.post('/create', (req, res) => {
  const info = req.body

  let id = Math.floor(Math.random() * 100000 + 1)
  const check_ID = []
  let checking = false

  Restaurant.find({})
    .lean()
    .then(restaurants => restaurants.forEach(a => check_ID.push(a)))
    .then(checking = true)
    .catch(error => console.log(error))

  while (checking) {
    if (check_ID.some(ele => ele === id)) {
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
        description: info.description
      })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
    }
  }
})

// U of CRUD
// app.get 進入到編輯頁面，與新增頁面類似
// app.post 提交後更新資料庫
// app.get >> app.put for RESTful
app.put('/restaurants/:id', (req, res) => {
  const id = Number(req.params.id)
  Restaurant.find({ id })
    .lean()
    .then(findRestaurant => {
      let theRestaurant = {}
      theRestaurant = findRestaurant[0]
      res.render('edit', { theRestaurant })
    })
    .catch(error => console.log(error))
})

app.post('/save/:id', (req, res) => {
  const id = Number(req.params.id)
  const info = req.body
  Restaurant.findOneAndUpdate({ id }, {
    id,
    name: info.name,
    name_en: info.name_en,
    category: info.category,
    image: info.image,
    location: info.location,
    phone: info.phone,
    google_map: info.google_map,
    rating: info.rating,
    description: info.description
  })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

// DELETE
// 筆記：原本直接接remove但跳出不推薦，可改使用deleteOne/deleteMany
// app.post >> app.delete for RESTful
app.delete('/restaurants/:id', (req, res) => {
  const id = Number(req.params.id)
  return Restaurant.deleteOne({ id })
    .then(() => res.redirect('/'))
})

app.listen(port, () => {
  console.log(`IS WORKING! Head to http://localhost:${3000}`)
})
