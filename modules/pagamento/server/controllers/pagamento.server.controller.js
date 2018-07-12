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
  Usuario = mongoose.model('User'),
  Estabeleciemento = mongoose.model('Estabelecimento'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

//Transaction = require('mongoose-transactions');

exports.create = function (req, res) {  
  var _usuarioId = req.body.usuario_id;
  var _meioPagamentoId = req.body.meiopagamento_id;
  var _origem = req.body.origem;
  var _usarpyncoin = req.body.usarpyncoin;

  Checkin.findOne({
    usuario_id: _usuarioId,
    ativo: 'true'
  }, function (err, checkin) {
    if (err) {
      return res.status(412).send({
        message: errorHandler.getErrorMessage(err),
        status: 412
      });
    } else {
      if (!checkin) {
        return res.status(412).send({
          message: 'Nenhum check-in ativo para este usuário.',
          status: 412
        });
      } else {
        Consumo.find({
          checkin_id: checkin._id
        }, function (err, consumos) {

          Estabeleciemento.findById(checkin.estabelecimento_id, function (err, est) {

            var pagamento = new Pagamento({
              usuario_id: _usuarioId,
              estabelecimento_id: est._id,
              estabelecimento_nome: est.nome,
              meioPagamento_id: new mongoose.Types.ObjectId(_meioPagamentoId),              
              checkin_id: checkin._id,
              discriminator: _origem === 'app' ? 'pagamentoApp' : 'pagamentoCaixa',
              formaPagamento: 'credito',
              valorTotal: somarConsumos(consumos)
            });

            Pagamento.create(pagamento, function (err, pag) {
              if (err) {
                return res.status(412).send({
                  message: errorHandler.getErrorMessage(err),
                  status: 412
                });
              } else {

                if (pag.discriminator === 'pagamentoApp') {

                  Parametros.findOne({})
                    .exec(function (err, param) {
                      var memoriaCalculo = new MemoriaCalculo();
                      memoriaCalculo.pagamento_id = pag._id;
                      memoriaCalculo.taxaConversaoPagamentoCredito = param.taxaConversaoPagamentoCredito;
                      memoriaCalculo.percentualTransacao = param.percentualTransacao;
                      MemoriaCalculo.create(memoriaCalculo, function (err, memoria) {

                        if (_usarpyncoin) {
                          var saldoPontos = 0;
                          SaldoPontuacao.find({ usuario_id: new mongoose.Types.ObjectId(_usuarioId) }, function (err, saldos) {

                            saldoPontos = getTotalSaldo(saldos);

                            var saldoPontuacao = new SaldoPontuacao();
                            saldoPontuacao.usuario_id = _usuarioId;
                            saldoPontuacao.memoriaCalculo_id = memoria._id;
                            saldoPontuacao.valorMovimentado = saldoPontos * -1;
                            saldoPontuacao.tipoMovimentacao = 'utilizacao';
                            SaldoPontuacao.create(saldoPontuacao);
                          });
                        }

                        var saldo = pagamento.valorTotal * param.taxaConversaoPagamentoCredito;

                        var saldoPontuacao = new SaldoPontuacao();
                        saldoPontuacao.usuario_id = _usuarioId;
                        saldoPontuacao.memoriaCalculo_id = memoria._id;
                        saldoPontuacao.valorMovimentado = saldo;
                        saldoPontuacao.tipoMovimentacao = 'pagamento';
                        SaldoPontuacao.create(saldoPontuacao, function (err) {

                          checkin.ativo = false;
                          checkin.aguardandoCheckout = true;
                          checkin.save(function (err, checkin) {
                            res.json(pag);
                          })
                        });
                      });
                    });
                }
              }
            });
          });
        });
      }
    }
  });
};

function getTotalSaldo(saldos) {
  var total = 0;
  saldos.forEach(function (item) {
    
    total += item.valorMovimentado;
  });

  return total;
}

exports.removerConsumo = function (req, res) {
  var _usuarioId = req.body.usuario_id;
  var _usuarioInclusao = req.body.usuario_inclusao;

  Checkin.findOne({
    usuario_id: _usuarioId,
    ativo: 'true'
  }, function (err, checkin) {
    if (!err) {
      Checkin.update({
        _id: checkin._id
      }, {
          $pullAll: {
            consumos_incluidos: [_usuarioInclusao]
          }
        },
        function (err, ch) {
          if (!err) {
            Checkin.findOne({
              usuario_id: _usuarioInclusao,
              ativo: 'true'
            }, function (err, c) {
              c.consumo_transferido = false;
              c.usuario_transferencia = null;
              c.save();
            });

            res.json(JSON.stringify({
              message: 'Consumo removido'
            }));
          }
        });
    }
  });
}

exports.incluirConsumo = function (req, res) {
  var _usuarioId = req.body.usuario_id;
  var _usuarioInclusao = req.body.usuario_inclusao;

  Checkin.findOne({
    usuario_id: _usuarioInclusao,
    ativo: 'true'
  }, function (err, checkin) {    
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
        Consumo.find({
          checkin_id: checkin._id
        }, function (err, consumos) {

          if (err) {
            return res.status(422).send({
            message: errorHandler.getErrorMessage(err)
            });
          } else {
            
            Checkin.findOne({
              usuario_id: _usuarioId,
              ativo: 'true'
            }, function (err, checkinUser) {
                            
              if (err) {
                return res.status(422).send({
                message: errorHandler.getErrorMessage(err)
                });
              } else {

                if (!checkinUser) {
                  return res.status(422).send({
                  message: 'Nenhum check-in ativo para este usuário.'
                  });

                } else {

                  Checkin.update({
                    _id: checkinUser._id
                  }, {
                      $push: {
                        consumos_incluidos: _usuarioInclusao
                      }
                    },

                    function (err, ch) {

                      if (!err) {
                        checkin.consumo_transferido = true;
                        checkin.usuario_transferencia = checkinUser.usuario_id;
                        checkin.save(function (err, c) {

                          Usuario.findById(checkin.usuario_id, function (err, usuario) {
                            if (usuario) {
                              res.json(JSON.stringify({
                                usuario_nome: usuario.displayName,
                                usuario_id: usuario._id,
                                totalconsumo: somarConsumos(consumos)
                              }));
                            }
                          });
                        });
                      }
                    });
                }
              }
            });
          }
        });
      }
    }
  });
}

function somarConsumos(consumos) {
  var soma = 0;
  _.each(consumos, function (x) {
    _.each(x.produtosConsumo, function (y) {
      soma += y.produto_valor;
    });
  });

  return soma;
}

function gerarPontuacao(pagamento) {
  Parametros.findOne({})
    .exec(function (err, param) {
      var saldo = pagamento.valorTotal * param.taxaConversaoPagamentoCredito;

      MemoriaCalculo.findOne({
        pagamento_id: pagamento._id
      }, function (err, memoria) {
        var saldoPontuacao = new SaldoPontuacao();
        saldoPontuacao.memoriaCalculo = memoria;
        saldoPontuacao.valorMovimentado = saldo;
        saldoPontuacao.tipoMovimentacao = 'pagamento';
        return saldoPontuacao.create(saldoPontuacao);
      });
    });
}

function gravarMemoriaCalculo(pag) {
  Parametro.findOne({})
    .exec(function (err, param) {
      var memoriaCalculo = new MemoriaCalculo();
      memoriaCalculo.pagamento_id = pag._id;
      memoriaCalculo.taxaConversao = param.taxaConversaoPagamentoCredito;
      return MemoriaCalculo.create(memoriaCalculo);
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
