import Express from 'express'

import APIRouter from './api/apiRoutes.js'
import { Server } from 'socket.io'

// Local port
const port = 3000
const app = new Express()
const io = new Server(3001)

io.on('connection', (socket) => {
  // Someone opens the website and opens the client
  console.log(`User connected: ${socket.id}`)

  socket.on('send_message', (data) => {
    socket.broadcast.emit('receive_message', data)
  })

  // Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
    console.log('A user disconnected')
  })
})

// Universal logging route
app.use((req, res, next) => {
  console.log(`${req.method} request at ${req.url}`)
  next()
})

// Attach the movie routes
app.use('/data', APIRouter)

app.use(Express.json())

// Final static file route
app.use(Express.static('./public'))

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
