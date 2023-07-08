const express = require('express')
const { getUser, updateUser } = require('../controllers/userController')
const auth = require('../middleware/authorization')
const router = express.Router()

router.route('/dashboard/:id').get(auth, getUser).post(auth, updateUser)

module.exports = router
