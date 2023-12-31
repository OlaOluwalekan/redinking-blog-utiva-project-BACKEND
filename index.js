require('dotenv').config()
require('express-async-errors')

// INITIALIZE EXPRESS APP
const express = require('express')
const app = express()

// IMPORT CORS
const cors = require('cors')

// IMPORT ERROR MIDDLEWARE
const notFoundMiddleware = require('./middleware/not-found')
const ErrorHandlerMiddleware = require('./middleware/error-handler')

// UTILS IMPORT - START,
const start = require('./utils/start')

// ROUTES IMPORT
const authRouter = require('./routes/auth')
const postsRouter = require('./routes/posts')
const userRouter = require('./routes/user')
const CommentsRouter = require('./routes/comments')

// USE MIDDLEWARE
// CORS ADDED - ALL ORIGIN FOR NOW
app.use(cors())

// USE JSON PARSER TO PARSE INCOMING REQUEST BODY
app.use(express.json({ limit: '100mb' }))

app.get('/', (req, res) => {
  res.send('<h1>RedInking</h1>')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/post', postsRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/comments', CommentsRouter)

// USE ERROR MIDDLEWARE
app.use(notFoundMiddleware)
app.use(ErrorHandlerMiddleware)

const port = process.env.PORT || 9000

// STARTING APP ON PORT AND CONNECTING TO DB
start(app, port, process.env.MONGO_URI)
