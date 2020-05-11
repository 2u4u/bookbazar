const mongoose = require('mongoose');
const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  handle: {
    type: String,
    required: true
  },
  changedDate: {
    type: Date
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = Author = mongoose.model("Author", authorSchema);