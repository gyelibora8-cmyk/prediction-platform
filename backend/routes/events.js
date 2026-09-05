const pool = require('../config/database')
const { v4: uuidv4 } = require('uuid')

const getEvents = async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT * FROM events WHERE status != $1 ORDER BY created_at DESC',
      ['closed']
    )
    res.json(result.rows)
  } catch (error) {
    next(error)
  }
}

const getEventById = async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await pool.query('SELECT * FROM events WHERE id = $1', [id])

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Event not found' })
    }

    res.json(result.rows[0])
  } catch (error) {
    next(error)
  }
}

const createEvent = async (req, res, next) => {
  try {
    const { title, description, category, closesAt } = req.body

    if (!title || !description || !category || !closesAt) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const eventId = uuidv4()

    const result = await pool.query(
      'INSERT INTO events (id, title, description, category, closes_at, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [eventId, title, description, category, closesAt, 'open']
    )

    res.status(201).json({
      message: 'Event created successfully',
      event: result.rows[0],
    })
  } catch (error) {
    next(error)
  }
}

const closeEvent = async (req, res, next) => {
  try {
    const { id } = req.params
    const { result } = req.body

    if (!result || !['up', 'down'].includes(result.toLowerCase())) {
      return res.status(400).json({ message: 'Invalid result. Must be up or down' })
    }

    await pool.query(
      'UPDATE events SET status = $1, result = $2 WHERE id = $3',
      ['closed', result.toLowerCase(), id]
    )

    // Update prediction statuses
    await pool.query(
      `UPDATE predictions 
       SET status = CASE WHEN prediction = $1 THEN 'won' ELSE 'lost' END 
       WHERE event_id = $2`,
      [result.toLowerCase(), id]
    )

    res.json({ message: 'Event closed successfully' })
  } catch (error) {
    next(error)
  }
}

module.exports = { getEvents, getEventById, createEvent, closeEvent }
