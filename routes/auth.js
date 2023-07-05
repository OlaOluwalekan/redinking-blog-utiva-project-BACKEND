const express = require('express')
const {
  registerUser,
  loginUser,
  verifyEmail,
  sendNewVerificationEmail,
} = require('../controllers/authController')
const verifyCode = require('../middleware/verifyCode')
const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/verifyEmail').post(verifyCode, verifyEmail)
router.route('/sendVerifyEmail').post(sendNewVerificationEmail)

module.exports = router
