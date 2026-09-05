const pool = require('../config/database')
const { v4: uuidv4 } = require('uuid')

const getPredictions = async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT * FROM predictions WHERE status != $1 ORDER BY created_at DESC',
      ['closed']
    )
    res.json(result.rows)
  } catch (error) {
    next(error)
  }
}

const getUserPredictions = async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT * FROM predictions WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.userId]
    )
    res.json(result.rows)
  } catch (error) {
    next(error)
  }
}

const createPrediction = async (req, res, next) => {
  try {
    const { eventId, prediction, amount } = req.body

    if (!eventId || !prediction || !amount) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const predictionId = uuidv4()

    const result = await pool.query(
      'INSERT INTO predictions (id, user_id, event_id, prediction, amount, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [predictionId, req.user.userId, eventId, prediction, amount, 'pending']
    )

    res.status(201).json({
      message: 'Prediction created successfully',
      prediction: result.rows[0],
    })
  } catch (error) {
    next(error)
  }
}

const getPredictionById = async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await pool.query('SELECT * FROM predictions WHERE id = $1', [id])

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Prediction not found' })
    }

    res.json(result.rows[0])
  } catch (error) {
    next(error)
  }
}

module.exports = { getPredictions, getUserPredictions, createPrediction, getPredictionById }
