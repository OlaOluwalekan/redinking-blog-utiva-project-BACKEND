const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')

const updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  res.status(StatusCodes.OK).json({ user })
}

// USER VIEW HIS OWN INFORMATION
const getUser = async (req, res) => {
  const user = await User.findById(req.params.id)
  const { password, ...rest } = user._doc
  res.status(StatusCodes.OK).json({ user: rest })
}

// VIEW USER - OTHERS VIEW USER INFORMATION
// const viewUser = async

module.exports = { getUser, updateUser }
