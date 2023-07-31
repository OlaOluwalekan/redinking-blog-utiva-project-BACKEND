const express = require('express')
const {
  createPost,
  getAllPosts,
  getSinglePost,
  updatePost,
  deletePost,
  getAllPostsByUserId,
  getSinglePostBySlug,
  likePost,
  getAllPostsByUsername,
  getNewestPost,
  getPostByUserInterest,
} = require('../controllers/postsController')
const auth = require('../middleware/authorization')
const router = express.Router()

router.route('/').post(auth, createPost).get(getAllPosts)
router
  .route('/posts/:id')
  .get(getSinglePost)
  .put(auth, updatePost)
  .delete(auth, deletePost)
router.route('/slug/:slug').get(getSinglePostBySlug)
router.route('/actions/like/:id').put(likePost)
router.route('/dashboard').get(auth, getAllPostsByUserId)
router.route('/view/:username').get(getAllPostsByUsername)
router.route('/latest').get(getNewestPost)
router.route('/interests').get(auth, getPostByUserInterest)

module.exports = router
