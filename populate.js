require('dotenv').config()

const connectDB = require('./utils/connectDB')
const User = require('./models/User')
const Post = require('./models/Post')

const users = require('./db.json')
const posts = require('./postDB.json')

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    await Post.deleteMany()
    await Post.create(posts)
    console.log('success')
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

// const start = async () => {
//   try {
//     await connectDB(process.env.MONGO_URI)
//     await User.deleteMany()
//     await User.create(users)
//     console.log('success')
//     process.exit(0)
//   } catch (error) {
//     console.log(error)
//     process.exit(1)
//   }
// }

start()
