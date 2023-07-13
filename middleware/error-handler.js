const { StatusCodes } = require('http-status-codes')

const ErrorHandlerMiddleware = (err, req, res, next) => {
  // INITIALIZE ERROR VALUES
  let customError = {
    message: err.message || 'something went wrong',
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
  }

  // SETUP VALIDATION ERROR
  if (err.name === 'ValidationError') {
    customError.statusCode = StatusCodes.BAD_REQUEST
    const construct = Object.values(err.errors)
      .map((item) => item.message)
      .join(', ')
    customError.message = construct
  }

  // SETUP UNIQUE VALUE ERROR
  if (err.code && err.code === 11000) {
    customError.statusCode = StatusCodes.BAD_REQUEST
    customError.errorFields = Object.keys(err.keyValue)
    construct = `${Object.keys(err.keyValue)[0]} ${
      err.keyValue[Object.keys(err.keyValue)[0]]
    } is already ${
      Object.keys(err.keyValue)[0] === 'username' ? 'taken' : 'registered'
    }`
    customError.message = construct
  }

  // SETUP UNAUTHENTICATED ERROR
  if (err.type === 'unauthenticatedError') {
    customError.type = 'unauthenticatedError'
  }

  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  return res.status(customError.statusCode).json({
    message: customError.message,
  })
}

module.exports = ErrorHandlerMiddleware
