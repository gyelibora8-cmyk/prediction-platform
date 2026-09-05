const express = require('express')
const router = express.Router()
const { getPredictions, getUserPredictions, createPrediction, getPredictionById } = require('../routes/predictions')

router.get('/', getPredictions)
router.post('/', createPrediction)
router.get('/user', getUserPredictions)
router.get('/:id', getPredictionById)

module.exports = router
