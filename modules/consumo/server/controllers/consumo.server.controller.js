'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Checkin = mongoose.model('Checkin'),
  Consumo = mongoose.model('Consumo'),
  Produto = mongoose.model('Produto'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Consumo
 */
exports.add = function (req, res) {
  var _usuarioId = req.body.usuario_id;
  var _usuarioRespId = req.body.usuarioResp_id;
  var _produtoId = req.body.produto_id;
  var _quantidade = req.body.quantidade;

  Checkin.findOne({
    usuario_id: _usuarioId,
    ativo: true
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
          console.log(_produtoId);
          Produto.findOne({ _id: _produtoId }, function (err, produto) {
            console.log(err);
            if (!produto) {
              return res.status(422).send({
                message: 'Produto não encontrado.'
              });
            } else {
              Consumo.update({
                _id: consumo._id
              }, {
                $push: {
                  produtosConsumo: {
                    produto_id: _produtoId,
                    quantidade: _quantidade,
                    valor: produto.valor
                  }
                }
              }, {
                new: false
              }, function (err) {
                if (err) {
                  return res.status(422).send({
                    message: errorHandler.getErrorMessage(err)
                  });
                } else {
                  res.json(consumo);
                }
              });
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

/**
 * List of Consumos
 */
exports.getVWConsumo = function (req, res) {

};
