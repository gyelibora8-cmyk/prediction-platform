const pool = require('../config/database')

const getLeaderboard = async (req, res, next) => {
  try {
    const { timeframe = 'all', limit = 100 } = req.query

    let query = `
      SELECT 
        u.id,
        u.name,
        COUNT(p.id) as total_predictions,
        SUM(CASE WHEN p.status = 'won' THEN 1 ELSE 0 END) as won,
        ROUND(SUM(CASE WHEN p.status = 'won' THEN 1 ELSE 0 END) * 100.0 / NULLIF(COUNT(p.id), 0), 2) as accuracy,
        COALESCE(SUM(CASE WHEN p.status = 'won' THEN p.amount ELSE 0 END), 0) as total_points
      FROM users u
      LEFT JOIN predictions p ON u.id = p.user_id
    `

    if (timeframe !== 'all') {
      query += ` WHERE p.created_at >= NOW() - INTERVAL '${timeframe}'`
    }

    query += ` GROUP BY u.id, u.name ORDER BY total_points DESC, accuracy DESC LIMIT $1`

    const result = await pool.query(query, [limit])
    res.json(result.rows)
  } catch (error) {
    next(error)
  }
}

const getUserRank = async (req, res, next) => {
  try {
    const result = await pool.query(`
      SELECT 
        ROW_NUMBER() OVER (ORDER BY SUM(CASE WHEN p.status = 'won' THEN p.amount ELSE 0 END) DESC) as rank,
        u.id,
        u.name,
        COUNT(p.id) as total_predictions,
        SUM(CASE WHEN p.status = 'won' THEN 1 ELSE 0 END) as won,
        ROUND(SUM(CASE WHEN p.status = 'won' THEN 1 ELSE 0 END) * 100.0 / NULLIF(COUNT(p.id), 0), 2) as accuracy,
        COALESCE(SUM(CASE WHEN p.status = 'won' THEN p.amount ELSE 0 END), 0) as total_points
      FROM users u
      LEFT JOIN predictions p ON u.id = p.user_id
      GROUP BY u.id, u.name
      ORDER BY total_points DESC
    `)

    const userRank = result.rows.find(row => row.id === req.user.userId)
    res.json(userRank || { rank: null, message: 'User not ranked yet' })
  } catch (error) {
    next(error)
  }
}

module.exports = { getLeaderboard, getUserRank }
