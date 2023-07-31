const { default: mongoose } = require('mongoose')
const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')

const updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user.userId, req.body, {
    new: true,
    runValidators: true,
  })
  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ user, token })
}

// USER VIEW HIS OWN INFORMATION
const getUser = async (req, res) => {
  const user = await User.findById(req.params.id)
  const { password, ...rest } = user._doc
  res.status(StatusCodes.OK).json({ user: rest })
}

// VIEW USER - OTHERS VIEW USER INFORMATION - BY ID
const viewUser = async (req, res) => {
  let user
  const isValidId = mongoose.Types.ObjectId.isValid(req.params.id)
  if (isValidId) {
    user = await User.findById(req.params.id)
  } else {
    user = await User.findOne({ username: req.params.id })
  }
  const { password, interests, bookmarks, ...rest } = user._doc
  res.status(StatusCodes.OK).json({ user: rest })
}

// VIEW USER - OTHERS VIEW USER INFORMATION - BY USERNAME
const viewUser2 = async (req, res) => {
  const user = await User.find({ username: req.params.id })
  const { password, interests, bookmarks, ...rest } = user._doc
  res.status(StatusCodes.OK).json({ user: rest })
}

//  BOOKMARKS A POST
const bookmarkPost = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user.userId, req.body, {
    new: true,
    runValidators: true,
  })
  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ user, token })
}

// FOLLOW USER
const followCreator = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user.userId, req.body, {
    new: true,
    runValidators: true,
  })
  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ user, token })
}

const userFollowing = async (req, res) => {
  const creator = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  res.status(StatusCodes.OK).json({ creator })
}

const getAllUsers = async (req, res) => {
  const users = await User.find({}).select({ _id: 1 })
  res.status(StatusCodes.OK).json({ users })
}

module.exports = {
  getUser,
  updateUser,
  viewUser,
  bookmarkPost,
  followCreator,
  userFollowing,
  getAllUsers,
}
