'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Checkin = mongoose.model('Checkin'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Checkin
 */
exports.create = function (req, res) {
  var checkin = new Checkin(req.body);

  checkin.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(checkin);
    }
  });
};

/**
 * Show the current Checkin
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var checkin = req.checkin ? req.checkin.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  checkin.isCurrentUserOwner = !!(req.user && checkin.user && checkin.user._id.toString() === req.user._id.toString());

  res.json(checkin);
};

/**
 * Update a Checkin
 */
exports.update = function (req, res) {

};

/**
 * Delete an Checkin
 */
exports.delete = function (req, res) {

};

/**
 * List of Checkins
 */
exports.list = function (req, res) {
  Checkin.find().sort('-created').populate('user', 'displayName').exec(function (err, checkin) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(checkin);
    }
  });
};

/**
 * Article middleware
 */
exports.checkinByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Check-in is invalid'
    });
  }

  Checkin.findById(id).populate('user', 'displayName').exec(function (err, checkin) {
    if (err) {
      return next(err);
    } else if (!checkin) {
      return res.status(404).send({
        message: 'No article with that identifier has been found'
      });
    }
    req.checkin = checkin;
    next();
  });
};
