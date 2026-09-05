const express = require('express')
const router = express.Router()
const { register, login, refresh, getProfile } = require('../routes/auth')

router.post('/register', register)
router.post('/login', login)
router.post('/refresh', refresh)
router.get('/profile', (req, res, next) => {
  // Middleware for auth will be applied in server.js
  getProfile(req, res, next)
})

module.exports = router
