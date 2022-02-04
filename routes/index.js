const express = require('express')
const router = express.Router()

const imageController = require('../controllers/imageController')

module.exports = function () {
  router.get('/', (req, res) => {
    res.send(`<h1>Hello World<h1>`)
  })
  router.post('/api/image', imageController.add)
  router.get('/api/image', imageController.show)
  router.get('/api/image/:id', imageController.showById)
  router.get('/api/image/label/:label', imageController.showByLabel)
  router.delete('/api/image/:id', imageController.deleteById)
  return router
}
