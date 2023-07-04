const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')

const registerUser = async (req, res) => {
  const newUser = await User.create(req.body)
  const { password, ...rest } = newUser._doc
  res.status(StatusCodes.OK).json({ user: rest })
}

const loginUser = (req, res) => {
  res.send('login user')
}

module.exports = { registerUser, loginUser }
