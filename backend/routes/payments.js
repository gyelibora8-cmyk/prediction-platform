const pool = require('../config/database')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const { v4: uuidv4 } = require('uuid')

const createPaymentIntent = async (req, res, next) => {
  try {
    const { amount, predictionId } = req.body

    if (!amount || !predictionId) {
      return res.status(400).json({ message: 'Amount and predictionId are required' })
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      metadata: { predictionId, userId: req.user.userId },
    })

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    })
  } catch (error) {
    next(error)
  }
}

const confirmPayment = async (req, res, next) => {
  try {
    const { paymentIntentId } = req.body

    if (!paymentIntentId) {
      return res.status(400).json({ message: 'Payment intent ID is required' })
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    if (paymentIntent.status !== 'succeeded') {
      return res.status(400).json({ message: 'Payment failed' })
    }

    const paymentId = uuidv4()
    await pool.query(
      'INSERT INTO payments (id, user_id, amount, payment_intent_id, status) VALUES ($1, $2, $3, $4, $5)',
      [paymentId, req.user.userId, paymentIntent.amount / 100, paymentIntentId, 'completed']
    )

    res.json({ message: 'Payment confirmed', paymentId })
  } catch (error) {
    next(error)
  }
}

const getPaymentHistory = async (req, res, next) => {
  try {
    const result = await pool.query(
      'SELECT * FROM payments WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.userId]
    )
    res.json(result.rows)
  } catch (error) {
    next(error)
  }
}

module.exports = { createPaymentIntent, confirmPayment, getPaymentHistory }
