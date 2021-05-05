const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.post('/:id', (req, res) => {
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

module.exports = router