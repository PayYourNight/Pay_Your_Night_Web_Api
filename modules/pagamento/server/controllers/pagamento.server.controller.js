'use strict';

var path = require('path'),
  mongoose = require('mongoose'),
  Pagamento = mongoose.model('Pagamento'),
  Checkin = mongoose.model('Checkin'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

exports.create = function (req, res) {
  var _usuarioId = res.body.usuarioId;
  var _meioPagamentoId = res.body.meioPagamentoId;

  Checkin.findOne({ usuario_id: _usuarioId, ativo: 'true' })
  .populate('consumo')
  .exec(function (err, checkin) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      if (!checkin) {
        return res.status(422).send({
          message: 'Nenhum check-in ativo para este usuário.'
        });
      } else {
        var pagamento = new Pagamento({
          usuario_id: _usuarioId,
          meioPagamento_id: _meioPagamentoId,
          checkin_id: checkin._id // ,
          // valorTotalConsumido: checkin.consumo.
        });

        Pagamento.save(function (err) {
          if (err) {
            return res.status(422).send({
              message: errorHandler.getErrorMessage(err)
            });
          } else {
            res.json(pagamento);
          }
        });
      }
    }
  });
  // var pagamento = new Pagamento(req.body);


};

exports.read = function (req, res) {
  var pagamento = req.pagamento ? req.pagamento.toJSON() : {};

  pagamento.isCurrentUserOwner = !!(req.user && pagamento.usuario && pagamento.usuario._id.toString() === req.user._id.toString());

  res.json(pagamento);
};

exports.list = function (req, res) {
  Pagamento.find().sort('-created').exec(function (err, pagamento) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(pagamento);
    }
  });
};

exports.pagamentoByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Id do Pagamento é Invalido'
    });
  }

  Pagamento.findById(id).exec(function (err, pagamento) {
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
