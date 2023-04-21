import Express from 'express'

import APIRouter from './api/apiRoutes.js'
import cors from 'cors'
import { Server } from 'socket.io'
import https from 'https'

// Local port
const port = 3000

const app = new Express()
app.use(cors())
app.use(Express.json())

const server = https.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: 'GET,PUT,POST,DELETE,OPTIONS'.split(','),
    credentials: true
  }
})

io.on('connection', (socket) => {
  // Someone opens the website and opens the client
  console.log(`User connected: ${socket.id}`)

  socket.on('send_message', (data) => {
    socket.broadcast.emit('receive_message', data)
  })
})

setInterval(() => {
  io.to('clock-room').emit('time', new Date())
}, 1000)
server.listen(3001, err => {
  if (err) console.log(err)
  console.log('Server running on Port 3001')
})

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
  console.log(`Listening on port ${port}`)
})
