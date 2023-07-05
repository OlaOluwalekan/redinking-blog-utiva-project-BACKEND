const express = require('express')
const {
  createPost,
  getAllPosts,
  getSinglePost,
} = require('../controllers/postsController')
const auth = require('../middleware/authorization')
const router = express.Router()

router.route('/').post(auth, createPost).get(getAllPosts)
router.route('/:id').get(getSinglePost)

module.exports = router
