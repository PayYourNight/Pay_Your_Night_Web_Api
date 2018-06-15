'use strict';

var path = require('path'),
  _ = require('lodash'),
  mongoose = require('mongoose'),
  Pagamento = mongoose.model('Pagamento'),
  Checkin = mongoose.model('Checkin'),
  Consumo = mongoose.model('Consumo'),
  MemoriaCalculo = mongoose.model('MemoriaCalculo'),
  Parametros = mongoose.model('Parametros'),
  SaldoPontuacao = mongoose.model('SaldoPontuacao'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

exports.create = function (req, res) {
  var _usuarioId = req.body.usuario_id;
  var _meioPagamentoId = req.body.meiopagamento_id;
  var _origem = req.body.origem;

  Checkin.findOne({ usuario_id: _usuarioId, ativo: 'true' }, function (err, checkin) {
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
        Consumo.findOne({ checkin_id: checkin._id }, function (err, consumo) {
          var pagamento = new Pagamento({
            usuario_id: _usuarioId,
            meioPagamento_id: _meioPagamentoId,
            checkin_id: checkin._id,
            discriminator: _origem === 'usuario'? 'pagamentoCaixa' : 'pagamentoApp',
            valorTotal: _.sumBy(consumo.produtosConsumo, function (o) {
              return o.quantidade * o.valor;
            })
          });
          Pagamento.create(pagamento, function (err, pag) {
            if (err) {
              return res.status(422).send({
                message: errorHandler.getErrorMessage(err)
              });
            } else {

              if (pag.discriminator === 'pagamentoApp') {
                gravarMemoriaCalculo(pag);
                gerarPontuacao(pag);
              }
              res.json(pag);
            }
          });
        });
      }
    }
  });
};

function gerarPontuacao(pagamento) {
 // const param =  getParameter();
  Parametros.findOne({})
  .exec(function (err, param) {
    var saldo = pagamento.valorTotal * param.taxaConversaoPagamentoCredito;

    MemoriaCalculo.findOne({ pagamento_id: pagamento._id }, function (err, memoria) {
      var saldoPontuacao = new SaldoPontuacao();
      saldoPontuacao.memoriaCalculo = memoria;
      saldoPontuacao.valorMovimentado = saldo;
      saldoPontuacao.tipoMovimentacao = 'pagamento';
      saldoPontuacao.create(saldoPontuacao);
    });
  });
}

// async function getParameter() {  
//    return await Parametro.findOne({}).exec();
// }

function gravarMemoriaCalculo(pag) {
  Parametro.findOne({})
  .exec(function (err, param) {
    var memoriaCalculo = new MemoriaCalculo();
    memoriaCalculo.pagamento_id = pag._id;
    memoriaCalculo.taxaConversao = param.taxaConversaoPagamentoCredito;
    MemoriaCalculo.create(memoriaCalculo);
  });
}

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
