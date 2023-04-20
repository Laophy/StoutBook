import Express from 'express'

import APIRouter from './api/apiRoutes.js'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'

// Local port
const port = 3000

const app = new Express()

app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: 'http://0.0.0.0:3000',
    methods: ['GET', 'POST']
  }
})

io.on('connection', (socket) => {
  // Someone opens the website and opens the client
  console.log(`User connected: ${socket.id}`)

  socket.on('send_message', (data) => {
    socket.broadcast.emit('receive_message', data)
  })
})

server.listen(3001, () => {
  console.log('Socket Server is running! (backend)')
})

app.use(Express.json())

// Universal logging route
app.use((req, res, next) => {
  console.log(`${req.method} request at ${req.url}`)
  next()
})

// Attach the movie routes
app.use('/data', APIRouter)

// Final static file route
app.use(Express.static('./public'))

app.listen(port, () => {
  console.log(`Listening on port http://0.0.0.0:${port}`)
})
