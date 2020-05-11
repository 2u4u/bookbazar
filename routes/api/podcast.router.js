const express = require('express');
const router = express.Router();
const createHandleId = require('../../utils/createHandleId');
const transliterate = require("../../utils/transliterate");

// Load validation
const validatePodcastInput = require("../../validation/podcastValidation");

// Load Model
const Podcast = require('../../database/models/podcast.model');

// @route   POST api/items/add
// @desk    Add podcast
// @access  Public - TODO Private
router.post("/add", (req, res) => {
  const { errors, isValid } = validatePodcastInput(req.body);

  if (!isValid) {
    errors.summary = "Please check your form for errors";
    return res.status(400).json(errors);
  }
  //transliterate in case of cyrillic letters
  let handle = transliterate(req.body.name);
  //removing all URL forbidden symbols 
  handle = handle.replace(/[^a-zA-Z0-9-_]/g, '_').replace(/__/g, '')
  //limiting length with 20 symbols + "_" + hash
  handle = (handle.length > 20) ? handle.slice(0, 20) + "_" + createHandleId(handle) : handle + "_" + createHandleId(handle);

  Podcast.findOne({ handle })
    .then(podcast => {
      if (podcast && req.body.handle) {
        //if podcast with such name already exists, then replace fields
        const podcastFields = {};

        if (req.body.name) podcastFields.name = req.body.name;
        if (req.body.description) podcastFields.description = req.body.description;
        if (req.body.authors) podcastFields.authors = req.body.authors;
        if (req.body.recommendations) podcastFields.recommendations = req.body.recommendations;
        Podcast.findOneAndUpdate(
          { handle: req.body.handle },
          { $set: podcastFields },
          { new: true }
        )
          .then(result =>
            res.status(201).send({
              success: true,
              data: result,
              message: "Podcast created successfully"
            })
          )
          .catch(err => console.log("Podcast update err -> ", err));
      } else if (podcast && !req.body.handle) {
        errors.name = "You already have podcast with such name";
        errors.summary = "Please check your form for errors";
        return res.status(400).json(errors);
      } else {
        //if podcast with such name doesn't exist, then create new
        let reqPodcast = {
          handle,
          name: req.body.name,
          authors: req.body.authors,
          description: req.body.description,
          recommendations: req.body.recommendations,
        };
        const newPodcast = new Podcast(reqPodcast);
        newPodcast
          .save()
          .then(result => {
            res.status(201).send({
              success: true,
              data: result,
              message: "Podcast created successfully"
            });
          })
          .catch(err => console.log("Create new podcast error -> ", err))
      }
    })
    .catch(err => console.log("Add podcast err -> ", err))
})

// @route   GET api/podcasts/all
// @desk    Get all podcasts
// @access  Public
router.get('/all', (req, res, next) => {
  Podcast.find()
    .populate("recommendations.author")
    .populate("recommendations.book")
    .then(result => {
      res.status(200).send(result);
    })
    .catch(err => console.log("Get all podcasts err -> ", err));
});

// @route   DELETE api/podcasts/:podcastId
// @desk    Delete podcast
// @access  Public
router.delete("/:podcastId", (req, res, next) => {
  Podcast.findByIdAndDelete(req.params.podcastId)
    .then(result => {
      res.status(200).send({
        success: true,
        data: result,
        message: "Podcast deleted successfully"
      });
    })
    .catch(err => console.log("Podcast delete err -> ", err));
});

// @route   GET api/podcasts/detailed/:podcastId
// @desk    Get detailed podcast
// @access  Public
router.get("/detailed/:podcastId", (req, res) => {
  Podcast
    .findById(req.params.podcastId)
    .populate("recommendations.author")
    .populate("recommendations.book")
    .then(result => {
      let detailedPodcast = {}
      detailedPodcast._id = result._id;
      detailedPodcast.handle = result.handle;
      detailedPodcast.name = result.name;
      detailedPodcast.description = result.description;
      detailedPodcast.recommendations = result.recommendations.map(recommendation => {
        let newRecommendation = {};
        newRecommendation.author = recommendation.author ? recommendation.author._id : "Deleted";
        newRecommendation.author_text = recommendation.author ? recommendation.author.name : "Deleted";
        newRecommendation.book = recommendation.book ? recommendation.book._id : "Deleted";
        newRecommendation.book_text = recommendation.book ? recommendation.book.name : "Deleted";
        newRecommendation._id = recommendation._id ? recommendation._id : "0";
        return newRecommendation;
      })
      return res.status(200).send(detailedPodcast)
    })
    .catch(err => console.log("Podcast show detailed err -> ", err));
});

module.exports = router;
