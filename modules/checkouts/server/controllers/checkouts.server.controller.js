'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Checkout = mongoose.model('Checkout'),
  Checkin = mongoose.model('Checkin'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Checkout
 */
exports.create = function (req, res) {
  console.log(req.body);
  var checkout = new Checkout(req.body);

  Checkin.find({ usuario_id: new mongoose.Types.ObjectId(checkout.usuario_id) }, function (err, checkin) {
    if (checkin) {
      checkin.aguardandoCheckout = false;
      checkin.save(function (err) {
        if (err) {
          return res.status(500).send({
            message: errorHandler.getErrorMessage(err),
            status: 500
          });
        } else {
          checkout.checkin_id = checkin._id;
          checkout.save(function (err) {
            if (err) {
              return res.status(500).send({
                message: errorHandler.getErrorMessage(err),
                status: 500
              });
            } else {
              res.jsonp(checkout);
            }
          });
        }
      });
    } else {
      return res.status(500).send({
        message: errorHandler.getErrorMessage(err),
        status: 500
      });
    }
  });
};

/**
 * Show the current Checkout
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var checkout = req.checkout ? req.checkout.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  checkout.isCurrentUserOwner = req.user && checkout.user && checkout.user._id.toString() === req.user._id.toString();

  res.jsonp(checkout);
};

/**
 * Update a Checkout
 */
exports.update = function(req, res) {
  var checkout = req.checkout;

  checkout = _.extend(checkout, req.body);

  checkout.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err),
        status: 400
      });
    } else {
      res.jsonp(checkout);
    }
  });
};

/**
 * Delete an Checkout
 */
exports.delete = function(req, res) {
  var checkout = req.checkout;

  checkout.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err),
        status: 400
      });
    } else {
      res.jsonp(checkout);
    }
  });
};

/**
 * List of Checkouts
 */
exports.list = function(req, res) {
  Checkout.find().sort('-created').populate('user', 'displayName').exec(function(err, checkouts) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err),
        status: 400
      });
    } else {
      res.jsonp(checkouts);
    }
  });
};

/**
 * Checkout middleware
 */
exports.checkoutByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Checkout is invalid',
      status: 400
    });
  }

  Checkout.findById(id).populate('user', 'displayName').exec(function (err, checkout) {
    if (err) {
      return next(err);
    } else if (!checkout) {
      return res.status(404).send({
        message: 'No Checkout with that identifier has been found',
        status: 404
      });
    }
    req.checkout = checkout;
    next();
  });
};
