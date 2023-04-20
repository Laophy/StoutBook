import Express from 'express'

// Create a new router
const DataRouter = new Express.Router()

DataRouter.get('/', async (_req, res, _next) => {
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

// Making the dataRouter available in other files
export default DataRouter
