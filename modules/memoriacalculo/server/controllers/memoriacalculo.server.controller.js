'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  MemoriaCalculo = mongoose.model('MemoriaCalculo'),
  Parametro = mongoose.model('Parametro'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Memoriacalculo
 */
exports.create = function (req, res) {
  var pagamento_id = req.body.pagamento_id;
  var taxaConversaoPagamentoCredito = 0;
  var percentualTransacao = 0;

  Parametro.findOne({}, function (err, parametro) {
    if (!err) {
      taxaConversaoPagamentoCredito = parametro.taxaConversaoPagamentoCredito
      percentualTransacao = parametro.percentualTransacao;

      memoriaCalculo = new MemoriaCalculo();
      memoriaCalculo.pagamento_id = pagamento_id;
      memoriaCalculo.taxaConversaoPagamentoCredito = taxaConversaoPagamentoCredito;
      memoriaCalculo.percentualTransacao = percentualTransacao;

      MemoriaCalculo.create(memoriaCalculo, function (err, memoria) {
        res.json(memoria);
      });
    }
  });
};

/**
 * Show the current Memoriacalculo
 */
exports.read = function (req, res) {

};

/**
 * Update a Memoriacalculo
 */
exports.update = function (req, res) {

};

/**
 * Delete an Memoriacalculo
 */
exports.delete = function (req, res) {

};

/**
 * List of Memoriacalculos
 */
exports.list = function (req, res) {

};
