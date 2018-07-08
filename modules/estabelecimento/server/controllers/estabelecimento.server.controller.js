'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Estabelecimento = mongoose.model('Estabelecimento'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

exports.create = function (req, res) {
  
  var _nome = req.body.estabelecimento_nome;
  var _cnpj = req.body.estabelecimento_cnpj;

  var est = new Estabelecimento();
  est.nome = _nome;
  est.cnpj = _cnpj;

  Estabelecimento.create(est, function (err, e) {
    if (err) {
    } else {
      res.json(e);
    }
  });
};

exports.read = function (req, res) {

};

exports.update = function (req, res) {

};

exports.delete = function (req, res) {

};

exports.list = function (req, res) {

};
