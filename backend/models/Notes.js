const mongoose = require('mongoose')
const { schema } = require('./User')
const User = require('./User')

const notesSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    tags: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Notes', notesSchema)
