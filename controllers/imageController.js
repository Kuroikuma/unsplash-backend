const Image = require('../models/imagesModel')

exports.add = (req, res, next) => {
  const image = new Image(req.body)

  image
    .save()
    .then((saveResponse) => {
      res.status(200).json({ mensaje: saveResponse })
    })
    .catch((error) => {
      next(error)
    })
}

exports.show = (req, res, next) => {
  Image.find({})
    .then((respuesta) => {
      res.status(200).json(respuesta)
    })
    .catch((error) => next(error))
}

exports.showById = (req, res, next) => {
  const id = req.params.id
  Image.findById(id)
    .then((image) => {
      res.status(200).json(image)
    })
    .catch((error) => next(error))
}

exports.showByLabel = (req, res, next) => {
  const label = req.params.label
  const ImagesArray = []
  Image.find()
    .then((respuesta) => {
      respuesta.forEach((element) => {
        if (element.label.includes(label)) {
          ImagesArray.push(element)
        }
      })
      res.status(200).json(ImagesArray)
    })
    .catch((error) => next(error))
}

exports.deleteById = (req, res, next) => {
  const id = req.params.id
  Image.findByIdAndRemove(id)
    .then((image) => {
      res.status(204).send(image)
    })
    .catch((error) => next(error))
}
