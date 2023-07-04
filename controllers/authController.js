const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')

const registerUser = async (req, res) => {
  const newUser = await User.create(req.body)
  res.status(StatusCodes.OK).json({ user: newUser })
}

const loginUser = (req, res) => {
  res.send('login user')
}

module.exports = { registerUser, loginUser }
