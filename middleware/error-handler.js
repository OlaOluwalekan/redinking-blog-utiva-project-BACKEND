const { StatusCodes } = require('http-status-codes')

const ErrorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    message: err.message,
    statusCode: err.statusCode,
  }

  return res
    .statusCode(customError.statusCode)
    .json({ message: customError.message })
}

module.exports = ErrorHandlerMiddleware
