const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  handle: {
    type: String,
    required: true
  },
  link: {
    type: String
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  },
  changedDate: {
    type: Date
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = Book = mongoose.model("Book", bookSchema);