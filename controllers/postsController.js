const Post = require('../models/Post')
const { StatusCodes } = require('http-status-codes')
const NotFoundError = require('../errors/not-found')

// CREATE POST
const createPost = async (req, res) => {
  req.body.createdBy = req.user.userId
  const newPost = await Post.create(req.body)
  res.status(StatusCodes.CREATED).json({ newPost })
}

// GET ALL POSTS
const getAllPosts = async (req, res) => {
  const posts = await Post.find({})
  res.status(StatusCodes.OK).json({ posts, count: posts.length })
}

// GET ALL POSTS CREATED BY A PARTICULAR USER
const getAllPostsByUserId = async (req, res) => {
  const posts = await Post.find({ createdBy: req.user.userId })
  res.status(StatusCodes.OK).json({ posts, count: posts.length })
}

// GET SINGLE POST BY POST ID
const getSinglePost = async (req, res) => {
  const post = await Post.findById(req.params.id)
  if (!post) {
    throw new NotFoundError(`The post you seek may have been removed`)
  }
  res.status(StatusCodes.OK).json({ post })
}

// GET SINGLE POST BY SLUG
const getSinglePostBySlug = async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug })
  if (!post) {
    throw new NotFoundError(`The post you seek may have been removed`)
  }
  res.status(StatusCodes.OK).json({ post })
}

const getRandomPosts = async (req, res) => {
  res.send('getRandom post')
}

const updatePost = async (req, res) => {
  const post = await Post.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.user.userId },
    req.body,
    { new: true, runValidators: true }
  )
  if (!post) {
    throw new NotFoundError(`The post you seek may have been removed`)
  }
  res.status(StatusCodes.OK).json({ post })
}

const deletePost = async (req, res) => {
  const post = await Post.findOneAndDelete({
    _id: req.params.id,
    createdBy: req.user.userId,
  })
  if (!post) {
    throw new NotFoundError(`The post you seek may have been removed`)
  }
  res.status(StatusCodes.OK).send('post deleted')
}

const likePost = async (req, res) => {
  const post = await Post.findOneAndUpdate(
    { _id: req.params.id },
    { likes: req.body },
    { new: true, runValidators: true }
  )
  if (!post) {
    throw new NotFoundError(`The post you seek may have been removed`)
  }
  res.status(StatusCodes.OK).json({ post })
}

const bookmarkPost = async (req, res) => {
  const post = await Post.findOneAndUpdate(
    { _id: req.params.id },
    { likes: req.body },
    { new: true, runValidators: true }
  )
  if (!post) {
    throw new NotFoundError(`The post you seek may have been removed`)
  }
  res.status(StatusCodes.OK).json({ post })
}

module.exports = {
  createPost,
  getAllPosts,
  getSinglePost,
  getRandomPosts,
  updatePost,
  deletePost,
  getAllPostsByUserId,
  getSinglePostBySlug,
  likePost,
  bookmarkPost,
}
