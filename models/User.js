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
      lowercase: true,
    },
    username: {
      type: String,
      required: [true, 'please enter your username'],
      unique: true,
      minlength: [5, 'minimum length is 5 characters'],
      // lowercase: true,
      // validate: {
      //   validator: async function (username) {
      //     // Custom validator to check if the username is unique in a case-insensitive way
      //     const user = await this.constructor.findOne({ username: username })
      //     return !user // Return true if the username is unique (case-insensitive)
      //   },
      //   message: 'Username must be unique.',
      // },
    },
    password: {
      type: String,
      required: [true, 'please enter your password'],
      minlength: [4, 'password should have a minimum length of 4 characters'],
    },
    aboutYou: {
      type: String,
      default: '',
    },
    profileImage: {
      type: String,
      default:
        'https://res.cloudinary.com/dyyoorpns/image/upload/v1690124626/RedInking/Static%20Images/User/default-user_anepei.png',
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    interests: {
      type: Array,
      default: [],
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    bookmarks: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
)

// UserSchema.index({ username: 1 }, { collation: { locale: 'en', strength: 1 } })

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
