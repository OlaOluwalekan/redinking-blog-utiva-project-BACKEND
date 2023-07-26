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
  bookmarkPost,
} = require('../controllers/postsController')
const auth = require('../middleware/authorization')
const router = express.Router()

router.route('/').post(auth, createPost).get(getAllPosts)
router
  .route('/:id')
  .get(getSinglePost)
  .put(auth, updatePost)
  .delete(auth, deletePost)
router.route('/slug/:slug').get(getSinglePostBySlug)
router.route('/actions/like/:id').put(likePost)
router.route('/actions/bookmark/:id').put(bookmarkPost)
// router.route('/dashboard').get(auth, getAllPostsByUserId)

module.exports = router
