const { Schema, model } = require('mongoose')

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
    },
    password: {
      type: String,
      required: [true, 'please enter your password'],
    },
  },
  { timestamps: true }
)
