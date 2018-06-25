'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Checkin = mongoose.model('Checkin'),
  Consumo = mongoose.model('Consumo'),
  Produto = mongoose.model('Produto'),
  ProdutoConsumo = mongoose.model('ProdutoConsumo'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Consumo
 */
exports.create = function (req, res) {
  var _usuarioId = req.body.usuario_id;
  var _usuarioRespId = req.body.usuarioResp_id;
  var _produtosConsumo = req.body.produtosConsumo;
  var _usuarioresp_id = req.body.usuarioresp_id;

  Checkin.findOne({
    usuario_id: _usuarioId,
    ativo: true
  }, function (err, checkin) {
    if (!checkin) {
      return res.status(422).send({
        message: 'Usuário não possui um check-in ativo.'
      });
    } else {
      console.log(checkin);
      console.log(_produtosConsumo);
     
      var consumo = new Consumo();
      consumo.checkin_id = checkin._id;
      consumo.usuarioresp_id = _usuarioresp_id;

      var produtoConsumo = ProdutoConsumo();

      _produtosConsumo.forEach(function (item) {
        console.log(item);
        produtoConsumo = new ProdutoConsumo();
        produtoConsumo.produto_id = item.produto_id;
        produtoConsumo.produto_descricao = item.produtoConsumo;
        produtoConsumo.produto_valor = item.produto_valor;
        produtoConsumo.quantidade = item.quantidade;

        consumo.produtosConsumo.push(produtoConsumo);
      });

      Consumo.create(consumo, function (err, consumo) {
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
//exports.list = function (req, res) {

//};

/**
 * List of Consumos
 */
exports.list = function (req, res) {
  var _usuarioId = req.query.usuarioid;
  
  Checkin.findOne({
    usuario_id: _usuarioId,
    ativo: true
  }, function (err, checkin) {
    if (!checkin) {
      return res.status(422).send({
        message: 'Usuário não possui um check-in ativo.'
      });
    } else {
      Consumo.find({ checkin_id: checkin._id }, function (err, consumos) {
        res.json(consumos);
      });
    }
  });
};
