const mongoose = require('mongoose');
const podcastSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  handle: {
    type: String,
    required: true
  },
  authors: {
    type: Array,
  },
  description: {
    type: String,
  },
  date: {
    type: Date
  },
  recommendations: [
    {
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
      },
      book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
      }
    }
  ],
  changedDate: {
    type: Date
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = Podcast = mongoose.model("Podcast", podcastSchema);