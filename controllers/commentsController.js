const Comment = require('../models/Comment')
const { StatusCodes } = require('http-status-codes')

const createComment = async (req, res) => {
  req.body.commentedBy = req.user.userId
  req.body.commentingTo = req.params.id
  console.log(req.body)
  const newComment = await Comment.create(req.body)
  res.status(StatusCodes.CREATED).json({ newComment })
}

const getPostComments = async (req, res) => {
  const comments = await Comment.find({ commentingTo: req.params.id })
  res.status(StatusCodes.OK).json({ comments, count: comments.length })
}

const likeComment = async (req, res) => {
  const comment = await Comment.findOneAndUpdate(
    { _id: req.params.id },
    { likes: req.body.likes },
    { new: true, runValidators: true }
  )
  if (!comment) {
    throw new NotFoundError(`The post you seek may have been removed`)
  }
  const comments = await Comment.find({ commentingTo: req.body.postId })
  console.log(comments)
  res.status(StatusCodes.OK).json({ comments })
}

module.exports = { createComment, getPostComments, likeComment }
