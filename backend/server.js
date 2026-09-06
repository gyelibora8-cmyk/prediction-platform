require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const http = require('http')
const socketIo = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketIo(server, {
  cors: { origin: process.env.FRONTEND_URL || '*', methods: ['GET','POST'] }
})

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

function safeLoad(path){
  try{
    const mod = require(path)
    const loaded = mod.default || mod.router || mod
    console.log('LOADED '+path)
    return loaded
  }catch(e){
    console.log('FAIL '+path+' '+e.message)
    return null
  }
}

let auth = safeLoad('./middleware/auth')
let authenticateToken = null
if(auth){
  authenticateToken = auth.authenticateToken || auth.default || auth
  if(typeof authenticateToken !== 'function'){
    console.log('auth not function, using dummy')
    authenticateToken = (req,res,next)=>next()
  }
} else {
  authenticateToken = (req,res,next)=>next()
}

const authRoutes = safeLoad('./routes/auth')
const predictionsRoutes = safeLoad('./routes/predictions')
const leaderboardRoutes = safeLoad('./routes/leaderboard')
const paymentsRoutes = safeLoad('./routes/payments')
const eventsRoutes = safeLoad('./routes/events')
const usersRoutes = safeLoad('./routes/users')

if(authRoutes) app.use('/api/auth', authRoutes)
if(predictionsRoutes) app.use('/api/predictions', authenticateToken, predictionsRoutes)
if(leaderboardRoutes) app.use('/api/leaderboard', leaderboardRoutes)
if(paymentsRoutes) app.use('/api/payments', authenticateToken, paymentsRoutes)
if(eventsRoutes) app.use('/api/events', eventsRoutes)
if(usersRoutes) app.use('/api/users', authenticateToken, usersRoutes)

app.get('/health', (req,res)=> res.json({status:'OK'}))
app.get('/api/health', (req,res)=> res.json({status:'OK'}))

app.use((err,req,res,next)=>{
  console.error(err.stack)
  res.status(err.status||500).json({message:err.message||'Error'})
})

io.on('connection', (socket)=>{
  console.log('New client:', socket.id)
  socket.on('disconnect', ()=> console.log('Client disconnected:', socket.id))
  socket.on('leaderboard:subscribe', ()=> socket.join('leaderboard'))
  socket.on('prediction:subscribe', (eventId)=> socket.join('event:'+eventId))
})

app.set('io', io)

const PORT = process.env.PORT || 5000
server.listen(PORT, '0.0.0.0', ()=> console.log('Server running on port '+PORT))
module.exports = { app, io }
