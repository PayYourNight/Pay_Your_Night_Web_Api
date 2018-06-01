'use strict';

/**
 * Module dependencies
 */
var pagamentosPolicy = require('../policies/pagamento.server.policy'),
  pagamentos = require('../controllers/pagamento.server.controller');

module.exports = function (app) {
<<<<<<< HEAD
  // Articles collection routes
=======
>>>>>>> d24a9680a2018465ce68666a2e27d63f92fbe5fe
  app.route('/api/pagamentos').all(pagamentosPolicy.isAllowed)
    .get(pagamentos.list)
    .post(pagamentos.create);

<<<<<<< HEAD
  // Single article routes
  app.route('/api/pagamentos/:pagamentoId').all(pagamentosPolicy.isAllowed)
    .get(pagamentos.read);

  // Finish by binding the article middleware
=======
  app.route('/api/pagamentos/:pagamentoId').all(pagamentosPolicy.isAllowed)
    .get(pagamentos.read);

>>>>>>> d24a9680a2018465ce68666a2e27d63f92fbe5fe
  app.param('pagamentoId', pagamentos.pagamentoByID);
};
