require('dotenv').config()
require('express-async-errors')

// INITIALIZE EXPRESS APP
const express = require('express')
const app = express()

// IMPORT ERROR MIDDLEWARE
const notFoundMiddleware = require('./middleware/not-found')
const ErrorHandlerMiddleware = require('./middleware/error-handler')

// UTILS IMPORT - START,
const start = require('./utils/start')

// ROUTES IMPORT
const authRouter = require('./routes/auth')

app.get('/', (req, res) => {
  res.send('<h1>RedInking</h1>')
})

app.use('/api/v1/auth', authRouter)

// USE MIDDLEWARE
app.use(notFoundMiddleware)
app.use(ErrorHandlerMiddleware)

const port = process.env.PORT || 9000

// STARTING APP ON PORT AND CONNECTING TO DB
start(app, port, process.env.MONGO_URI)
