const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')

const updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  res.status(StatusCodes.OK).json({ user })
}

const getUser = async (req, res) => {
  const user = await User.findById(req.params.id)
  const { password, ...rest } = user._doc
  res.status(StatusCodes.OK).json({ user: rest })
}

module.exports = { getUser, updateUser }
