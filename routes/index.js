const express = require('express')
const router = express.Router()

const imageController = require('../controllers/imageController')

module.exports = function () {
  router.post('/image', imageController.add)
  router.get('/image', imageController.show)
  router.get('/image/:id', imageController.showById)
  router.get('/image/label/:label', imageController.showByLabel)
  router.delete('/image/:id', imageController.deleteById)
  return router
}
