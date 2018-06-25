'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Checkin = mongoose.model('Checkin'),
  Consumo = mongoose.model('Consumo'),
  Estabelecimento = mongoose.model('Estabelecimento'),
  Usuario = mongoose.model('User'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash'),
  Transaction = require('mongoose-transactions');

/**
 * Create a Checkin
 */
exports.create = function (req, res) {
  
  var _userId = req.body.usuario_id;
  var _estabelecimentoId = req.body.estabelecimento_id;
  var _userRespId = req.body.usuarioresp_id;

  Checkin.findOne({
    ativo: 'true'
  }, function (err, checkin) {
    if (checkin) {
      return res.status(422).send({
        message: 'Usuário possui um check-in ativo.'
      });
    } else {
      checkin = new Checkin(req.body);
           
      checkin.estabelecimento_id = _estabelecimentoId;
      checkin.usuario_id = _userId;
      checkin.usuarioResp_id = _userRespId;

      var consumo = new Consumo({
        // checkin: checkin,
        usuarioResp_id: _userRespId
      });

      start(checkin, consumo, res);
    }
  });
};

async function start (checkin, consumo, res) {
  const transaction = new Transaction();
  try {
      var _id = transaction.insert('Checkin', checkin);      
      consumo.checkin_id = _id;
      transaction.insert('Consumo', consumo);
      const final = await transaction.run();
      res.json(checkin);
      // expect(final[0].name).toBe('Jonathan')
  } catch (error) {      
      const rollbackObj = await transaction.rollback().catch(console.error)
      transaction.clean()
      res.status(422)
      .send({
               message: errorHandler.getErrorMessage(err)
           });
  }
}

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
  Checkin.find()
    .sort('-created')
    .populate('usuario')
    .exec(function (err, checkin) {
      if (err) {
        return res.status(422).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(checkin);
      }
    });
};

exports.getAtivo = function (req, res) {
  var usuario_id = req.query.usuarioid;
  
  Checkin.findOne({ usuario_id: usuario_id, ativo: true }, function (err, checkin) {      
      if (err) {
        return res.status(422).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(checkin);
      }
    });
};


exports.checkinByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Check-in id is invalid'
    });
  }

  Checkin.findById(id).populate('user', 'displayName').exec(function (err, checkin) {
    if (err) {
      return next(err);
    } else if (!checkin) {
      return res.status(422).send({
        message: 'Nenhum check-in encontrado!'
      });
    }
    req.checkin = checkin;
    next();
  });
};
