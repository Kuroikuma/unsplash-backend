require('./db/mongoDB.js')
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
    ],
    preflightContinue: false,
  },
})

io.on('connection', (socket) => {
  console.log('New client connected')
  socket.on('addImage', async (response) => {
    console.log(response)
    const showEmit = await imageController.show()
    io.emit('loadImage', showEmit)
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected')
  })
})

server.listen(process.env.PORT || 3001, function () {
  console.log(`Server de Portafolio levantado en Port:${process.env.PORT}`)
})
