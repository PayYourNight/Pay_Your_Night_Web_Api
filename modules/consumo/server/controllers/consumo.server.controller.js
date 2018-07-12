'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Checkin = mongoose.model('Checkin'),
  Consumo = mongoose.model('Consumo'),
  Produto = mongoose.model('Produto'),
  Estabelecimento = mongoose.model('Estabelecimento'),
  Pagamento = mongoose.model('Pagamento'),
  ProdutoConsumo = mongoose.model('ProdutoConsumo'),  
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Consumo
 */
exports.create = function (req, res) {
  var _usuarioId = req.body.usuario_id;  
  var _produtosConsumo = req.body.produtosConsumo;
  var _usuarioresp_id = req.body.usuarioresp_id;
  
  Checkin.findOne({
    usuario_id: new mongoose.Types.ObjectId(_usuarioId),
    ativo: true
  }, function (err, checkin) {
    if (err) {
      return res.status(500).send({
        message: errorHandler.getErrorMessage(err),
        status: 500
      });
    } else {
      if (!checkin) {
        return res.status(412).send({
          message: 'Usuário não possui um check-in ativo.',
          status: 412
        });
      } else {
       
        var consumo = new Consumo();
        consumo.checkin_id = checkin._id;
        consumo.usuarioresp_id = _usuarioresp_id;

        var produtoConsumo = ProdutoConsumo();

        _produtosConsumo.forEach(function (item) {
          produtoConsumo = new ProdutoConsumo();
          produtoConsumo.produto_id = item.produto_id;
          produtoConsumo.produto_descricao = item.produto_descricao;
          produtoConsumo.produto_valor = item.produto_valor;
          produtoConsumo.quantidade = item.quantidade;

          consumo.produtosConsumo.push(produtoConsumo);
        });        

        Consumo.create(consumo, function (err, consumo) {
          if (err) {
            return res.status(500).send({
              message: errorHandler.getErrorMessage(err),
              status: 500
            });
          } else {
            res.json(consumo);
          }
        });
      }
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
    console.log(checkin);
    if (!checkin) {
      return res.status(412).send({
        message: 'Usuário não possui um check-in ativo.',
        status: 412
      });
    } else {
      Consumo.find({ checkin_id: checkin._id }, function (err, consumos) {
        console.log(consumos);
        res.json(consumos);
      });
    }
  });
};

exports.getHistorico = function (req, res) {
  var usuario_id = req.query.usuarioid;

  Pagamento.find({ usuario_id: usuario_id }, null, { sort: '-created' }, function (err, pags) {
    if (err) {

      return res.status(500).send({
        message: errorHandler.getErrorMessage(err),
        status: 500
      });

    } else {

      res.json(pags);

    }
  });

}

exports.getHistoricoDetalhe = function (req, res) {
  var _checkin_id = req.query.checkinid;

  Checkin.findById(_checkin_id, function (err, checkin) {       
    Consumo.find({ checkin_id: checkin._id }, null, { sort: 'created' } ,function (err, consumos) {   
        res.json(consumos);
      });    
  });
}





//function task(pags) {
//  return new Promise(function (resolve, reject) {
//    console.log("começou");
//    pags.forEach(function (item) {
//      Estabelecimento.findById(item.estabelecimento_id, function (error, est) {
//        if (error) {
//          reject(err);
//        }
//        else {
//          if (est) {
//            Consumo.estabelecimento_nome = est.nome;
//          }          
//        }
//      });

//      resolve(pags);

//      //setTimeout(function () {
//      //  console.log("terminou");
//      //  resolve(pags);
//      //}, 4000);

//    });
//  });
//}
