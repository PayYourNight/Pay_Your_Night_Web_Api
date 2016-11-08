'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Estabelecimento = mongoose.model('Estabelecimento'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Estabelecimento
 */
exports.create = function(req, res) {
  var estabelecimento = new Estabelecimento(req.body);
  estabelecimento.user = req.user;

  estabelecimento.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(estabelecimento);
    }
  });
};

/**
 * Show the current Estabelecimento
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var estabelecimento = req.estabelecimento ? req.estabelecimento.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  estabelecimento.isCurrentUserOwner = req.user && estabelecimento.user && estabelecimento.user._id.toString() === req.user._id.toString();

  res.jsonp(estabelecimento);
};

/**
 * Update a Estabelecimento
 */
exports.update = function(req, res) {
  var estabelecimento = req.estabelecimento;

  estabelecimento = _.extend(estabelecimento, req.body);

  estabelecimento.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(estabelecimento);
    }
  });
};

/**
 * Delete an Estabelecimento
 */
exports.delete = function(req, res) {
  var estabelecimento = req.estabelecimento;

  estabelecimento.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(estabelecimento);
    }
  });
};

/**
 * List of Estabelecimentos
 */
exports.list = function(req, res) {
  Estabelecimento.find().sort('-created').populate('user', 'displayName').exec(function(err, estabelecimentos) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(estabelecimentos);
    }
  });
};

/**
 * Estabelecimento middleware
 */
exports.estabelecimentoByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Estabelecimento is invalid'
    });
  }

  Estabelecimento.findById(id).populate('user', 'displayName').exec(function (err, estabelecimento) {
    if (err) {
      return next(err);
    } else if (!estabelecimento) {
      return res.status(404).send({
        message: 'No Estabelecimento with that identifier has been found'
      });
    }
    req.estabelecimento = estabelecimento;
    next();
  });
};
