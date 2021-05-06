// this route will conduct to detail related( detail page/ edit page/ delete)

const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/:id', (req, res) => {
  const id = Number(req.params.id)

  Restaurant.find({ id })
    .lean()
    .then(findRestaurant => {
      let theRestaurant = {}
      theRestaurant = findRestaurant[0]
      console.log(theRestaurant)
      res.render('show', { theRestaurant })
    })
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id)
  return Restaurant.deleteOne({ id })
    .then(() => res.redirect('/'))
})

module.exports = router