const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const UnauthenticatedError = require('../errors/unauthenticated')
const BadRequestError = require('../errors/bad-request')

const registerUser = async (req, res) => {
  const newUser = await User.create(req.body)
  const { password, ...rest } = newUser._doc
  const token = newUser.createJWT()
  const codeToken = newUser.generateCode()
  console.log(codeToken)
  res.status(StatusCodes.CREATED).json({ user: rest, token, codeToken })
}

const verifyEmail = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.userId,
    { emailVerified: true },
    { new: true, runValidators: true }
  )
  const { password, ...rest } = user._doc
  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ user: rest, token })
}

const sendNewVerificationEmail = async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  const { password, ...rest } = user._doc
  const codeToken = user.generateCode()
  res.status(StatusCodes.CREATED).json({ user: rest, codeToken })
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

  const passwordIsCorrect = await user.comparePassword(userPassword)
  if (!passwordIsCorrect) {
    throw new UnauthenticatedError('invalid username/email or password')
  }

  // if (!user.emailVerified) {
  //   res.redirect('http://localhost:5173/auth/register')
  //   throw new UnauthenticatedError('You need to verify your email')
  // }

  const { password, ...rest } = user._doc

  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ user: rest, token })
}

const checkUsername = async (req, res) => {
  const user = await User.findOne({ username: req.query.username })
  if (user) {
    return res.status(StatusCodes.OK).json({ msg: 'username taken' })
  }
  res.status(StatusCodes.OK).json({ msg: 'username available' })
}

module.exports = {
  registerUser,
  loginUser,
  verifyEmail,
  sendNewVerificationEmail,
  checkUsername,
}
