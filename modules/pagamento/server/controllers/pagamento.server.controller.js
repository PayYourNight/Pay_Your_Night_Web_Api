'use strict';

var path = require('path'),
  _ = require('lodash'),
  mongoose = require('mongoose'),
  Pagamento = mongoose.model('Pagamento'),
  Checkin = mongoose.model('Checkin'),
  Consumo = mongoose.model('Consumo'),
  MemoriaCalculo = mongoose.model('MemoriaCalculo'),
  Parametro = mongoose.model('Parametro'),
  Saldo = mongoose.model('Saldo'),
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
                await gerarPontuacao(pag);
                await gravarMemoriaCalculo(pag);
              }
              res.json(pag);
            }
          });
        });
      }
    }
  });
};

async function gerarPontuacao(pagamento) {
  const param = await getParameter();
  var saldo = pagamento.valorTotal * param.taxaConversaoPagamentoCredito
}

async function getParameter() {  
   return await Parametro.findOne({}).exec();
}

function gravarMemoriaCalculo() {
  const param = await getParameter(); //await Parametro.findOne({}).exec();
  var memoriaCalculo = new MemoriaCalculo();
  memoriaCalculo.pagamento_id = pagamento._id;
  memoriaCalculo.taxaConversao = param.taxaConversaoPagamentoCredito;
  await MemoriaCalculo.create(memoriaCalculo);  
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
