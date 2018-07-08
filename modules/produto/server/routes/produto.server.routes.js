'use strict';

var produtoPolicy = require('../policies/produto.server.policy'),
  produtos = require('../controllers/produto.server.controller');

module.exports = function (app) {
  // app.route('/api/produtos').all(produtoPolicy.isAllowed)
  app.route('/api/produtos')
    .get(produtos.list)
    .post(produtos.create);

  app.route('/api/produtos/:produtoId')//.all(produtoPolicy.isAllowed)
    .get(produtos.read);

  app.param('produtoId', produtos.produtoByID);
};
