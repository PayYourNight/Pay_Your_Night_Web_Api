'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Checkin = mongoose.model('Checkin'),
  Consumo = mongoose.model('Consumo'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Consumo
 */
exports.add = function (req, res) {
  var _usuarioId = req.body.usuarioId;
  var _usuarioRespId = req.body.usuarioRespId;
  var _produtoId = req.body.produtoId;
  var _quantidade = req.body.quandidade;

  Checkin.findOne({
    usuario_id: _usuarioId,
    ativo: 'true'
  }, function (err, checkin) {
    if (!checkin) {
      return res.status(422).send({
        message: 'Usuário não possui um check-in ativo.'
      });
    } else {
      Consumo.findOne({
        checkin_id: checkin._id
      }, function (err, consumo) {
        if (!consumo) {
          return res.status(422).send({
            message: 'Não existe consumo cadastrado para o usuário.'
          });
        } else {
          Consumo.update({
            _id: consumo._id
          }, {
            $push: {
              produtosConsumo: {
                produto_id: _produtoId,
                quantidade: _quantidade
              }
            }
          }, {
            new: false
          }, function (err) {
            if (!err) {
              res.json(consumo);
            }
          });
        }
      });
    }
  });
};

/**
 * Show the current Consumo
 */
exports.read = function (req, res) {

};

/**
 * Update a Consumo
 */
exports.update = function (req, res) {

};

/**
 * Delete an Consumo
 */
exports.delete = function (req, res) {

};

/**
 * List of Consumos
 */
exports.list = function (req, res) {

};
