const Post = require('../models/Post')
const { StatusCodes } = require('http-status-codes')

// CREATE POST
const createPost = async (req, res) => {
  req.body.createdBy = req.user.userId
  const newPost = await Post.create(req.body)
  res.status(StatusCodes.CREATED).json({ newPost })
}

// GET POST
const getAllPosts = async (req, res) => {
  const posts = await Post.find({})
  res.status(StatusCodes.OK).json({ posts, count: posts.length })
}

// GET SINGLE POST
const getSinglePost = async (req, res) => {
  const post = await Post.findById(req.params.id)
  res.status(StatusCodes.OK).json({ post })
}
const getRandomPosts = async (req, res) => {
  res.send('getRandom post')
}
const updatePost = async (req, res) => {
  res.send('update post')
}
const deletePost = async (req, res) => {
  res.send('delete post')
}

module.exports = {
  createPost,
  getAllPosts,
  getSinglePost,
  getRandomPosts,
  updatePost,
  deletePost,
}
