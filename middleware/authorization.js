const jwt = require('jsonwebtoken')
const UnauthenticatedError = require('../errors/unauthenticated')

const auth = async (req, res, next) => {
  // CHECK HEADER
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('You are not authorized')
  }

  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { userId: payload.userId, username: payload.username }
    next()
  } catch (error) {
    throw new UnauthenticatedError('You are not authorized')
  }
}

module.exports = auth
