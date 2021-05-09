// this route will conduct to detail related( detail page/ edit page/ delete)

const express = require('express')
const router = express.Router()
const uuid4 = require('uuid4')

const Restaurant = require('../../models/restaurant')

// create a new restaurant
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const info = req.body
  let id = parseInt(uuid4(), 24)

  if (!info.image) {
    info.image = "https://images.unsplash.com/photo-1619526882897-94e6516aff74"
  }
  if (!info.google_map) {
    info.google_map = `https://www.google.com.tw/maps/search/${info.name}/`
  }

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
})

// view specific restaurants
router.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  Restaurant.findOne({ id })
    .lean()
    .then(theRestaurant => res.render('show', { theRestaurant }))
    .catch(error => console.log(error))
})

// to edit page
router.get('/:id/edit', (req, res) => {
  const id = Number(req.params.id)
  Restaurant.findOne({ id })
    .lean()
    .then(theRestaurant => res.render('edit', { theRestaurant }))
    .catch(error => console.log(error))
})

// renew the page from edit
router.put('/:id', (req, res) => {
  const id = Number(req.params.id)
  const info = req.body

  if (!info.image) {
    info.image = "https://images.unsplash.com/photo-1619526882897-94e6516aff74"
  }
  if (!info.google_map) {
    info.google_map = `https://www.google.com.tw/maps/search/${info.name}/`
  }

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

// delete
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id)
  return Restaurant.deleteOne({ id })
    .then(() => res.redirect('/'))
})

module.exports = router