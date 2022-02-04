require('./db/mongoDB.js')
const Image = require('./models/imagesModel')
const http = require('http')
const socketIo = require('socket.io')
const imageController = require('./controllers/imageController')
const app = require('./app')

const server = http.createServer(app)

const io = socketIo(server, {
  cors: {
    allowedHeaders: [
      'X-ACCESS_TOKEN',
      'Access-Control-Allow-Origin',
      'Authorization',
      'Origin',
      'x-requested-with',
      'Content-Type',
      'Content-Range',
      'Content-Disposition',
      'Content-Description',
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: [
      'https://kuroikuma.github.io/unsplash-app/',
      'https://kuroikuma.github.io/unsplash-app',
      'https://kuroikuma.github.io',
      'http://localhost:3000',
    ],
    preflightContinue: false,
  },
})

let interval

io.on('connection', (socket) => {
  console.log('New client connected')

  socket.on('client:addImage', (response) => {
    console.log(response)
    if (interval) {
      clearTimeout(interval)
    }
    interval = setTimeout(() => {
      getApiAndEmit(socket)
    }, 1000)
  })

  socket.on('client:deleteImage', (response) => {
    console.log(response)
    if (interval) {
      clearTimeout(interval)
    }
    interval = setTimeout(() => {
      getApiAndEmit(socket)
    }, 1000)
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected')
    clearTimeout(interval)
  })
})

const getApiAndEmit = async (socket) => {
  const showEmit = await Image.find({})
  socket.broadcast.emit('server:loadImage', showEmit)
}

server.listen(process.env.PORT || 3001, function () {
  console.log(`Server de Portafolio levantado en Port:${process.env.PORT}`)
})
