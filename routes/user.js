const express = require('express')
const {
  getUser,
  updateUser,
  viewUser,
  bookmarkPost,
  followCreator,
  userFollowing,
  getAllUsers,
} = require('../controllers/userController')
const auth = require('../middleware/authorization')
const router = express.Router()

router.route('/dashboard/:id').get(auth, getUser)
router.route('/dashboard').put(auth, updateUser)
router.route('/post/bookmarks').put(auth, bookmarkPost)
router.route('/view/:id').get(viewUser)
router.route('/follow').put(auth, followCreator)
router.route('/follow/:id').put(userFollowing)
router.route('/all').get(getAllUsers)

module.exports = router
