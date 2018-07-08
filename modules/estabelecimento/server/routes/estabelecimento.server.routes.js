'use strict';

var estabelecimentos = require('../controllers/estabelecimento.server.controller');

module.exports = function (app) {
  
  app.route('/api/estabelecimentos')
    //.get(estabelecimentos.list)
    .post(estabelecimentos.create);

  //app.route('/api/estabelecimentos/:estabelecimentoId')
  //  .get(estabelecimentos.read);

  //app.param('produtoId', produtos.produtoByID);
};
