const express = require('express')
const { getUser, updateUser } = require('../controllers/userController')
const auth = require('../middleware/authorization')
const router = express.Router()

router.route('/:id').get(getUser).post(auth, updateUser)

module.exports = router
