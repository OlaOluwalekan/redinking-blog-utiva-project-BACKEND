const jwt = require('jsonwebtoken')
const UnauthenticatedError = require('../errors/unauthenticated')

const verifyCode = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('You are not authorized')
  }

  const codeToken = authHeader.split(' ')[1]
  try {
    const payload = jwt.verify(codeToken, process.env.JWT_SECRET)
    if (req.body.verificationCode !== payload.verificationCode) {
      throw new UnauthenticatedError('invalid code or code expired')
    }
    req.userId = payload.userId
    req.verificationCode = payload.verificationCode
    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new UnauthenticatedError('code expired')
    }
    throw new UnauthenticatedError('invalid code')
  }
}

module.exports = verifyCode
