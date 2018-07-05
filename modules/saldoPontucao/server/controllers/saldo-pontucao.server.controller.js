'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Saldo = mongoose.model('SaldoPontuacao'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Saldo pontucao
 */
exports.create = function (req, res) {
  var usuario_id = req.body.usuario_id;
  var memoriacalculo_id = req.body.memoriacalculo_id;
  var valorMovimentado = req.body.valorMovimentado;
  var tipoMovimentacao = req.body.tipoMovimentacao;

  var saldo = new Saldo();
  saldo.usuario_id = usuario_id;
  saldo.memoriacalculo_id = memoriacalculo_id;
  saldo.valorMovimentado = valorMovimentado;
  saldo.tipoMovimentacao = tipoMovimentacao;
  Saldo.create(saldo, function (err, saldo) {
    res.json(saldo);
  });
};

/**
 * Show the current Saldo pontucao
 */
exports.read = function (req, res) {
  var usuario_id = req.query.usuarioid;
  Saldo.find({ usuario_id: usuario_id }, function (err, saldos) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      var soma = _.sumBy(saldos, 'valorMovimentado');
      res.json({ totalPontuacao: soma });
    }
  });
};

/**
 * Update a Saldo pontucao
 */
exports.update = function (req, res) {

};

/**
 * Delete an Saldo pontucao
 */
exports.delete = function (req, res) {

};

/**
 * List of Saldo pontucaos
 */
exports.list = function (req, res) {

};
