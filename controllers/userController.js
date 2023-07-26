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

// VIEW USER - OTHERS VIEW USER INFORMATION
const viewUser = async (req, res) => {
  const user = await User.findById(req.params.id)
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

module.exports = { getUser, updateUser, viewUser, bookmarkPost }
