'use strict';

/**
 * Module dependencies
 */
var pagamentosPolicy = require('../policies/pagamento.server.policy'),
  pagamentos = require('../controllers/pagamento.server.controller');

module.exports = function(app) {
  // Articles collection routes
  app.route('/api/pagamentos').all(pagamentosPolicy.isAllowed)
    .get(pagamentos.list)
    .post(pagamentos.create);

  // Single article routes
  app.route('/api/pagamentos/:pagamentoId').all(pagamentosPolicy.isAllowed)
    .get(pagamentos.read);
    //.put(articles.update)
    //.delete(articles.delete);

  // Finish by binding the article middleware
  app.param('pagamentoId', articles.pagamentoByID);
};
