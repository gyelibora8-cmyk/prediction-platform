const pool = require('../config/database')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])
    if (result.rows.length > 0) {
      return res.status(400).json({ message: 'Email already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const userId = uuidv4()

    await pool.query(
      'INSERT INTO users (id, name, email, password, role) VALUES ($1, $2, $3, $4, $5)',
      [userId, name, email, hashedPassword, 'user']
    )

    const token = jwt.sign({ userId, email, role: 'user' }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    })

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: userId, name, email, role: 'user' },
    })
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email])
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const user = result.rows[0]
    const validPassword = await bcrypt.compare(password, user.password)

    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const token = jwt.sign({ userId: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    })

    const refreshToken = jwt.sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '30d',
    })

    res.json({
      message: 'Login successful',
      token,
      refreshToken,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    })
  } catch (error) {
    next(error)
  }
}

const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body

    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token required' })
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid refresh token' })
      }

      const newToken = jwt.sign(
        { userId: user.userId },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE }
      )

      res.json({ token: newToken })
    })
  } catch (error) {
    next(error)
  }
}

const getProfile = async (req, res, next) => {
  try {
    const result = await pool.query('SELECT id, name, email, role FROM users WHERE id = $1', [req.user.userId])
    const user = result.rows[0]
    res.json({ user })
  } catch (error) {
    next(error)
  }
}

module.exports = { register, login, refresh, getProfile }
