require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const http = require('http')
const socketIo = require('socket.io')
const authRoutes = require('./routes/auth')
const predictionsRoutes = require('./routes/predictions')
const leaderboardRoutes = require('./routes/leaderboard')
const paymentsRoutes = require('./routes/payments')
const eventsRoutes = require('./routes/events')
const usersRoutes = require('./routes/users')
const { authenticateToken } = require('./middleware/auth')

const app = express()
const server = http.createServer(app)
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
})

// Middleware
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/predictions', authenticateToken, predictionsRoutes)
app.use('/api/leaderboard', leaderboardRoutes)
app.use('/api/payments', authenticateToken, paymentsRoutes)
app.use('/api/events', eventsRoutes)
app.use('/api/users', authenticateToken, usersRoutes)

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK' })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {},
  })
})

// Socket.io connection
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id)

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id)
  })

  // Leaderboard updates
  socket.on('leaderboard:subscribe', () => {
    socket.join('leaderboard')
  })

  // Prediction updates
  socket.on('prediction:subscribe', (eventId) => {
    socket.join(`event:${eventId}`)
  })
})

// Make io available to routes
app.set('io', io)

const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = { app, io }
