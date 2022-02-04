require('./db/mongoDB.js')
const http = require('http')
const socketIo = require('socket.io')
const imageController = require('./controllers/imageController')
const app = require('./app')

const server = http.createServer(app)

const io = socketIo(server)

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
