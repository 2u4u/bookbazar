const express = require('express');
const router = express.Router();
const createHandleId = require('../../utils/createHandleId');
const transliterate = require("../../utils/transliterate");

// Load validation
const validatePodcastInput = require("../../validation/podcastValidation");

// Load Model
const Author = require('../../database/models/author.model');
const Book = require('../../database/models/book.model');

// @route   POST api/items/add
// @desk    Add post
// @access  Public - TODO Private
router.post("/add", (req, res) => {
  // const { errors, isValid } = validatePodcastInput(req.body);

  // if (!isValid) {
  //   errors.summary = "Please check your form for errors";
  //   return res.status(400).json(errors);
  // }
  //limiting length with 20 symbols + "_" + hash
  // handle = (handle.length > 20) ? handle.slice(0, 20) + "_" + createHandleId(handle) : handle + "_" + createHandleId(handle);

  let handle = transliterate(req.body.author.value);
  handle = handle.replace(/[^a-zA-Z0-9-_]/g, '_').replace(/__/g, '');

  Author.findOne({ handle })
    .then(author => {
      if (author) {
        //if such author already exists
        addBook(req.body.name, author._id, res, req)
      } else {
        //if book with such name doesn't exist, then create new Author
        let reqAuhtor = {
          handle,
          name: req.body.author.value,
        };

        const newAuthor = new Author(reqAuhtor);
        newAuthor
          .save()
          .then(result => {
            addBook(req.body.name, result._id, res, req)
          })
          .catch(err => console.log("Create new author error -> ", err))

      }
    })
    .catch(err => console.log("Add book err -> ", err))
})

const addBook = (name, author, res) => {
  let handle = transliterate(name);
  handle = handle.replace(/[^a-zA-Z0-9-_]/g, '_').replace(/__/g, '')
  Book.findOne({ handle })
    .then(book => {
      if (book) {
        //if book with such name already exists, then replace fields
        const bookFields = {};

        if (name) bookFields.name = name;
        bookFields.changedDate = Date.now()
        Book.findOneAndUpdate(
          { handle: handle },
          { $set: bookFields },
          { new: true }
        )
          .then(result =>
            res.status(201).send({
              success: true,
              data: result,
              message: "Book updated successfully"
            })
          )
          .catch(err => console.log("Book update err -> ", err));
        // } else if (book && !req.body.handle) {
        //   errors.name = "You already have book with such name";
        //   errors.summary = "Please check your form for errors";
        //   return res.status(400).json(errors);
      } else {
        //if book with such name doesn't exist, then create new
        let reqBook = {
          handle,
          name: name,
          author: author,
        };
        const newBook = new Book(reqBook);
        newBook
          .save()
          .then(result => {
            res.status(201).send({
              success: true,
              data: result,
              message: "Book created successfully"
            });
          })
          .catch(err => console.log("Create new book error -> ", err))
      }
    })
    .catch(err => console.log("Add book err -> ", err))
}

// @route   GET api/books/all
// @desk    Get all books
// @access  Public
router.get('/all', (req, res) => {
  Book.find()
    .populate("author")
    .then(result => res.status(200).send(result))
    .catch(err => console.log("Get all books err -> ", err));
});

// @route   GET api/book/author/:authorId
// @desk    Get books by author
// @access  Public
router.get('/author/:authorId', (req, res, next) => {
  Book.find({ author: req.params.authorId })
    .then(result => res.status(200).send(result))
    .catch(err => console.log("Get books by author err -> ", err));
});

// @route   DELETE api/books/:bookId
// @desk    Delete book
// @access  Public
router.delete("/:bookId", (req, res, next) => {
  Book.findByIdAndDelete(req.params.bookId)
    .then(result => {
      res.status(200).send({
        success: true,
        data: result,
        message: "Post deleted successfully"
      });
    })
    .catch(err => console.log("Post delete err -> ", err));
});

// @route   GET api/books/detailed/:book_id
// @desk    Get detailed book
// @access  Public
router.get("/detailed/:book_id", (req, res) => {
  Book.findById(req.params.book_id)
    .then(result => res.status(200).send(result))
    .catch(err => console.log("Book show detailed err -> ", err));
});

module.exports = router;
