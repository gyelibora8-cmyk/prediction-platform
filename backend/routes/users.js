const pool = require('../config/database')

const getUserProfile = async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, role, created_at FROM users WHERE id = $1',
      [req.user.userId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json({ user: result.rows[0] })
  } catch (error) {
    next(error)
  }
}

const updateUserProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body
    const { userId } = req.user

    const result = await pool.query(
      'UPDATE users SET name = COALESCE($1, name), email = COALESCE($2, email) WHERE id = $3 RETURNING *',
      [name || null, email || null, userId]
    )

    res.json({ message: 'Profile updated', user: result.rows[0] })
  } catch (error) {
    next(error)
  }
}

const getUserStats = async (req, res, next) => {
  try {
    const result = await pool.query(`
      SELECT 
        COUNT(p.id) as total_predictions,
        SUM(CASE WHEN p.status = 'won' THEN 1 ELSE 0 END) as won,
        SUM(CASE WHEN p.status = 'lost' THEN 1 ELSE 0 END) as lost,
        ROUND(SUM(CASE WHEN p.status = 'won' THEN 1 ELSE 0 END) * 100.0 / NULLIF(COUNT(p.id), 0), 2) as accuracy,
        COALESCE(SUM(CASE WHEN p.status = 'won' THEN p.amount ELSE 0 END), 0) as total_points
      FROM predictions p
      WHERE p.user_id = $1
    `, [req.user.userId])

    res.json(result.rows[0])
  } catch (error) {
    next(error)
  }
}

module.exports = { getUserProfile, updateUserProfile, getUserStats }
