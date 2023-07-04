require('dotenv').config()
require('express-async-errors')

// INITIALIZE EXPRESS APP
const express = require('express')
const app = express()

// IMPORT ERROR MIDDLEWARE
const notFoundMiddleware = require('./middleware/not-found')
const ErrorHandlerMiddleware = require('./middleware/error-handler')

const start = require('./utils/start')

app.get('/', (req, res) => {
  res.send('<h1>RedInking</h1>')
})

// USE MIDDLEWARE
app.use(notFoundMiddleware)
app.use(ErrorHandlerMiddleware)

const port = process.env.PORT || 9000

start(app, port)
