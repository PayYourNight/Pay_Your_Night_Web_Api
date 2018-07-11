'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Produto = mongoose.model('Produto'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  redis = require("redis"),
  client = redis.createClient({
    host: "ec2-18-205-61-133.compute-1.amazonaws.com",
    port: "28849",
    url: "redis://h:pcb7723dba50cf2002c282b7fbff8571c112f80a0a39835a8078352c626fd7506@ec2-18-205-61-133.compute-1.amazonaws.com:28849",
    password: "pcb7723dba50cf2002c282b7fbff8571c112f80a0a39835a8078352c626fd7506"
  }),
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

    client.set('produtos_' + _estabelecimento_id, produto);

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
  var _estabelecimento = req.query.estabelecimentoid;

  if (!_estabelecimento) {
    return res.status(500).send({
      message: 'id Estabelecimento inválido',
      status: 500
    });
  }

  client.get('produtos_' + _estabelecimento, function (err, produtos) {
    if (err) {
      return res.status(500).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      if (produtos) {
        res.json(JSON.parse(produtos));
      } else {
        Produto.find({ estabelecimento_id: new mongoose.Types.ObjectId(_estabelecimento) })
          .exec(function (err, produtos) {
            if (err) {
              return res.status(422).send({
                message: errorHandler.getErrorMessage(err)
              });
            } else {

              client.set('produtos_' + _estabelecimento, JSON.stringify(produtos));

              res.json(produtos);
            }
          });
      }
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
