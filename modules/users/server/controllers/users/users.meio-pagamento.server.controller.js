'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  _ = require('lodash'),
  mongoose = require('mongoose'),
  MeioPagamento = mongoose.model('MeioPagamento'),
  Usuario = mongoose.model('User'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Show the current user
 */
exports.addMeioPagamento = function (req, res) {
  var _usuario_id = req.body.usuario_id;

  Usuario.findById(_usuario_id, function (err, usuario) {
    if (!err) {
      if (!usuario) {
        return res.status(422).send({
          message: 'Nenhum usuário cadastrado para este ID'
        });
      } else {

        if (
          _.find(usuario.meiosPagamento, function (o) {
            return o.cart_numero === req.body.cart_numero;
          })
        ) return res.status(422).send({
          message: 'Usuário já possui um cartão de mesmo numero cadastrado'
        });

        Usuario.update({
          _id: new mongoose.Types.ObjectId(_usuario_id)
        }, {
          $push: {
            meiosPagamento: {
              cart_numero: req.body.cart_numero,
              cart_nome: req.body.cart_nome,
              cart_bandeira: req.body.cart_bandeira,
              cart_cod_seg: req.body.cart_cod_seg,
              cart_data_val: req.body.cart_data_val
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
            Usuario.find({ '_id': new mongoose.Types.ObjectId(usuario._id) }, function (err, usu) {
              if (!err) {
                usu.salt = undefined;
                usu.password = undefined
                usu.email = undefined;
                res.json(usu);
              }
             })
          }
        });
      }
    }
  });
};

exports.listarMeioPagamento = function (req, res) {
  var _usuario_id = req.query.usuarioid;

  Usuario.findById(_usuario_id, function (err, usu) {

    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      
      var meiospagamento = usu.meiosPagamento

      res.json(meiospagamento);
    }

  });
}

exports.detalheMeioPagamento = function (req, res) {
  var _usuario_id = req.body.usuario_id;
  var _meiopagamentoid = req.query.meiopagamentoid;
}
