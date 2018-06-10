'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Produto = mongoose.model('Produto'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Produto
 */
exports.create = function (req, res) {

};

/**
 * Show the current Produto
 */
exports.read = function (req, res) {

};

/**
 * Update a Produto
 */
exports.update = function (req, res) {

};

/**
 * Delete an Produto
 */
exports.delete = function (req, res) {

};

/**
 * List of Produtos
 */
exports.list = function (req, res) {
  // Produto.find({ 'estabelecimento._id': JSON.stringify(req.query.estabelecimento) })
  Produto.find({})
  .sort('-descricao')
  .exec(function (err, produto) {
    console.log(produto);
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      console.log(produto);
      res.json(produto);
    }
  });
};

exports.produtoByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Id do Pagamento é Invalido'
    });
  }

  Produto.findById(id).exec(function (err, pagamento) {
    if (err) {
      return next(err);
    } else if (!pagamento) {
      return res.status(404).send({
        message: 'Nenhum Pagamento foi encontrado para este ID'
      });
    }
    req.pagamento = pagamento;
    next();
  });
};
