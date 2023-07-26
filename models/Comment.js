const { Schema, model, Types } = require('mongoose')

const CommentSchema = new Schema(
  {
    commentedBy: {
      type: Types.ObjectId,
    },
    commentingTo: {
      type: String,
    },
    content: {
      type: String,
      required: [true, 'Please write something'],
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
)

module.exports = model('Comment', CommentSchema)
