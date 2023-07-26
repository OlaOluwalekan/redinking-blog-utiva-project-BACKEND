const express = require('express')
const {
  getPostComments,
  createComment,
  likeComment,
} = require('../controllers/commentsController')
const auth = require('../middleware/authorization')
const router = express.Router()

router.route('/create/:id').post(auth, createComment)
router.route('/:id').get(getPostComments)
router.route('/actions/like/:id').put(likeComment)

module.exports = router
