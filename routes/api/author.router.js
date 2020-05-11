const express = require('express');
const router = express.Router();
const createHandleId = require('../../utils/createHandleId');
const transliterate = require("../../utils/transliterate");

// Load validation
const validatePodcastInput = require("../../validation/podcastValidation");

// Load Model
const Author = require('../../database/models/author.model');
const Book = require('../../database/models/book.model');

// @route   GET api/authors/all
// @desk    Get all items by approval status
// @access  Public
router.get('/all', (req, res) => {
  Author.find()
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => console.log("Get all authors err -> ", err));
});

// @route   DELETE api/authors/delete/:authorId
// @desk    Delete author
// @access  Public
router.post("/delete/:authorId", (req, res, next) => {
  Author.findByIdAndDelete(req.params.authorId)
    .then(result => {
      const bookFields = {};
      bookFields.author = "5eb8262b579ef224b8f9c5a5";
      Book.updateMany(
        { author: req.params.authorId },
        { $set: bookFields },
        { new: true }
      )
        .then(result => {
          res.status(200).send({
            success: true,
            data: result,
            message: "Author deleted successfully"
          });
        })
        .catch(err => console.log("Post delete err -> ", err));
    })
    .catch(err => console.log("Author delete err -> ", err));
});

//DEPR
// router.delete("/:authorId", (req, res, next) => {
//   Author.findByIdAndDelete(req.params.authorId)
//     .then(result => {
//       Book.findOneAndDelete({ author: req.params.authorId })
//         .then(result => {
//           res.status(200).send({
//             success: true,
//             data: result,
//             message: "Author and Post deleted successfully"
//           });
//         })
//         .catch(err => console.log("Post delete err -> ", err));
//     })
//     .catch(err => console.log("Author delete err -> ", err));
// });

module.exports = router;
