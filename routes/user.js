const express = require('express')
const {
  getUser,
  updateUser,
  viewUser,
  bookmarkPost,
} = require('../controllers/userController')
const auth = require('../middleware/authorization')
const router = express.Router()

router.route('/dashboard/:id').get(auth, getUser)
router.route('/dashboard').put(auth, updateUser)
router.route('/post/bookmarks').put(auth, bookmarkPost)
router.route('/view/:id').get(viewUser)

module.exports = router
