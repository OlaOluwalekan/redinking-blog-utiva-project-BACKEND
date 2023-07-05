const { Schema, model } = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const generateCode = require('generate-six-digit-readable-code')
const { sendVerificationEmail } = require('../mailer/verificationEmail')

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      default: '',
    },
    lastName: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      required: [true, 'please enter your email'],
      unique: true,
    },
    username: {
      type: String,
      required: [true, 'please enter your username'],
      unique: true,
      minlength: [5, 'minimum length is 5 characters'],
    },
    password: {
      type: String,
      required: [true, 'please enter your password'],
      minlength: [4, 'password should have a minimum length of 4 characters'],
    },
    profileImage: {
      type: String,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.generateCode = function () {
  const code = generateCode()
  sendVerificationEmail({ email: this.email, code })
  return jwt.sign(
    { userId: this._id, verificationCode: code },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  )
}

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, username: this.username },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )
}

UserSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password)
  return isMatch
}

module.exports = model('User', UserSchema)
