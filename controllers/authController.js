const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const UnauthenticatedError = require('../errors/unauthenticated')
const BadRequestError = require('../errors/bad-request')

const registerUser = async (req, res) => {
  const newUser = await User.create(req.body)
  const { password, ...rest } = newUser._doc
  const token = newUser.createJWT()
  res.status(StatusCodes.CREATED).json({ user: rest, token })
}

const loginUser = async (req, res) => {
  const { emailOrUsername, userPassword } = req.body
  if (!emailOrUsername || !userPassword) {
    throw new BadRequestError('username/email and password is required')
  }

  const user =
    (await User.findOne({ email: emailOrUsername })) ||
    (await User.findOne({ username: emailOrUsername }))

  if (!user) {
    throw new UnauthenticatedError('invalid username/email or password')
  }

  const passwordIsCorrect = user.comparePassword(userPassword)
  if (!passwordIsCorrect) {
    throw new UnauthenticatedError('invalid username/email or password')
  }

  const { password, ...rest } = user._doc

  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ user: rest, token })
}

module.exports = { registerUser, loginUser }
