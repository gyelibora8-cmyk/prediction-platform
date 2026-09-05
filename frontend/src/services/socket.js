import io from 'socket.io-client'

const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

let socket = null

export const connectSocket = () => {
  if (socket) return socket

  const token = localStorage.getItem('token')
  socket = io(SOCKET_URL, {
    auth: {
      token,
    },
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
  })

  socket.on('connect', () => {
    console.log('Socket connected')
  })

  socket.on('disconnect', () => {
    console.log('Socket disconnected')
  })

  return socket
}

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}

export const getSocket = () => socket

export const onLeaderboardUpdate = (callback) => {
  if (socket) {
    socket.on('leaderboard:update', callback)
  }
}

export const onPredictionResult = (callback) => {
  if (socket) {
    socket.on('prediction:result', callback)
  }
}

export const onEventClosed = (callback) => {
  if (socket) {
    socket.on('event:closed', callback)
  }
}
