'use strict';

/**
 * Module dependencies
 */
var pagamentosPolicy = require('../policies/pagamento.server.policy'),
  pagamentos = require('../controllers/pagamento.server.controller');

module.exports = function (app) {
  app.route('/api/pagamentos').all(pagamentosPolicy.isAllowed)
    .get(pagamentos.list)
    .post(pagamentos.create);

  app.route('/api/pagamentos/:pagamentoId').all(pagamentosPolicy.isAllowed)
    .get(pagamentos.read);

  app.param('pagamentoId', pagamentos.pagamentoByID);
};
