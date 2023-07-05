const { Schema, model, Types } = require('mongoose')

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'your post must have a title'],
    },
    subTitle: {
      type: String,
    },
    image: {
      type: String,
      required: [true, 'please add an image that describes your post'],
    },
    readTime: {
      type: String,
    },
    tags: {
      type: Array,
      default: [],
    },
    views: {
      type: Array,
      default: [],
    },
    likes: {
      type: Array,
      default: [],
    },
    comments: {
      type: Array,
      default: [],
    },
    createdBy: {
      type: Types.ObjectId,
      required: [true, 'post creator id is needed'],
    },
    content: {
      type: String,
      required: [true, 'your post must have some contents'],
    },
  },
  { timestamps: true }
)

PostSchema.pre('save', function () {
  const noOfWords = this.content.split(' ').length
  const readTimeMin = String(noOfWords / 3 / 60).split('.')[0]
  const readTimeSec = Math.round((noOfWords / 3) % 60)
  this.readTime = `${readTimeMin}minutes ${readTimeSec}seconds`
})

module.exports = model('Post', PostSchema)
