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
  var _estabelecimento_id = req.body.estabelecimento_id;
  var _descricao = req.body.descricao;
  var _valor = req.body.valor;
  var _imagem_url = req.body.imagem_url;
  var produto = new Produto();

  produto.estabelecimento_id = _estabelecimento_id;
  produto.descricao = _descricao;
  produto.valor = _valor;
  produto.imagem_url = _imagem_url;
  Produto.create(produto, function (err, produto) {

    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(produto);
    }
  });
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
