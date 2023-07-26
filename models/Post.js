const { Schema, model, Types } = require('mongoose')
const htmlParser = require('html-react-parser')

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
      minlength: [3, 'You must add at least 3 tags'],
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
    slug: {
      type: String,
    },
    isPublished: {
      type: String,
      default: false,
    },
  },
  { timestamps: true }
)

PostSchema.pre('save', function () {
  const noOfWords = this.content.split(' ').length
  const readTimeMin = String(noOfWords / 3 / 60).split('.')[0]
  const readTimeSec = Math.round((noOfWords / 3) % 60)
  this.readTime = `${readTimeMin}minutes ${readTimeSec}seconds`

  const titleText = this.title
  const titleConstruct = titleText.split(' ').join('-')
  this.slug = `${titleConstruct}-${this._id}`
})

module.exports = model('Post', PostSchema)
