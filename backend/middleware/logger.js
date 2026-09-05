// Logger middleware
const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`)
  next()
}

const errorHandler = (err, req, res, next) => {
  console.error(err)
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {},
  })
}

module.exports = { logger, errorHandler }
