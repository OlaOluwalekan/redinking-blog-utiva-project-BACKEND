const Post = require('../models/Post')
const { StatusCodes } = require('http-status-codes')
const NotFoundError = require('../errors/not-found')
const User = require('../models/User')

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

// GET NEWEST POST
const getNewestPost = async (req, res) => {
  const date = new Date()
  const post = await Post.find({}).sort({ createdAt: -1 }).limit(5)
  res.status(StatusCodes.OK).json({ post })
}

// GET POST BY USER'S INTEREST
const getPostByUserInterest = async (req, res) => {
  const user = await User.findById(req.user.userId)
  const interests = user.interests
  const posts = await Post.find({})
  const userInterest = posts.filter((post) => {
    return post.tags.some((tag) => interests.includes(tag))
  })
  res
    .status(StatusCodes.OK)
    .json({ posts: interests.length === 0 ? posts : userInterest })
}

// GET ALL POSTS CREATED BY A PARTICULAR USER
const getAllPostsByUserId = async (req, res) => {
  const posts = await Post.find({ createdBy: req.user.userId })
  res.status(StatusCodes.OK).json({ posts, count: posts.length })
}

// GET ALL POSTS BY USER ID
const getAllPostsByUsername = async (req, res) => {
  const user = await User.findOne({ username: req.params.username })
  if (!user) {
    throw new NotFoundError(`No user found`)
  }
  const posts = await Post.find({ createdBy: user?._id })
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

module.exports = {
  createPost,
  getAllPosts,
  getSinglePost,
  getRandomPosts,
  updatePost,
  deletePost,
  getAllPostsByUserId,
  getAllPostsByUsername,
  getSinglePostBySlug,
  likePost,
  getNewestPost,
  getPostByUserInterest,
}
