const express = require('express')
const router = express.Router()
const { getEvents, getEventById, createEvent, closeEvent } = require('../routes/events')
const { authorizeAdmin } = require('./auth')

router.get('/', getEvents)
router.get('/:id', getEventById)
router.post('/', authorizeAdmin, createEvent)
router.patch('/:id/close', authorizeAdmin, closeEvent)

module.exports = router
