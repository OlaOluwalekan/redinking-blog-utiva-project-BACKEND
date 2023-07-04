const { StatusCodes } = require('http-status-codes')

const ErrorHandlerMiddleware = (err, req, res, next) => {
  // INITIALIZE ERROR VALUES
  let customError = {
    type: 'others',
    message: err.message || 'something went wrong',
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    errorFields: [],
    fieldsMessage: [],
  }

  // SETUP VALIDATION ERROR
  if (err.name === 'ValidationError') {
    customError.type = err.name
    customError.statusCode = StatusCodes.BAD_REQUEST
    const construct = Object.values(err.errors)
    construct.forEach((item) => {
      // console.log('=========================')
      // console.log(item.message)
      customError.errorFields.push(item.path)
      customError.fieldsMessage.push(item.message)
    })
  }

  // SETUP UNIQUE VALUE ERROR
  if (err.code && err.code === 11000) {
    customError.type = 'uniqueValue'
    customError.statusCode = StatusCodes.BAD_REQUEST
    customError.errorFields = Object.keys(err.keyValue)
    construct = `${customError.errorFields[0]} ${
      err.keyValue[customError.errorFields[0]]
    } is already ${
      customError.errorFields[0] === 'username' ? 'taken' : 'registered'
    }`
    customError.fieldsMessage.push(construct)
  }

  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
  return res.status(customError.statusCode).json({
    type: customError.type,
    message: customError.message,
    fields: customError.errorFields,
    errMessages: customError.fieldsMessage,
  })
}

module.exports = ErrorHandlerMiddleware
