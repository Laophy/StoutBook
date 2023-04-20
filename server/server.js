import Express from 'express'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'

// Local port
const port = 3000
const app = new Express()

app.use(cors())
app.use(Express.json())

// Universal logging route
app.use((req, res, next) => {
  console.log(`${req.method} request at ${req.url}`)
  next()
})

app.get('/healthcheck', async (_req, res, _next) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now()
  }
  try {
    res.send(healthcheck)
  } catch (error) {
    healthcheck.message = error
    res.status(503).send()
  }
})

app.get('/', (req, res) => {
  res.status(200).send('Healthy code!')
})

app.listen(port, () => {
  console.log('Health check server is now up on port: ' + port)
})

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
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
